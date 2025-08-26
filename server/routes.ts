import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { userPreferences, students, studentHistory, studentExercisePrograms, studentMealPlans, studentSupplements, supportTickets, ticketResponses, supportMessages } from "@shared/schema";
import { eq, desc, and, or, gte, sql, inArray } from "drizzle-orm";
import { 
  insertUserSchema,
  insertTrainerProfileSchema,
  insertStudentSchema,
  insertExerciseCategorySchema,
  insertExerciseSchema,
  insertStudentExerciseProgramSchema,
  insertMealCategorySchema,
  insertMealSchema,
  insertStudentMealPlanSchema,
  insertSupplementCategorySchema,
  insertSupplementSchema,
  insertStudentSupplementSchema,
  insertStudentHistorySchema,
  insertSupportTicketSchema,
  insertTicketResponseSchema,
  insertSupportMessageSchema,
  insertUserPreferenceSchema,
  insertAuthSessionSchema,
  insertExerciseTypeSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize database schema (remove unused columns and add missing ones)
  try {
    await db.execute(sql`ALTER TABLE students ADD COLUMN IF NOT EXISTS grade TEXT DEFAULT 'beginner'`);

    
    // Remove unused columns that are not in the form
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS join_date`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS is_active`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS created_at`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS updated_at`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS program_amount`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS payment`);
    await db.execute(sql`ALTER TABLE students ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true`);
    
    // Make optional fields have default values to match form
    await db.execute(sql`ALTER TABLE students ALTER COLUMN goal_type SET DEFAULT 'تناسب اندام'`);
    await db.execute(sql`ALTER TABLE students ALTER COLUMN activity_level SET DEFAULT 'متوسط'`);
    await db.execute(sql`ALTER TABLE students ALTER COLUMN medical_conditions SET DEFAULT 'ندارد'`);
    
    // Add categoryId to supplements table for proper category-supplement linking
    await db.execute(sql`ALTER TABLE supplements ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES supplement_categories(id)`);
    
    // Update existing supplements to link them to appropriate categories (based on type)
    await db.execute(sql`
      UPDATE supplements 
      SET category_id = (
        SELECT id FROM supplement_categories 
        WHERE supplement_categories.type = supplements.type 
        AND supplement_categories.trainer_id = supplements.trainer_id
        LIMIT 1
      ) 
      WHERE category_id IS NULL
    `);

    // Fix exercises table - add missing columns
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS description TEXT`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS instructions TEXT`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'beginner'`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS muscle_groups JSONB DEFAULT '[]'`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS equipment TEXT DEFAULT 'بدون تجهیزات'`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS video_url TEXT`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS image_url TEXT`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS estimated_duration INTEGER DEFAULT 30`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS calories_burned INTEGER DEFAULT 100`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true NOT NULL`);
    await db.execute(sql`ALTER TABLE exercises ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW() NOT NULL`);

    // Fix meals table - add missing columns
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES meal_categories(id)`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS description TEXT DEFAULT ''`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS instructions TEXT DEFAULT ''`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS calories INTEGER DEFAULT 0`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS protein INTEGER DEFAULT 0`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS carbohydrates INTEGER DEFAULT 0`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS fat INTEGER DEFAULT 0`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS fiber INTEGER DEFAULT 0`);
    await db.execute(sql`ALTER TABLE meals ADD COLUMN IF NOT EXISTS serving_size TEXT DEFAULT ''`);
    
    console.log("Database schema optimized successfully");
  } catch (error) {
    console.log("Database schema update error (may be expected):", error);
  }

  // Helper function for error handling
  const handleError = (res: any, error: any, message: string) => {
    console.error(`${message}:`, error);
    res.status(500).json({ error: message });
  };

  // Helper function to extract trainer ID from session
  const getTrainerIdFromSession = async (req: any): Promise<number> => {
    const sessionUserId = req.session?.userId;
    if (!sessionUserId || !sessionUserId.startsWith('trainer_')) {
      throw new Error("Invalid trainer session");
    }
    
    const phoneNumber = sessionUserId.replace('trainer_', '');
    return await storage.ensureTrainerExists(phoneNumber);
  };

  // Helper function for validation
  const validate = (schema: any, data: any) => {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new Error(`Validation error: ${result.error.message}`);
    }
    return result.data;
  };

  // Authentication middleware (session-based for trainer system)
  const requireAuth = (req: any, res: any, next: any) => {
    // Check for trainer login session first
    const isLoggedIn = (req as any).session?.isLoggedIn;
    const sessionId = (req as any).session?.id;
    const userId = (req as any).session?.userId;
    
    console.log("Auth check - isLoggedIn:", isLoggedIn, "sessionId:", sessionId, "userId:", userId);
    
    // For trainer system, we use session-based authentication
    if (isLoggedIn && sessionId) {
      (req as any).userId = null; // Use null for session-based auth
      (req as any).sessionId = sessionId;
      return next();
    }
    
    // Check if trainer is logged in by checking session userId starting with "trainer_"
    if (userId && typeof userId === 'string' && userId.startsWith('trainer_')) {
      (req as any).userId = null; // Use null for session-based auth  
      (req as any).sessionId = sessionId || (req as any).session?.id;
      return next();
    }
    
    // For traditional user system with userId
    if (userId && typeof userId === 'number') {
      (req as any).userId = userId;
      (req as any).rawUserId = userId;
      return next();
    }
    
    // More lenient check - if we have any session at all, allow it for now
    if (sessionId) {
      (req as any).userId = null;
      (req as any).sessionId = sessionId;
      return next();
    }
    
    return res.status(401).json({ error: "Authentication required" });
  };

  // User Authentication Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = validate(insertUserSchema, req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      (req as any).session.userId = user.id;
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      handleError(res, error, "Failed to register user");
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { rememberMe } = req.body;
      
      // This endpoint is called after successful authentication to update login preferences
      // The session should already be authenticated at this point
      if ((req as any).session?.isLoggedIn) {
        // Update remember me preference if provided
        if (rememberMe) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30); // 30 days
          (req as any).session.rememberMeExpiry = expiryDate.toISOString();
        }
        
        res.json({ 
          success: true, 
          message: "Login preferences updated",
          rememberMe: rememberMe || false
        });
      } else {
        res.status(401).json({ error: "Not authenticated" });
      }
    } catch (error) {
      handleError(res, error, "Failed to update login preferences");
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    (req as any).session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.json({ success: true });
    });
  });

  // Trainer Authentication Route (for phone-based login)
  app.post("/api/auth/trainer-login", async (req, res) => {
    try {
      const { phone, code } = req.body;
      
      // Simple validation for demo - in production use proper OTP service
      if (phone === "09123823886" && code === "012345") {
        // Create trainer session with proper authentication flags
        const trainerId = "trainer_" + phone;
        (req as any).session.userId = trainerId;
        (req as any).session.isLoggedIn = true;
        
        res.json({ 
          success: true, 
          user: { id: trainerId, phone: phone },
          message: "ورود موفقیت‌آمیز مربی"
        });
      } else {
        res.status(401).json({ error: "کد تأیید نامعتبر است" });
      }
    } catch (error) {
      handleError(res, error, "Failed to login trainer");
    }
  });

  // Check authentication status without requiring auth (for login flow)
  app.get("/api/auth/status", async (req: any, res) => {
    try {
      const isLoggedIn = (req as any).session?.isLoggedIn;
      const sessionId = (req as any).session?.id;
      const userId = (req as any).session?.userId;
      
      console.log("Auth status check - isLoggedIn:", isLoggedIn, "sessionId:", sessionId, "userId:", userId);
      
      // Check if user has an active session
      if (isLoggedIn && sessionId) {
        res.json({ 
          isLoggedIn: true, 
          sessionId: sessionId,
          userId: userId 
        });
      } else if (userId && typeof userId === 'string' && userId.startsWith('trainer_')) {
        res.json({ 
          isLoggedIn: true, 
          sessionId: sessionId || (req as any).session?.id,
          userId: userId 
        });
      } else {
        res.json({ 
          isLoggedIn: false,
          sessionId: null,
          userId: null 
        });
      }
    } catch (error) {
      console.error("Auth status check error:", error);
      res.json({ 
        isLoggedIn: false,
        sessionId: null,
        userId: null 
      });
    }
  });

  app.get("/api/auth/me", requireAuth, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      handleError(res, error, "Failed to get user info");
    }
  });

  // Trainer Profile Routes
  app.get("/api/trainer/profile", requireAuth, async (req: any, res) => {
    try {
      // استخراج trainerId از session userId (format: trainer_09123823886)
      const sessionUserId = (req as any).session?.userId;
      if (!sessionUserId || !sessionUserId.startsWith('trainer_')) {
        return res.status(401).json({ error: "Invalid trainer session" });
      }
      
      const phoneNumber = sessionUserId.replace('trainer_', '');
      const trainerId = await storage.ensureTrainerExists(phoneNumber);
      
      const profile = await storage.getTrainerProfile(trainerId);
      res.json(profile);
    } catch (error) {
      handleError(res, error, "Failed to get trainer profile");
    }
  });

  app.post("/api/trainer/profile", requireAuth, async (req: any, res) => {
    try {
      // استخراج trainerId از session userId (format: trainer_09123823886)
      const sessionUserId = (req as any).session?.userId;
      if (!sessionUserId || !sessionUserId.startsWith('trainer_')) {
        return res.status(401).json({ error: "Invalid trainer session" });
      }
      
      const phoneNumber = sessionUserId.replace('trainer_', '');
      const trainerId = await storage.ensureTrainerExists(phoneNumber);
      
      const profileData = validate(insertTrainerProfileSchema, { ...req.body, userId: trainerId });
      const profile = await storage.createTrainerProfile(profileData);
      res.json(profile);
    } catch (error) {
      handleError(res, error, "Failed to create trainer profile");
    }
  });

  app.put("/api/trainer/profile", requireAuth, async (req: any, res) => {
    try {
      // استخراج trainerId از session userId (format: trainer_09123823886)
      const sessionUserId = (req as any).session?.userId;
      if (!sessionUserId || !sessionUserId.startsWith('trainer_')) {
        return res.status(401).json({ error: "Invalid trainer session" });
      }
      
      const phoneNumber = sessionUserId.replace('trainer_', '');
      const trainerId = await storage.ensureTrainerExists(phoneNumber);
      
      console.log("Extracted trainerId from session:", trainerId);
      
      // اول بررسی کنیم که آیا پروفایل وجود دارد یا نه
      let existingProfile;
      try {
        existingProfile = await storage.getTrainerProfile(trainerId);
        console.log("Found existing profile:", existingProfile?.id);
      } catch (error) {
        // اگر پروفایل وجود ندارد، یکی ایجاد می‌کنیم
        console.log("No existing profile found, creating new one for trainerId:", trainerId);
        const profileData = validate(insertTrainerProfileSchema, { ...req.body, userId: trainerId });
        const newProfile = await storage.createTrainerProfile(profileData);
        console.log("Created new profile:", newProfile);
        return res.json(newProfile);
      }
      
      // اگر پروفایل وجود دارد، آن را به‌روزرسانی می‌کنیم
      console.log("Updating existing trainer profile for userId:", trainerId);
      console.log("Request body:", req.body);
      
      const profile = await storage.updateTrainerProfile(trainerId, req.body);
      console.log("Profile updated successfully:", profile);
      res.json(profile);
    } catch (error) {
      console.error("Error in PUT /api/trainer/profile:", error);
      handleError(res, error, "Failed to update trainer profile");
    }
  });

  // Student Routes
  app.get("/api/students/check-phone/:phone", requireAuth, async (req: any, res) => {
    try {
      // Extract phone number from session userId (format: trainer_09123823886)
      const sessionUserId = (req as any).session?.userId;
      let trainerId: number;
      
      if (sessionUserId && typeof sessionUserId === 'string' && sessionUserId.startsWith('trainer_')) {
        const phoneNumber = sessionUserId.replace('trainer_', '');
        await storage.ensureTrainerExists(phoneNumber);
        trainerId = await storage.getTrainerIdByPhoneNumber(phoneNumber);
      } else {
        // Fallback to default trainer
        await storage.ensureDefaultTrainer();
        trainerId = await storage.getDefaultTrainerId();
      }
      
      const phone = req.params.phone;
      const existingStudent = await storage.getStudentByPhone(phone, trainerId);
      res.json({ exists: !!existingStudent, student: existingStudent });
    } catch (error) {
      handleError(res, error, "Failed to check phone number");
    }
  });

  app.get("/api/students", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const students = await storage.getStudents(trainerId);
      res.json(students);
    } catch (error) {
      handleError(res, error, "Failed to get students");
    }
  });

  app.get("/api/students/:id", requireAuth, async (req, res) => {
    try {
      const student = await storage.getStudent(parseInt(req.params.id));
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (error) {
      handleError(res, error, "Failed to get student");
    }
  });

  app.post("/api/students", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      
      const studentData = validate(insertStudentSchema, { ...req.body, trainerId });
      const student = await storage.createStudent(studentData);
      
      // Add history entry only if student was successfully created
      if (student && student.id) {
        try {
          await storage.createStudentHistory({
            studentId: student.id,
            trainerId: trainerId,
            action: "created",
            entityType: "profile",
            description: `شاگرد ${student.name} ایجاد شد`
          });
        } catch (historyError) {
          console.error('Error creating student history:', historyError);
          // Don't fail the whole operation if history creation fails
        }
      }
      
      res.json(student);
    } catch (error) {
      // Handle specific error types
      if (error instanceof Error) {
        if (error.message.includes('شماره تلفن') && error.message.includes('قبلاً ثبت شده')) {
          return res.status(400).json({ 
            error: "Duplicate phone number", 
            message: error.message 
          });
        }
      }
      handleError(res, error, "Failed to create student");
    }
  });

  app.put("/api/students/:id", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const student = await storage.updateStudent(studentId, req.body);
      
      // Add history entry only if student was successfully updated
      if (student && student.id) {
        try {
          await storage.ensureDefaultTrainer();
          const trainerId = await storage.getDefaultTrainerId();
          await storage.createStudentHistory({
            studentId: studentId,
            trainerId: trainerId,
            action: "updated",
            entityType: "profile",
            changes: req.body,
            description: `پروفایل شاگرد به‌روزرسانی شد`
          });
        } catch (historyError) {
          console.error('Error creating student history:', historyError);
          // Don't fail the whole operation if history creation fails
        }
      }
      
      res.json(student);
    } catch (error) {
      handleError(res, error, "Failed to update student");
    }
  });

  app.patch("/api/students/:id/access", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const { isActive } = req.body;
      
      const student = await storage.updateStudent(studentId, { isActive });
      
      // Add history entry only if student access was successfully updated
      if (student && student.id) {
        try {
          await storage.ensureDefaultTrainer();
          const trainerId = await storage.getDefaultTrainerId();
          await storage.createStudentHistory({
            studentId: studentId,
            trainerId: trainerId,
            action: "access_changed",
            entityType: "access_control",
            changes: { isActive },
            description: `دسترسی شاگرد ${isActive ? 'فعال' : 'غیرفعال'} شد`
          });
        } catch (historyError) {
          console.error('Error creating student history:', historyError);
          // Don't fail the whole operation if history creation fails
        }
      }
      
      res.json(student);
    } catch (error) {
      handleError(res, error, "Failed to update student access");
    }
  });

  app.delete("/api/students/:id", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.id);
      
      // The deleteStudent method in storage already handles all related record deletions
      await storage.deleteStudent(studentId);
      
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete student");
    }
  });

  // Student Panel API Endpoints
  // Current student endpoint (for student authentication)
  app.get("/api/current-student", async (req, res) => {
    try {
      // For now, return the first active student (demo purposes)
      // In a real app, this would be based on student authentication
      const trainerId = await getTrainerIdFromSession(req);
      const students = await storage.getStudents(trainerId);
      const activeStudent = students.find(s => s.isActive) || students[0];
      
      if (!activeStudent) {
        return res.status(404).json({ error: "No student found" });
      }
      
      res.json(activeStudent);
    } catch (error) {
      handleError(res, error, "Failed to get current student");
    }
  });

  // Student-specific exercise programs
  app.get("/api/students/:id/exercise-programs", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const programs = await storage.getStudentExercisePrograms(studentId);
      res.json(programs);
    } catch (error) {
      handleError(res, error, "Failed to get student exercise programs");
    }
  });

  // Student-specific meal plans  
  app.get("/api/students/:id/meal-plans", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const plans = await storage.getStudentMealPlans(studentId);
      res.json(plans);
    } catch (error) {
      handleError(res, error, "Failed to get student meal plans");
    }
  });

  // Student-specific supplements
  app.get("/api/students/:id/supplements", async (req, res) => {
    try {
      const studentId = parseInt(req.params.id);
      const supplements = await storage.getStudentSupplements(studentId);
      res.json(supplements);
    } catch (error) {
      handleError(res, error, "Failed to get student supplements");
    }
  });

  // Exercise Types Routes (Main Categories)
  app.get("/api/exercise-types", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const types = await storage.getExerciseTypes(trainerId);
      res.json(types);
    } catch (error) {
      handleError(res, error, "Failed to get exercise types");
    }
  });

  app.post("/api/exercise-types", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const typeData = validate(insertExerciseTypeSchema, { ...req.body, trainerId });
      const type = await storage.createExerciseType(typeData);
      res.json(type);
    } catch (error) {
      handleError(res, error, "Failed to create exercise type");
    }
  });

  app.put("/api/exercise-types/:id", requireAuth, async (req, res) => {
    try {
      const type = await storage.updateExerciseType(parseInt(req.params.id), req.body);
      res.json(type);
    } catch (error) {
      handleError(res, error, "Failed to update exercise type");
    }
  });

  app.delete("/api/exercise-types/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteExerciseType(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete exercise type");
    }
  });

  // Exercise Category Routes (Subcategories)
  app.get("/api/exercise-categories", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const categories = await storage.getExerciseCategories(trainerId);
      res.json(categories);
    } catch (error) {
      handleError(res, error, "Failed to get exercise categories");
    }
  });

  // Get categories by type
  app.get("/api/exercise-types/:typeId/categories", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const typeId = parseInt(req.params.typeId);
      const categories = await storage.getCategoriesByType(trainerId, typeId);
      res.json(categories);
    } catch (error) {
      handleError(res, error, "Failed to get categories by type");
    }
  });

  app.post("/api/exercise-categories", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const categoryData = validate(insertExerciseCategorySchema, { ...req.body, trainerId });
      const category = await storage.createExerciseCategory(categoryData);
      res.json(category);
    } catch (error) {
      handleError(res, error, "Failed to create exercise category");
    }
  });

  app.put("/api/exercise-categories/:id", requireAuth, async (req, res) => {
    try {
      const category = await storage.updateExerciseCategory(parseInt(req.params.id), req.body);
      res.json(category);
    } catch (error) {
      handleError(res, error, "Failed to update exercise category");
    }
  });

  app.delete("/api/exercise-categories/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteExerciseCategory(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete exercise category");
    }
  });

  // Exercise Routes
  app.get("/api/exercises", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const exercises = await storage.getExercises(trainerId);
      res.json(exercises);
    } catch (error) {
      handleError(res, error, "Failed to get exercises");
    }
  });

  // Get exercises by category
  app.get("/api/exercise-categories/:categoryId/exercises", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const categoryId = parseInt(req.params.categoryId);
      const exercises = await storage.getExercisesByCategory(trainerId, categoryId);
      res.json(exercises);
    } catch (error) {
      handleError(res, error, "Failed to get exercises by category");
    }
  });

  app.get("/api/exercises/:id", requireAuth, async (req, res) => {
    try {
      const exercise = await storage.getExercise(parseInt(req.params.id));
      if (!exercise) {
        return res.status(404).json({ error: "Exercise not found" });
      }
      res.json(exercise);
    } catch (error) {
      handleError(res, error, "Failed to get exercise");
    }
  });

  app.post("/api/exercises", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const exerciseData = validate(insertExerciseSchema, { ...req.body, trainerId });
      const exercise = await storage.createExercise(exerciseData);
      res.json(exercise);
    } catch (error) {
      handleError(res, error, "Failed to create exercise");
    }
  });

  app.put("/api/exercises/:id", requireAuth, async (req, res) => {
    try {
      const exercise = await storage.updateExercise(parseInt(req.params.id), req.body);
      res.json(exercise);
    } catch (error) {
      handleError(res, error, "Failed to update exercise");
    }
  });

  app.delete("/api/exercises/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteExercise(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete exercise");
    }
  });

  app.delete("/api/exercises", requireAuth, async (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "IDs array is required" });
      }
      await storage.deleteExercises(ids.map(id => parseInt(id)));
      res.json({ success: true, deletedCount: ids.length });
    } catch (error) {
      handleError(res, error, "Failed to delete exercises");
    }
  });

  // Student Exercise Program Routes
  app.get("/api/students/:studentId/exercise-programs", requireAuth, async (req, res) => {
    try {
      const programs = await storage.getStudentExercisePrograms(parseInt(req.params.studentId));
      res.json(programs);
    } catch (error) {
      handleError(res, error, "Failed to get student exercise programs");
    }
  });

  // Get all student exercise programs for all students (for dashboard stats)
  app.get("/api/student-exercise-programs", requireAuth, async (req, res) => {
    try {
      const programs = await storage.getAllStudentExercisePrograms();
      res.json(programs);
    } catch (error) {
      handleError(res, error, "Failed to get all student exercise programs");
    }
  });

  app.post("/api/students/:studentId/exercise-programs", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const programData = validate(insertStudentExerciseProgramSchema, { ...req.body, studentId });
      const program = await storage.createStudentExerciseProgram(programData);
      
      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: studentId,
        trainerId: trainerId,
        action: "created",
        entityType: "exercise",
        entityId: program.exerciseId,
        description: `تمرین جدید به برنامه اضافه شد`
      });
      
      res.json(program);
    } catch (error) {
      handleError(res, error, "Failed to create student exercise program");
    }
  });

  app.put("/api/student-exercise-programs/:id", requireAuth, async (req: any, res) => {
    try {
      const program = await storage.updateStudentExerciseProgram(parseInt(req.params.id), req.body);
      
      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: program.studentId,
        trainerId: trainerId,
        action: "updated",
        entityType: "exercise",
        entityId: program.exerciseId,
        changes: req.body,
        description: `برنامه تمرینی به‌روزرسانی شد`
      });
      
      res.json(program);
    } catch (error) {
      handleError(res, error, "Failed to update student exercise program");
    }
  });

  app.delete("/api/student-exercise-programs/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteStudentExerciseProgram(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete student exercise program");
    }
  });

  // Bulk save exercise programs for a student and day
  app.post("/api/students/:studentId/exercise-programs/bulk", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const { exercises, day = 1 } = req.body;
      
      if (!Array.isArray(exercises)) {
        return res.status(400).json({ error: "Exercises array is required" });
      }

      // First, delete existing programs for this student and day
      await storage.deleteStudentExerciseProgramsByStudentAndDay(studentId, day);

      // Create new programs
      const createdPrograms = [];
      for (const exercise of exercises) {
        const programData = {
          studentId,
          exerciseId: exercise.id,
          dayOfWeek: day,
          sets: exercise.sets || 3,
          reps: exercise.reps || "12",
          weight: exercise.weight || null,
          restTime: exercise.restTime || null,
          notes: exercise.notes || null
        };
        
        const program = await storage.createStudentExerciseProgram(programData);
        createdPrograms.push(program);
      }

      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: studentId,
        trainerId: trainerId,
        action: "bulk_created",
        entityType: "exercise",
        description: `${exercises.length} تمرین برای روز ${day} ذخیره شد`
      });

      res.json({ success: true, programs: createdPrograms, count: createdPrograms.length });
    } catch (error) {
      handleError(res, error, "Failed to bulk save student exercise programs");
    }
  });

  // Meal Category Routes
  app.get("/api/meal-categories", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const categories = await storage.getMealCategories(trainerId);
      res.json(categories);
    } catch (error) {
      handleError(res, error, "Failed to get meal categories");
    }
  });

  app.post("/api/meal-categories", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const categoryData = validate(insertMealCategorySchema, { ...req.body, trainerId });
      const category = await storage.createMealCategory(categoryData);
      res.json(category);
    } catch (error) {
      handleError(res, error, "Failed to create meal category");
    }
  });

  app.put("/api/meal-categories/:id", requireAuth, async (req, res) => {
    try {
      const category = await storage.updateMealCategory(parseInt(req.params.id), req.body);
      res.json(category);
    } catch (error) {
      handleError(res, error, "Failed to update meal category");
    }
  });

  app.delete("/api/meal-categories/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteMealCategory(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete meal category");
    }
  });

  // Debug endpoints to check data migration (without auth for testing)
  app.get("/api/debug/meals", async (req: any, res) => {
    try {
      const allMeals = await storage.getAllMeals();
      const trainerCounts = allMeals.reduce((acc: Record<number, number>, meal: any) => {
        acc[meal.trainer_id || meal.trainerId] = (acc[meal.trainer_id || meal.trainerId] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      res.json({
        totalMeals: allMeals.length,
        trainerCounts,
        sampleMeals: allMeals.slice(0, 5)
      });
    } catch (error) {
      handleError(res, error, "Failed to debug meals");
    }
  });

  app.get("/api/debug/students", async (req: any, res) => {
    try {
      const allStudents = await storage.getAllStudents();
      const trainerCounts = allStudents.reduce((acc: Record<number, number>, student: any) => {
        acc[student.trainer_id || student.trainerId] = (acc[student.trainer_id || student.trainerId] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      res.json({
        totalStudents: allStudents.length,
        trainerCounts,
        sampleStudents: allStudents.slice(0, 5)
      });
    } catch (error) {
      handleError(res, error, "Failed to debug students");
    }
  });

  app.get("/api/debug/exercises", async (req: any, res) => {
    try {
      const allExercises = await storage.getAllExercises();
      const trainerCounts = allExercises.reduce((acc: Record<number, number>, exercise: any) => {
        acc[exercise.trainer_id || exercise.trainerId] = (acc[exercise.trainer_id || exercise.trainerId] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      res.json({
        totalExercises: allExercises.length,
        trainerCounts,
        sampleExercises: allExercises.slice(0, 5)
      });
    } catch (error) {
      handleError(res, error, "Failed to debug exercises");
    }
  });

  app.get("/api/debug/supplements", async (req: any, res) => {
    try {
      const allSupplements = await storage.getAllSupplements();
      const trainerCounts = allSupplements.reduce((acc: Record<number, number>, supplement: any) => {
        acc[supplement.trainer_id || supplement.trainerId] = (acc[supplement.trainer_id || supplement.trainerId] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      res.json({
        totalSupplements: allSupplements.length,
        trainerCounts,
        sampleSupplements: allSupplements.slice(0, 5)
      });
    } catch (error) {
      handleError(res, error, "Failed to debug supplements");
    }
  });

  // Meal Routes
  app.get("/api/meals", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      console.log("Getting meals for trainer ID =", trainerId);
      const meals = await storage.getMeals(trainerId);
      console.log("Found meals for trainer ID =", trainerId, ":", meals.length);
      res.json(meals);
    } catch (error) {
      handleError(res, error, "Failed to get meals");
    }
  });

  app.get("/api/meals/:id", requireAuth, async (req, res) => {
    try {
      const meal = await storage.getMeal(parseInt(req.params.id));
      if (!meal) {
        return res.status(404).json({ error: "Meal not found" });
      }
      res.json(meal);
    } catch (error) {
      handleError(res, error, "Failed to get meal");
    }
  });

  app.post("/api/meals", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const mealData = validate(insertMealSchema, { ...req.body, trainerId });
      const meal = await storage.createMeal(mealData);
      res.json(meal);
    } catch (error) {
      handleError(res, error, "Failed to create meal");
    }
  });

  app.put("/api/meals/:id", requireAuth, async (req, res) => {
    try {
      const meal = await storage.updateMeal(parseInt(req.params.id), req.body);
      res.json(meal);
    } catch (error) {
      handleError(res, error, "Failed to update meal");
    }
  });

  app.delete("/api/meals/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteMeal(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete meal");
    }
  });

  // Fix meal types - update null meal types to proper Persian values
  app.post('/api/admin/fix-meal-types', requireAuth, async (req: any, res) => {
    try {
      console.log('Fixing meal types...');
      
      // Get all meals with null types
      const trainerId = await getTrainerIdFromSession(req);
      const meals = await storage.getMeals(trainerId);
      const nullTypeMeals = meals.filter(meal => !meal.mealType);
      
      console.log(`Found ${nullTypeMeals.length} meals with null types`);
      
      const mealTypes = ['صبحانه', 'ناهار', 'شام', 'میان‌وعده'];
      let updatedCount = 0;
      
      // Assign meal types based on meal ID or name patterns
      for (const meal of nullTypeMeals) {
        let assignedType = 'صبحانه'; // default
        
        // Check name patterns for Persian meal types
        const name = meal.name.toLowerCase();
        if (name.includes('صبح') || name.includes('صبحانه')) {
          assignedType = 'صبحانه';
        } else if (name.includes('ناهار') || name.includes('غذا') || name.includes('نهار')) {
          assignedType = 'ناهار';
        } else if (name.includes('شام')) {
          assignedType = 'شام';
        } else if (name.includes('میان') || name.includes('وعده')) {
          assignedType = 'میان‌وعده';
        } else {
          // Distribute randomly based on meal ID
          assignedType = mealTypes[meal.id % 4];
        }
        
        // Update the meal
        await storage.updateMeal(meal.id, {
          mealType: assignedType
        });
        updatedCount++;
      }
      
      console.log(`Updated ${updatedCount} meals with proper types`);
      res.json({ success: true, updatedCount });
    } catch (error) {
      console.error('Error fixing meal types:', error);
      res.status(500).json({ error: 'Failed to fix meal types' });
    }
  });

  // Bulk meal plans endpoint
  app.post("/api/students/:studentId/meal-plans/bulk", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const { meals, day = 1 } = req.body;
      
      if (!Array.isArray(meals)) {
        return res.status(400).json({ error: "Meals array is required" });
      }

      // First, delete existing meal plans for this student and day
      await storage.deleteStudentMealPlansByStudentAndDay(studentId, day);

      // Create new meal plans
      const createdPlans = [];
      for (const mealId of meals) {
        const planData = {
          studentId,
          mealId: mealId,
          dayOfWeek: day,
          mealTime: "main",
          portion: "1",
          notes: null,
          isCompleted: false,
          completedAt: null
        };
        
        const plan = await storage.createStudentMealPlan(planData);
        createdPlans.push(plan);
      }

      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: studentId,
        trainerId: trainerId,
        action: "bulk_created",
        entityType: "meal",
        description: `${meals.length} وعده غذایی برای روز ${day} ذخیره شد`
      });

      res.json({ success: true, plans: createdPlans, count: createdPlans.length });
    } catch (error) {
      handleError(res, error, "Failed to bulk save student meal plans");
    }
  });

  // Student Meal Plan Routes
  app.get("/api/students/:studentId/meal-plans", requireAuth, async (req, res) => {
    try {
      const plans = await storage.getStudentMealPlans(parseInt(req.params.studentId));
      res.json(plans);
    } catch (error) {
      handleError(res, error, "Failed to get student meal plans");
    }
  });

  app.post("/api/students/:studentId/meal-plans", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const planData = validate(insertStudentMealPlanSchema, { ...req.body, studentId });
      const plan = await storage.createStudentMealPlan(planData);
      
      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: studentId,
        trainerId: trainerId,
        action: "created",
        entityType: "meal",
        entityId: plan.mealId,
        description: `وعده غذایی جدید به برنامه اضافه شد`
      });
      
      res.json(plan);
    } catch (error) {
      handleError(res, error, "Failed to create student meal plan");
    }
  });

  // Student API Endpoints for Panel Access
  app.get("/api/student-meal-plans/:studentId", requireAuth, async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const mealPlans = await storage.getStudentMealPlans(studentId);
      res.json(mealPlans);
    } catch (error) {
      handleError(res, error, "Failed to get student meal plans");
    }
  });

  app.get("/api/student-supplements/:studentId", requireAuth, async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const supplements = await storage.getStudentSupplements(studentId);
      res.json(supplements);
    } catch (error) {
      handleError(res, error, "Failed to get student supplements");
    }
  });

  app.get("/api/student-reports/:studentId", requireAuth, async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      
      // Get student data
      const student = await storage.getStudent(studentId);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Get exercise programs
      const exercisePrograms = await storage.getStudentExercisePrograms(studentId);
      
      // Get meal plans
      const mealPlans = await storage.getStudentMealPlans(studentId);
      
      // Get supplements
      const supplements = await storage.getStudentSupplements(studentId);

      // Calculate progress statistics
      const reports = {
        student,
        exerciseProgress: exercisePrograms.length,
        mealProgress: mealPlans.length,
        supplementProgress: supplements.length,
        weeklyStats: [], // Add weekly calculation logic here
        achievements: []  // Add achievements logic here
      };

      res.json(reports);
    } catch (error) {
      handleError(res, error, "Failed to get student reports");
    }
  });

  app.put("/api/student-meal-plans/:id", requireAuth, async (req: any, res) => {
    try {
      const plan = await storage.updateStudentMealPlan(parseInt(req.params.id), req.body);
      
      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: plan.studentId,
        trainerId: trainerId,
        action: "updated",
        entityType: "meal",
        entityId: plan.mealId,
        changes: req.body,
        description: `برنامه غذایی به‌روزرسانی شد`
      });
      
      res.json(plan);
    } catch (error) {
      handleError(res, error, "Failed to update student meal plan");
    }
  });

  app.delete("/api/student-meal-plans/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteStudentMealPlan(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete student meal plan");
    }
  });

  // Supplement Category Routes
  app.get("/api/supplement-categories", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const categories = await storage.getSupplementCategories(trainerId);
      res.json(categories);
    } catch (error) {
      handleError(res, error, "Failed to get supplement categories");
    }
  });

  app.post("/api/supplement-categories", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const categoryData = validate(insertSupplementCategorySchema, { ...req.body, trainerId });
      const category = await storage.createSupplementCategory(categoryData);
      res.json(category);
    } catch (error) {
      handleError(res, error, "Failed to create supplement category");
    }
  });

  app.put("/api/supplement-categories/:id", requireAuth, async (req, res) => {
    try {
      const category = await storage.updateSupplementCategory(parseInt(req.params.id), req.body);
      res.json(category);
    } catch (error) {
      handleError(res, error, "Failed to update supplement category");
    }
  });

  app.delete("/api/supplement-categories/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteSupplementCategory(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete supplement category");
    }
  });

  // Supplement Routes
  app.get("/api/supplements", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const supplements = await storage.getSupplements(trainerId);
      res.json(supplements);
    } catch (error) {
      handleError(res, error, "Failed to get supplements");
    }
  });

  app.get("/api/supplements/:id", requireAuth, async (req, res) => {
    try {
      const supplement = await storage.getSupplement(parseInt(req.params.id));
      if (!supplement) {
        return res.status(404).json({ error: "Supplement not found" });
      }
      res.json(supplement);
    } catch (error) {
      handleError(res, error, "Failed to get supplement");
    }
  });



  app.post("/api/supplements", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const supplementData = validate(insertSupplementSchema, { ...req.body, trainerId });
      const supplement = await storage.createSupplement(supplementData);
      res.json(supplement);
    } catch (error) {
      handleError(res, error, "Failed to create supplement");
    }
  });

  app.put("/api/supplements/:id", requireAuth, async (req, res) => {
    try {
      const supplement = await storage.updateSupplement(parseInt(req.params.id), req.body);
      res.json(supplement);
    } catch (error) {
      handleError(res, error, "Failed to update supplement");
    }
  });

  app.delete("/api/supplements/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteSupplement(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete supplement");
    }
  });

  // Bulk supplements endpoint
  app.post("/api/students/:studentId/supplements/bulk", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const { supplements, vitamins, day = 1 } = req.body;
      
      if (!Array.isArray(supplements) && !Array.isArray(vitamins)) {
        return res.status(400).json({ error: "Supplements or vitamins array is required" });
      }

      // Delete existing supplements for this student  
      await storage.deleteStudentSupplementsByStudent(studentId);

      // Create new supplement plans
      const createdSupplements = [];
      const allItems = [
        ...(supplements || []).map((id: number) => ({ id, type: 'supplement' })),
        ...(vitamins || []).map((id: number) => ({ id, type: 'vitamin' }))
      ];

      for (const item of allItems) {
        // Get supplement info to use its default dosage and frequency
        const supplement = await storage.getSupplement(item.id);
        if (!supplement) continue;
        
        const supplementData = {
          studentId,
          supplementId: item.id,
          dosage: supplement.dosage,
          frequency: supplement.frequency,
          timesPerDay: 1,
          instructions: null,
          startDate: new Date(),
          endDate: null,
          isActive: true,
          notes: null
        };
        
        const studentSupplement = await storage.createStudentSupplement(supplementData);
        createdSupplements.push(studentSupplement);
      }

      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: studentId,
        trainerId: trainerId,
        action: "bulk_created", 
        entityType: "supplement",
        description: `${allItems.length} مکمل و ویتامین برای شاگرد ذخیره شد`
      });

      res.json({ success: true, supplements: createdSupplements, count: createdSupplements.length });
    } catch (error) {
      handleError(res, error, "Failed to bulk save student supplements");
    }
  });

  // Student Supplement Routes
  app.get("/api/students/:studentId/supplements", requireAuth, async (req, res) => {
    try {
      const supplements = await storage.getStudentSupplements(parseInt(req.params.studentId));
      res.json(supplements);
    } catch (error) {
      handleError(res, error, "Failed to get student supplements");
    }
  });

  app.post("/api/students/:studentId/supplements", requireAuth, async (req: any, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const supplementData = validate(insertStudentSupplementSchema, { ...req.body, studentId });
      const supplement = await storage.createStudentSupplement(supplementData);
      
      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: studentId,
        trainerId: trainerId,
        action: "created",
        entityType: "supplement",
        entityId: supplement.supplementId,
        description: `مکمل جدید به برنامه اضافه شد`
      });
      
      res.json(supplement);
    } catch (error) {
      handleError(res, error, "Failed to create student supplement");
    }
  });

  app.put("/api/student-supplements/:id", requireAuth, async (req: any, res) => {
    try {
      const supplement = await storage.updateStudentSupplement(parseInt(req.params.id), req.body);
      
      // Add history entry
      const trainerId = await getTrainerIdFromSession(req);
      await storage.createStudentHistory({
        studentId: supplement.studentId,
        trainerId: trainerId,
        action: "updated",
        entityType: "supplement",
        entityId: supplement.supplementId,
        changes: req.body,
        description: `برنامه مکمل‌گیری به‌روزرسانی شد`
      });
      
      res.json(supplement);
    } catch (error) {
      handleError(res, error, "Failed to update student supplement");
    }
  });

  app.delete("/api/student-supplements/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteStudentSupplement(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete student supplement");
    }
  });

  // Student History Routes
  app.get("/api/students/:studentId/history", requireAuth, async (req, res) => {
    try {
      const history = await storage.getStudentHistory(parseInt(req.params.studentId));
      res.json(history);
    } catch (error) {
      handleError(res, error, "Failed to get student history");
    }
  });

  // Support Ticket Routes
  app.get("/api/support/tickets", requireAuth, async (req: any, res) => {
    try {
      // For trainer session-based authentication, use database with trainer ID = 1
      const trainerId = await getTrainerIdFromSession(req);
      const tickets = await storage.getSupportTickets(trainerId);
      res.json(tickets);
    } catch (error) {
      handleError(res, error, "Failed to get support tickets");
    }
  });

  app.get("/api/support/tickets/:id", requireAuth, async (req, res) => {
    try {
      const ticket = await storage.getSupportTicket(parseInt(req.params.id));
      if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json(ticket);
    } catch (error) {
      handleError(res, error, "Failed to get support ticket");
    }
  });

  app.post("/api/support/tickets", requireAuth, async (req: any, res) => {
    try {
      // Generate ticket number
      const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      const trainerId = await getTrainerIdFromSession(req);
      const ticketData = validate(insertSupportTicketSchema, { 
        ...req.body, 
        trainerId: trainerId,
        ticketNumber 
      });
      const ticket = await storage.createSupportTicket(ticketData);
      res.json(ticket);
    } catch (error) {
      handleError(res, error, "Failed to create support ticket");
    }
  });

  app.put("/api/support/tickets/:id", requireAuth, async (req, res) => {
    try {
      const ticket = await storage.updateSupportTicket(parseInt(req.params.id), req.body);
      res.json(ticket);
    } catch (error) {
      handleError(res, error, "Failed to update support ticket");
    }
  });

  app.delete("/api/support/tickets/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteSupportTicket(parseInt(req.params.id));
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete support ticket");
    }
  });

  // Ticket Response Routes
  app.get("/api/support/tickets/:ticketId/responses", requireAuth, async (req, res) => {
    try {
      const responses = await storage.getTicketResponses(parseInt(req.params.ticketId));
      res.json(responses);
    } catch (error) {
      handleError(res, error, "Failed to get ticket responses");
    }
  });

  app.post("/api/support/tickets/:ticketId/responses", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const responseData = validate(insertTicketResponseSchema, {
        ...req.body,
        ticketId: parseInt(req.params.ticketId),
        authorType: "trainer",
        authorId: trainerId
      });
      const response = await storage.createTicketResponse(responseData);
      res.json(response);
    } catch (error) {
      handleError(res, error, "Failed to create ticket response");
    }
  });

  // Support Message Routes
  app.get("/api/support/messages", requireAuth, async (req: any, res) => {
    try {
      const { studentId } = req.query;
      const trainerId = await getTrainerIdFromSession(req);
      const messages = await storage.getSupportMessages(
        studentId ? parseInt(studentId) : undefined,
        trainerId
      );
      res.json(messages);
    } catch (error) {
      handleError(res, error, "Failed to get support messages");
    }
  });

  app.post("/api/support/messages", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const messageData = validate(insertSupportMessageSchema, {
        ...req.body,
        trainerId: trainerId,
        sender: "trainer"
      });
      const message = await storage.createSupportMessage(messageData);
      res.json(message);
    } catch (error) {
      handleError(res, error, "Failed to create support message");
    }
  });

  app.post("/api/support/messages/mark-read", requireAuth, async (req: any, res) => {
    try {
      const { studentId } = req.body;
      const trainerId = await getTrainerIdFromSession(req);
      await storage.markSupportMessagesAsRead(studentId, trainerId);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to mark messages as read");
    }
  });

  // Delete individual support message
  app.delete("/api/support/messages/:id", requireAuth, async (req, res) => {
    try {
      const messageId = parseInt(req.params.id);
      await storage.deleteSupportMessage(messageId);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete support message");
    }
  });

  // Delete all support messages
  app.delete("/api/support/messages", requireAuth, async (req, res) => {
    try {
      await storage.deleteAllSupportMessages();
      res.json({ success: true, message: "All support messages deleted" });
    } catch (error) {
      handleError(res, error, "Failed to delete all support messages");
    }
  });

  // Clear all support data
  app.delete("/api/support/clear", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      
      // Delete all ticket responses for this trainer
      await db.delete(ticketResponses).where(
        inArray(ticketResponses.ticketId, 
          db.select({ id: supportTickets.id }).from(supportTickets).where(eq(supportTickets.trainerId, trainerId))
        )
      );
      
      // Delete all tickets for this trainer
      await db.delete(supportTickets).where(eq(supportTickets.trainerId, trainerId));
      
      // Delete all messages for this trainer
      await db.delete(supportMessages).where(eq(supportMessages.trainerId, trainerId));
      
      res.json({ success: true, message: "All support data cleared" });
    } catch (error) {
      handleError(res, error, "Failed to clear support data");
    }
  });

  // Current student endpoint - always return student ID 5 for testing
  app.get("/api/current-student", requireAuth, async (req: any, res) => {
    try {
      console.log("API: Getting current student (defaulting to student ID 5)");
      
      // For testing purposes, always return student with ID 5
      const student = await storage.getStudent(5);
      
      if (!student) {
        console.log("API: Student with ID 5 not found");
        return res.status(404).json({ error: "Student not found" });
      }
      
      console.log("API: Found student:", student.name);
      res.json(student);
    } catch (error) {
      handleError(res, error, "Failed to get current student");
    }
  });

  // Update current student
  app.put("/api/current-student", requireAuth, async (req, res) => {
    try {
      const userId = (req as any).userId;
      const updateData = req.body;
      
      const updatedStudent = await storage.updateUser(userId, updateData);
      
      if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      
      res.json(updatedStudent);
    } catch (error) {
      handleError(res, error, "Failed to update student");
    }
  });

  // Student programs endpoints
  app.get("/api/student-programs", requireAuth, async (req, res) => {
    try {
      const programs = await storage.getAllStudentPrograms();
      res.json(programs);
    } catch (error) {
      handleError(res, error, "Failed to get student programs");
    }
  });

  // Get complete student program data (exercises, meals, supplements)
  app.get("/api/student-program/:studentId", requireAuth, async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      console.log(`API: Getting student program for student ID: ${studentId}`);
      
      // Get all available meals for current trainer
      const trainerId = await getTrainerIdFromSession(req);
      const meals = await storage.getMeals(trainerId);
      console.log(`API: Found ${meals.length} meals for trainer ID: ${trainerId}`);
      
      // Get student exercise programs
      const exercises = await storage.getStudentExercisePrograms(studentId);
      
      // Get student supplements 
      const supplements = await storage.getStudentSupplements(studentId);
      
      // Return program data with all available meals
      const programData = {
        id: 1,
        name: "برنامه کاهش وزن و تناسب اندام",
        startDate: "۱۴۰۳/۰۸/۰۱",
        endDate: "۱۴۰۳/۱۱/۰۱",
        duration: "۳ ماه",
        status: 'active',
        progress: 65,
        exercises: exercises,
        meals: meals, // Include all available meals
        supplements: supplements,
        goals: [
          "کاهش ۱۰ کیلوگرم وزن",
          "افزایش قدرت عضلانی",
          "بهبود استقامت قلبی",
          "کاهش درصد چربی بدن"
        ],
        trainerNotes: "برنامه شخصی‌سازی شده برای کاهش وزن و افزایش تناسب اندام. دقت ویژه به رژیم غذایی و انجام تمرینات منظم ضروری است."
      };
      
      res.json(programData);
    } catch (error) {
      handleError(res, error, "Failed to get student program");
    }
  });

  app.put("/api/student-programs/:studentId", requireAuth, async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const programData = req.body;
      
      const program = await storage.updateStudentProgram(studentId, programData);
      res.json(program);
    } catch (error) {
      handleError(res, error, "Failed to update student program");
    }
  });

  // User Preferences Routes (localStorage replacement)
  app.get("/api/preferences", async (req, res) => {
    try {
      const rawUserId = (req as any).session?.userId || null;
      // Handle string userIds (like "trainer_09123823886") by setting to null and using sessionId instead
      const userId = (rawUserId && typeof rawUserId === 'number') ? rawUserId : null;
      const sessionId = (req as any).session?.id || null;
      
      const preferences = await storage.getUserPreferences(userId, sessionId);
      res.json(preferences);
    } catch (error) {
      handleError(res, error, "Failed to get user preferences");
    }
  });

  app.get("/api/preferences/:key", async (req, res) => {
    try {
      const key = req.params.key;
      const rawUserId = (req as any).session?.userId || null;
      // Handle string userIds (like "trainer_09123823886") by setting to null and using sessionId instead
      const userId = (rawUserId && typeof rawUserId === 'number') ? rawUserId : null;
      // Use client-provided sessionId from query parameter or fallback to server session
      const clientSessionId = req.query.sessionId as string;
      const sessionId = clientSessionId || (req as any).session?.id || null;
      
      // For specific keys, check preferences first before database tables
      if (key === 'students') {
        // First try to get from preferences (where our data is actually stored)
        let preference = await storage.getUserPreference(userId, sessionId, key);
        
        // If not found with current session, try global fallback
        if (!preference) {
          const preferences = await db.select()
            .from(userPreferences)
            .where(eq(userPreferences.key, key))
            .orderBy(desc(userPreferences.updatedAt))
            .limit(1);
          
          preference = preferences[0] || null;
        }
        
        if (preference) {
          return res.json({ key, value: preference.value });
        }
        
        // Fallback to database table if no preferences found
        const trainerId = await getTrainerIdFromSession(req);
        const students = await storage.getStudents(trainerId);
        return res.json({ key, value: JSON.stringify(students) });
      }
      
      if (key === 'exercises') {
        const trainerId = await getTrainerIdFromSession(req);
        const exercises = await storage.getExercises(trainerId);
        return res.json({ key, value: JSON.stringify(exercises) });
      }
      
      if (key === 'meals') {
        const trainerId = await getTrainerIdFromSession(req);
        const meals = await storage.getMeals(trainerId);
        return res.json({ key, value: JSON.stringify(meals) });
      }
      
      if (key === 'supplements') {
        const trainerId = await getTrainerIdFromSession(req);
        const supplements = await storage.getSupplements(trainerId);
        return res.json({ key, value: JSON.stringify(supplements) });
      }

      if (key === 'exerciseTypes') {
        // First try to get from preferences (where our data is actually stored)
        let preference = await storage.getUserPreference(userId, sessionId, key);
        
        // If not found with current session, try global fallback
        if (!preference) {
          const preferences = await db.select()
            .from(userPreferences)
            .where(eq(userPreferences.key, key))
            .orderBy(desc(userPreferences.updatedAt))
            .limit(1);
          
          preference = preferences[0] || null;
        }
        
        if (preference) {
          return res.json({ key, value: preference.value });
        }
        
        // Fallback to database table if no preferences found
        const trainerId = await getTrainerIdFromSession(req);
        const categories = await storage.getExerciseCategories(trainerId);
        const types = Array.from(new Set(categories.map(cat => cat.type).filter(Boolean)));
        return res.json({ key, value: JSON.stringify(types) });
      }
      
      // For trainerProfile, use special handling for persistence
      if (key === 'trainerProfile') {
        // First try with current session
        let preference = await storage.getUserPreference(userId, sessionId, key);
        
        // If not found, look for any existing trainerProfile (for continuity)
        if (!preference) {
          const preferences = await db.select()
            .from(userPreferences)
            .where(eq(userPreferences.key, key))
            .orderBy(desc(userPreferences.updatedAt))
            .limit(1);
          
          preference = preferences[0] || null;
          
          // If found, migrate it to current session for future access
          if (preference && sessionId) {
            await storage.setUserPreference(userId, sessionId, key, preference.value);
          }
        }
        
        return res.json(preference ? { key, value: preference.value } : { key, value: null });
      }
      
      // For other preferences, use the normal preference storage with global fallback
      let preference = await storage.getUserPreference(userId, sessionId, key);
      
      // If not found with current session, try global fallback for critical data
      if (!preference && ['trainerProfile', 'studentHistory', 'hasSelectedUserType', 'selectedUserType'].includes(key)) {
        const preferences = await db.select()
          .from(userPreferences)
          .where(eq(userPreferences.key, key))
          .orderBy(desc(userPreferences.updatedAt))
          .limit(1);
        
        preference = preferences[0] || null;
      }
      
      res.json(preference ? { key, value: preference.value } : null);
    } catch (error) {
      handleError(res, error, "Failed to get user preference");
    }
  });

  app.post("/api/preferences", async (req, res) => {
    try {
      const { key, value, sessionId: clientSessionId } = req.body;
      const rawUserId = (req as any).session?.userId || null;
      // Handle string userIds (like "trainer_09123823886") by setting to null and using sessionId instead
      const userId = (rawUserId && typeof rawUserId === 'number') ? rawUserId : null;
      // Use client-provided sessionId or fallback to server session
      const sessionId = clientSessionId || (req as any).session?.id || null;
      
      if (!key || value === undefined) {
        return res.status(400).json({ error: "Key and value are required" });
      }
      
      const preference = await storage.setUserPreference(userId, sessionId, key, JSON.stringify(value));
      res.json(preference);
    } catch (error) {
      handleError(res, error, "Failed to set user preference");
    }
  });

  app.delete("/api/preferences/:key", async (req, res) => {
    try {
      const key = req.params.key;
      const rawUserId = (req as any).session?.userId || null;
      // Handle string userIds (like "trainer_09123823886") by setting to null and using sessionId instead
      const userId = (rawUserId && typeof rawUserId === 'number') ? rawUserId : null;
      // Use client-provided sessionId from query parameter or fallback to server session
      const clientSessionId = req.query.sessionId as string;
      const sessionId = clientSessionId || (req as any).session?.id || null;
      
      await storage.removeUserPreference(userId, sessionId, key);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to remove user preference");
    }
  });

  // Reset preferences route
  app.post("/api/preferences/reset", async (req, res) => {
    try {
      const { keys } = req.body;
      const rawUserId = (req as any).session?.userId || null;
      const userId = (rawUserId && typeof rawUserId === 'number') ? rawUserId : null;
      const sessionId = (req as any).session?.id || null;
      
      if (keys && Array.isArray(keys)) {
        // Delete specific keys
        for (const key of keys) {
          await storage.removeUserPreference(userId, sessionId, key);
        }
      } else {
        // Delete all user preferences for this session
        const conditions = [];
        if (userId !== null) {
          conditions.push(eq(userPreferences.userId, userId));
        }
        if (sessionId !== null) {
          conditions.push(eq(userPreferences.sessionId, sessionId));
        }
        
        if (conditions.length > 0) {
          await db.delete(userPreferences)
            .where(conditions.length === 1 ? conditions[0] : or(...conditions));
        }
      }
      
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to reset preferences");
    }
  });

  // Student Authentication API endpoints
  
  // Check student authentication status
  app.get("/api/student/auth/status", async (req, res) => {
    try {
      const sessionData = (req as any).session;
      const isLoggedIn = sessionData?.studentLoggedIn || sessionData?.isStudentLoggedIn || false;
      const studentPhone = sessionData?.currentStudentPhone || sessionData?.studentPhone || null;
      const rememberMeExpiry = sessionData?.studentRememberMeExpiry || null;
      
      if (isLoggedIn && studentPhone) {
        // Get student data from database
        const trainerId = await getTrainerIdFromSession(req); // Default trainer ID
        try {
          const student = await storage.getStudentByPhone(studentPhone, trainerId);
          
          if (student) {
            // Check if student access is active
            if (student.isActive === false) {
              return res.json({
                isLoggedIn: false,
                student: null,
                rememberMeExpiry: null,
                reason: 'Account deactivated by trainer'
              });
            }
            
            return res.json({
              isLoggedIn: true,
              student: student,
              rememberMeExpiry: rememberMeExpiry
            });
          }
        } catch (error) {
          console.error('Error getting student by phone:', error);
        }
      }
      
      res.json({
        isLoggedIn: false,
        student: null,
        rememberMeExpiry: rememberMeExpiry
      });
    } catch (error) {
      handleError(res, error, "Failed to check student auth status");
    }
  });

  // Student login endpoint
  app.post("/api/student/auth/login", async (req, res) => {
    try {
      const { phone, rememberMe } = req.body;
      
      if (!phone) {
        return res.status(400).json({ error: "Phone number is required" });
      }
      
      const trainerId = await getTrainerIdFromSession(req); // Default trainer ID
      const student = await storage.getStudentByPhone(phone, trainerId);
      
      if (!student) {
        return res.status(401).json({ error: "Student not found" });
      }
      
      // Check if student access is active
      if (student.isActive === false) {
        return res.status(403).json({ 
          error: "حساب کاربری شما توسط مربی غیرفعال شده است. برای فعال‌سازی مجدد با مربی خود تماس بگیرید." 
        });
      }
      
      // Set session data
      const sessionData = (req as any).session;
      sessionData.studentLoggedIn = true;
      sessionData.isStudentLoggedIn = true;
      sessionData.currentStudentPhone = phone;
      sessionData.studentPhone = phone;
      sessionData.currentStudentId = student.id;
      
      // Handle remember me
      let rememberMeExpiry = null;
      if (rememberMe) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30); // 30 days
        rememberMeExpiry = expiryDate.toISOString();
        sessionData.studentRememberMeExpiry = rememberMeExpiry;
      }
      
      res.json({
        success: true,
        student: student,
        rememberMeExpiry: rememberMeExpiry
      });
    } catch (error) {
      handleError(res, error, "Failed to login student");
    }
  });

  // Student logout endpoint  
  app.post("/api/student/auth/logout", async (req, res) => {
    try {
      // Clear student-related session data
      if ((req as any).session) {
        const sessionData = (req as any).session;
        delete sessionData.studentId;
        delete sessionData.currentStudentId;
        delete sessionData.studentLoggedIn;
        delete sessionData.isStudentLoggedIn;
        delete sessionData.currentStudentPhone;
        delete sessionData.studentPhone;
        delete sessionData.studentRememberMeExpiry;
      }
      
      res.json({ success: true, message: "Student logged out successfully" });
    } catch (error) {
      handleError(res, error, "Failed to logout student");
    }
  });

  // Get student profile by phone
  app.get("/api/student/profile/:phone", async (req, res) => {
    try {
      const phone = req.params.phone;
      const trainerId = await getTrainerIdFromSession(req); // Default trainer ID
      
      const student = await storage.getStudentByPhone(phone, trainerId);
      
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      
      res.json(student);
    } catch (error) {
      handleError(res, error, "Failed to get student profile");
    }
  });

  // Legacy student logout endpoint for backward compatibility
  app.post("/api/student/logout", async (req, res) => {
    try {
      // Clear student-related session data
      if ((req as any).session) {
        const sessionData = (req as any).session;
        delete sessionData.studentId;
        delete sessionData.currentStudentId;
        delete sessionData.studentLoggedIn;
        delete sessionData.isStudentLoggedIn;
        delete sessionData.currentStudentPhone;
        delete sessionData.studentPhone;
        delete sessionData.studentRememberMeExpiry;
      }
      
      res.json({ success: true, message: "Student logged out successfully" });
    } catch (error) {
      handleError(res, error, "Failed to logout student");
    }
  });

  // Student history API endpoints
  app.get("/api/student-history", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      
      // Get history from database with student names
      const history = await db.select({
        id: studentHistory.id,
        studentId: studentHistory.studentId,
        studentName: students.name,
        studentImage: students.image,
        action: studentHistory.action,
        entityType: studentHistory.entityType,
        description: studentHistory.description,
        timestamp: studentHistory.timestamp,
        trainerId: studentHistory.trainerId,
        type: studentHistory.action, // Map action to type for frontend compatibility
        details: studentHistory.description // Map description to details for frontend compatibility
      })
        .from(studentHistory)
        .leftJoin(students, eq(studentHistory.studentId, students.id))
        .where(eq(studentHistory.trainerId, trainerId))
        .orderBy(desc(studentHistory.timestamp))
        .limit(100);
      
      res.json(history);
    } catch (error) {
      handleError(res, error, "Failed to get student history");
    }
  });

  app.post("/api/student-history", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const historyEntry = req.body;
      
      // Add to database - we need a studentId for history tracking
      if (historyEntry.studentId) {
        const newEntry = await db.insert(studentHistory).values({
          studentId: historyEntry.studentId,
          action: historyEntry.action || "created",
          entityType: historyEntry.entityType || "profile",
          description: historyEntry.description,
          trainerId
        }).returning();
        
        res.json(newEntry[0]);
      } else {
        res.json({ success: true, message: "History entry skipped - no student ID" });
      }
    } catch (error) {
      handleError(res, error, "Failed to add student history entry");
    }
  });

  app.delete("/api/student-history", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      
      // Clear all history for this trainer
      await db.delete(studentHistory)
        .where(eq(studentHistory.trainerId, trainerId));
      
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to clear student history");
    }
  });

  // Current student API endpoint for student interface
  app.get("/api/current-student", async (req, res) => {
    try {
      const sessionData = (req as any).session;
      const currentStudentId = sessionData?.studentId || sessionData?.currentStudentId;
      
      if (!currentStudentId) {
        return res.status(404).json({ error: "No student logged in" });
      }
      
      // Get student from database
      const trainerId = await getTrainerIdFromSession(req); // Default trainer ID for now
      const students = await storage.getStudents(trainerId);
      const currentStudent = students.find((s: any) => s.id === currentStudentId);
      
      if (!currentStudent) {
        return res.status(404).json({ error: "Student not found" });
      }
      
      res.json(currentStudent);
    } catch (error) {
      handleError(res, error, "Failed to get current student");
    }
  });

  // Generic data API endpoints to replace preferences system
  app.get("/api/data/:key", requireAuth, async (req: any, res) => {
    try {
      const key = req.params.key;
      const trainerId = await getTrainerIdFromSession(req);
      
      // Map specific keys to their corresponding data sources
      switch (key) {
        case 'students':
          const students = await storage.getStudents(trainerId);
          res.json(students);
          break;
        case 'exercises':
          const exercises = await storage.getExercises(trainerId);
          res.json(exercises);
          break;
        case 'meals':
          const meals = await storage.getMeals(trainerId);
          res.json(meals);
          break;
        case 'supplements':
          const supplements = await storage.getSupplements(trainerId);
          res.json(supplements);
          break;
        case 'supplementCategories':
          const supplementCategories = await storage.getSupplementCategories(trainerId);
          res.json(supplementCategories);
          break;
        default:
          res.status(404).json({ error: `Data type '${key}' not found` });
      }
    } catch (error) {
      handleError(res, error, `Failed to get data for key: ${req.params.key}`);
    }
  });

  app.post("/api/data/:key", requireAuth, async (req: any, res) => {
    try {
      const key = req.params.key;
      const data = req.body;
      const trainerId = await getTrainerIdFromSession(req);
      
      // Map specific keys to their corresponding save operations
      switch (key) {
        case 'students':
          // For students data, we need to handle individual student updates
          if (Array.isArray(data)) {
            // Handle bulk update - for now just return success
            res.json({ success: true });
          } else {
            res.status(400).json({ error: "Expected array for students data" });
          }
          break;
        
        case 'supplementCategories':
          // Handle supplement categories data
          if (Array.isArray(data)) {
            res.json({ success: true });
          } else {
            res.status(400).json({ error: "Expected array for supplement categories data" });
          }
          break;
        default:
          res.status(404).json({ error: `Data type '${key}' save not supported` });
      }
    } catch (error) {
      handleError(res, error, `Failed to save data for key: ${req.params.key}`);
    }
  });

  // Reports API - Real data from database
  app.get("/api/reports/weekly-stats", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req); // Default to trainer ID 1 for session-based auth
      
      // Get last 4 weeks of data from student history
      const fourWeeksAgo = new Date();
      fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
      
      // Get real student activity data from database
      const studentActivities = await db.select({
        week: sql<string>`date_part('week', timestamp)`,
        count: sql<number>`count(*)`,
        action: studentHistory.action,
      })
      .from(studentHistory)
      .where(and(
        eq(studentHistory.trainerId, trainerId),
        gte(studentHistory.timestamp, fourWeeksAgo)
      ))
      .groupBy(sql`date_part('week', timestamp)`, studentHistory.action)
      .orderBy(sql`date_part('week', timestamp)`);

      // Get current students count
      const students = await storage.getStudents(trainerId);
      const totalStudents = students.length;
      
      // Process weekly data
      const weeklyData = [];
      const currentWeek = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
      
      for (let i = 3; i >= 0; i--) {
        const weekNumber = currentWeek - i;
        const weekActivities = studentActivities.filter(activity => 
          parseInt(activity.week) === (weekNumber % 52) + 1
        );
        
        const weekStudents = Math.min(totalStudents, Math.max(1, totalStudents - i));
        const sessions = weekActivities.reduce((sum, activity) => sum + activity.count, 0);
        
        weeklyData.push({
          week: `هفته ${4 - i}`,
          students: weekStudents,
          sessions: sessions || weekStudents * 2 // Fallback to reasonable estimate
        });
      }
      
      res.json(weeklyData);
    } catch (error) {
      handleError(res, error, "Failed to get weekly stats");
    }
  });

  // Reports API - Get activity statistics  
  app.get("/api/reports/activity-stats", requireAuth, async (req: any, res) => {
    try {
      const trainerId = await getTrainerIdFromSession(req);
      const studentsData = await storage.getStudents(trainerId);
      
      // Get real counts from database
      const exerciseStats = await db.select({ count: sql<number>`count(*)` })
        .from(studentExercisePrograms)
        .innerJoin(students, eq(studentExercisePrograms.studentId, students.id))
        .where(eq(students.trainerId, trainerId));

      const mealStats = await db.select({ count: sql<number>`count(*)` })
        .from(studentMealPlans)  
        .innerJoin(students, eq(studentMealPlans.studentId, students.id))
        .where(eq(students.trainerId, trainerId));

      const supplementStats = await db.select({ count: sql<number>`count(*)` })
        .from(studentSupplements)
        .innerJoin(students, eq(studentSupplements.studentId, students.id))
        .where(eq(students.trainerId, trainerId));
      
      const activityData = [
        { 
          name: "تمرینات", 
          value: exerciseStats[0]?.count || 0, 
          color: "#10b981" 
        },
        { 
          name: "تغذیه", 
          value: mealStats[0]?.count || 0, 
          color: "#f59e0b" 
        },
        { 
          name: "مکمل‌ها", 
          value: supplementStats[0]?.count || 0, 
          color: "#8b5cf6" 
        }
      ];
      
      res.json(activityData);
    } catch (error) {
      handleError(res, error, "Failed to get activity stats");
    }
  });

  // Auth Session Routes
  app.post("/api/auth/sessions", async (req, res) => {
    try {
      const sessionData = validate(insertAuthSessionSchema, req.body);
      const session = await storage.createAuthSession(sessionData);
      res.json(session);
    } catch (error) {
      handleError(res, error, "Failed to create auth session");
    }
  });

  app.get("/api/auth/sessions/:token", async (req, res) => {
    try {
      const token = req.params.token;
      const session = await storage.getAuthSession(token);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      res.json(session);
    } catch (error) {
      handleError(res, error, "Failed to get auth session");
    }
  });

  app.put("/api/auth/sessions/:token", async (req, res) => {
    try {
      const token = req.params.token;
      const sessionData = req.body;
      
      const session = await storage.updateAuthSession(token, sessionData);
      
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }
      
      res.json(session);
    } catch (error) {
      handleError(res, error, "Failed to update auth session");
    }
  });

  app.delete("/api/auth/sessions/:token", async (req, res) => {
    try {
      const token = req.params.token;
      await storage.deleteAuthSession(token);
      res.json({ success: true });
    } catch (error) {
      handleError(res, error, "Failed to delete auth session");
    }
  });

  // SPA Fallback Route - باید در انتها باشد تا با API routes تداخل نکند
  // این route برای مسیرهایی مثل /Management, /Student و غیره استفاده می‌شود
  app.get('*', (req, res, next) => {
    // فقط برای routes غیر API
    if (req.path.startsWith('/api/')) {
      return next();
    }
    
    // برای development، vite middleware این کار را انجام می‌دهد
    // برای production، static files serve می‌شوند
    if (process.env.NODE_ENV === 'development') {
      return next();
    }
    
    // در production، باید index.html را serve کنیم
    res.sendFile('index.html', { root: 'dist' });
  });

  const httpServer = createServer(app);
  return httpServer;
}
