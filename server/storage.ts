import { 
  users, 
  students,
  trainerProfiles,
  exercises,
  exerciseCategories,
  exerciseTypes,
  meals,
  mealCategories,
  supplements,
  supplementCategories,
  studentExercisePrograms,
  studentMealPlans,
  studentSupplements,
  studentHistory,
  supportTickets,
  ticketResponses,
  supportMessages,
  type User, 
  type InsertUser,
  type Student,
  type InsertStudent,
  type TrainerProfile,
  type InsertTrainerProfile,
  type Exercise,
  type InsertExercise,
  type ExerciseCategory,
  type InsertExerciseCategory,
  type ExerciseType,
  type InsertExerciseType,
  type Meal,
  type InsertMeal,
  type MealCategory,
  type InsertMealCategory,
  type Supplement,
  type InsertSupplement,
  type SupplementCategory,
  type InsertSupplementCategory,
  type StudentExerciseProgram,
  type InsertStudentExerciseProgram,
  type StudentMealPlan,
  type InsertStudentMealPlan,
  type StudentSupplement,
  type InsertStudentSupplement,
  type StudentHistory,
  type InsertStudentHistory,
  type SupportTicket,
  type InsertSupportTicket,
  type TicketResponse,
  type InsertTicketResponse,
  type SupportMessage,
  type InsertSupportMessage,
  userPreferences,
  authSessions,
  type UserPreference,
  type InsertUserPreference,
  type AuthSession,
  type InsertAuthSession
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, inArray, sql } from "drizzle-orm";

export interface IStorage {
  // User Management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Trainer Profile Management
  getTrainerProfile(userId: number): Promise<TrainerProfile | undefined>;
  createTrainerProfile(profile: InsertTrainerProfile): Promise<TrainerProfile>;
  updateTrainerProfile(userId: number, profile: Partial<InsertTrainerProfile>): Promise<TrainerProfile>;
  ensureDefaultTrainer(): Promise<void>;
  getDefaultTrainerId(): Promise<number>;

  // Student Management
  getStudents(trainerId: number): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student>;
  deleteStudent(id: number): Promise<void>;

  // Exercise Types Management  
  getExerciseTypes(trainerId: number): Promise<ExerciseType[]>;
  createExerciseType(type: InsertExerciseType): Promise<ExerciseType>;
  updateExerciseType(id: number, type: Partial<InsertExerciseType>): Promise<ExerciseType>;
  deleteExerciseType(id: number): Promise<void>;
  
  // Exercise Category Management
  getExerciseCategories(trainerId: number): Promise<ExerciseCategory[]>;
  getCategoriesByType(trainerId: number, typeId: number): Promise<ExerciseCategory[]>;
  createExerciseCategory(category: InsertExerciseCategory): Promise<ExerciseCategory>;
  updateExerciseCategory(id: number, category: Partial<InsertExerciseCategory>): Promise<ExerciseCategory>;
  deleteExerciseCategory(id: number): Promise<void>;

  // Exercise Management
  getExercises(trainerId: number): Promise<Exercise[]>;
  getExercise(id: number): Promise<Exercise | undefined>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExercise(id: number, exercise: Partial<InsertExercise>): Promise<Exercise>;
  deleteExercise(id: number): Promise<void>;
  deleteExercises(ids: number[]): Promise<void>;

  // Student Exercise Program Management
  getStudentExercisePrograms(studentId: number): Promise<StudentExerciseProgram[]>;
  createStudentExerciseProgram(program: InsertStudentExerciseProgram): Promise<StudentExerciseProgram>;
  updateStudentExerciseProgram(id: number, program: Partial<InsertStudentExerciseProgram>): Promise<StudentExerciseProgram>;
  deleteStudentExerciseProgram(id: number): Promise<void>;
  deleteStudentExerciseProgramsByStudent(studentId: number): Promise<void>;
  deleteStudentExerciseProgramsByStudentAndDay(studentId: number, day: number): Promise<void>;

  // Meal Category Management
  getMealCategories(trainerId: number): Promise<MealCategory[]>;
  createMealCategory(category: InsertMealCategory): Promise<MealCategory>;
  updateMealCategory(id: number, category: Partial<InsertMealCategory>): Promise<MealCategory>;
  deleteMealCategory(id: number): Promise<void>;

  // Meal Management
  getAllMeals(): Promise<Meal[]>;
  getMeals(trainerId: number): Promise<Meal[]>;
  getMeal(id: number): Promise<Meal | undefined>;
  createMeal(meal: InsertMeal): Promise<Meal>;
  updateMeal(id: number, meal: Partial<InsertMeal>): Promise<Meal>;
  deleteMeal(id: number): Promise<void>;

  // Student Meal Plan Management
  getStudentMealPlans(studentId: number): Promise<StudentMealPlan[]>;
  createStudentMealPlan(plan: InsertStudentMealPlan): Promise<StudentMealPlan>;
  updateStudentMealPlan(id: number, plan: Partial<InsertStudentMealPlan>): Promise<StudentMealPlan>;
  deleteStudentMealPlan(id: number): Promise<void>;
  deleteStudentMealPlansByStudent(studentId: number): Promise<void>;

  // Supplement Category Management
  getSupplementCategories(trainerId: number): Promise<SupplementCategory[]>;
  createSupplementCategory(category: InsertSupplementCategory): Promise<SupplementCategory>;
  updateSupplementCategory(id: number, category: Partial<InsertSupplementCategory>): Promise<SupplementCategory>;
  deleteSupplementCategory(id: number): Promise<void>;

  // Supplement Management
  getSupplements(trainerId: number): Promise<Supplement[]>;
  getSupplement(id: number): Promise<Supplement | undefined>;
  createSupplement(supplement: InsertSupplement): Promise<Supplement>;
  updateSupplement(id: number, supplement: Partial<InsertSupplement>): Promise<Supplement>;
  deleteSupplement(id: number): Promise<void>;

  // Student Supplement Management
  getStudentSupplements(studentId: number): Promise<StudentSupplement[]>;
  createStudentSupplement(supplement: InsertStudentSupplement): Promise<StudentSupplement>;
  updateStudentSupplement(id: number, supplement: Partial<InsertStudentSupplement>): Promise<StudentSupplement>;
  deleteStudentSupplement(id: number): Promise<void>;
  deleteStudentSupplementsByStudent(studentId: number): Promise<void>;

  // Student History Management
  getStudentHistory(studentId: number): Promise<StudentHistory[]>;
  createStudentHistory(history: InsertStudentHistory): Promise<StudentHistory>;

  // Support Ticket Management
  getSupportTickets(trainerId?: number, studentId?: number): Promise<SupportTicket[]>;
  getSupportTicket(id: number): Promise<SupportTicket | undefined>;
  createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket>;
  updateSupportTicket(id: number, ticket: Partial<InsertSupportTicket>): Promise<SupportTicket>;

  // Ticket Response Management
  getTicketResponses(ticketId: number): Promise<TicketResponse[]>;
  createTicketResponse(response: InsertTicketResponse): Promise<TicketResponse>;

  // Support Message Management
  getSupportMessages(studentId?: number, trainerId?: number): Promise<SupportMessage[]>;
  createSupportMessage(message: InsertSupportMessage): Promise<SupportMessage>;
  markSupportMessagesAsRead(studentId: number, trainerId: number): Promise<void>;

  // Student Program Management
  getAllStudentPrograms(): Promise<any[]>;
  updateStudentProgram(studentId: number, programData: any): Promise<any>;

  // User Preferences Management (localStorage replacement)
  getUserPreference(userId: number | null, sessionId: string | null, key: string): Promise<UserPreference | undefined>;
  setUserPreference(userId: number | null, sessionId: string | null, key: string, value: string): Promise<UserPreference>;
  removeUserPreference(userId: number | null, sessionId: string | null, key: string): Promise<void>;
  getUserPreferences(userId: number | null, sessionId: string | null): Promise<UserPreference[]>;

  // Auth Session Management
  getAuthSession(sessionToken: string): Promise<AuthSession | undefined>;
  createAuthSession(session: InsertAuthSession): Promise<AuthSession>;
  updateAuthSession(sessionToken: string, sessionData: Partial<InsertAuthSession>): Promise<AuthSession | undefined>;
  deleteAuthSession(sessionToken: string): Promise<void>;
  getUserAuthSessions(userId: number): Promise<AuthSession[]>;
}

export class DatabaseStorage implements IStorage {
  // User Management
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser || undefined;
  }

  // Trainer Profile Management
  async getTrainerProfile(userId: number): Promise<TrainerProfile | undefined> {
    const [profile] = await db.select().from(trainerProfiles).where(eq(trainerProfiles.userId, userId));
    return profile || undefined;
  }

  async createTrainerProfile(profile: InsertTrainerProfile): Promise<TrainerProfile> {
    const [newProfile] = await db.insert(trainerProfiles).values(profile).returning();
    return newProfile;
  }

  async updateTrainerProfile(userId: number, profile: Partial<InsertTrainerProfile>): Promise<TrainerProfile> {
    // Remove any undefined/null values and ensure proper data types
    const cleanProfile = Object.fromEntries(
      Object.entries(profile).filter(([_, value]) => value !== undefined && value !== null)
    );
    
    console.log("Storage: Updating trainer profile for userId:", userId);
    console.log("Storage: Clean profile data:", cleanProfile);
    
    const [updatedProfile] = await db
      .update(trainerProfiles)
      .set({ ...cleanProfile, updatedAt: new Date() })
      .where(eq(trainerProfiles.userId, userId))
      .returning();
      
    console.log("Storage: Updated profile result:", updatedProfile);
    
    if (!updatedProfile) {
      throw new Error(`No trainer profile found for userId: ${userId}`);
    }
    
    return updatedProfile;
  }

  async ensureDefaultTrainer(): Promise<void> {
    // Check if default trainer user exists by phone number
    const existingUser = await db.select().from(users).where(eq(users.phoneNumber, '09123823886')).limit(1);
    if (existingUser.length === 0) {
      // Create default trainer user
      const [newUser] = await db.insert(users).values({
        username: 'default_trainer',
        phoneNumber: '09123823886',
      }).returning();
      
      // Create default trainer profile
      await db.insert(trainerProfiles).values({
        userId: newUser.id,
        name: 'مربی پیش‌فرض',
        gymName: 'باشگاه پیش‌فرض',
        phone: '09123823886',
        bio: 'مربی پیش‌فرض سیستم',
        specialty: 'عمومی',
      });
    }
  }

  async getDefaultTrainerId(): Promise<number> {
    const defaultUser = await db.select().from(users).where(eq(users.phoneNumber, '09123823886')).limit(1);
    if (defaultUser.length === 0) {
      throw new Error('Default trainer not found. Please ensure default trainer is created.');
    }
    return defaultUser[0].id;
  }

  async getTrainerIdByPhoneNumber(phoneNumber: string): Promise<number> {
    const user = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber)).limit(1);
    if (user.length === 0) {
      // Create new trainer user if not exists
      const [newUser] = await db.insert(users).values({
        username: `trainer_${phoneNumber}`,
        phoneNumber: phoneNumber,
      }).returning();
      return newUser.id;
    }
    return user[0].id;
  }

  async ensureTrainerExists(phoneNumber: string): Promise<number> {
    const existingUser = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber)).limit(1);
    if (existingUser.length === 0) {
      // Create trainer user
      const [newUser] = await db.insert(users).values({
        username: `trainer_${phoneNumber}`,
        phoneNumber: phoneNumber,
      }).returning();
      
      // Create trainer profile if not exists
      const existingProfile = await db.select().from(trainerProfiles).where(eq(trainerProfiles.userId, newUser.id)).limit(1);
      if (existingProfile.length === 0) {
        await db.insert(trainerProfiles).values({
          userId: newUser.id,
          name: 'مربی جدید',
          gymName: 'باشگاه جدید',
          phone: phoneNumber,
          bio: 'مربی تازه عضو',
          specialty: 'عمومی',
        });
      }
      return newUser.id;
    }
    return existingUser[0].id;
  }

  // Student Management
  async getStudents(trainerId: number): Promise<Student[]> {
    return await db.select().from(students).where(eq(students.trainerId, trainerId)).orderBy(desc(students.id));
  }

  async getStudent(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }

  async getStudentByPhone(phone: string, trainerId: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(
      and(
        eq(students.phone, phone),
        eq(students.trainerId, trainerId)
      )
    );
    return student || undefined;
  }

  async createStudent(student: InsertStudent): Promise<Student> {
    // Check for duplicate phone number
    const existingStudent = await db.select().from(students)
      .where(and(eq(students.phone, student.phone), eq(students.trainerId, student.trainerId)))
      .limit(1);
    
    if (existingStudent.length > 0) {
      throw new Error(`شاگردی با شماره تلفن ${student.phone} قبلاً ثبت شده است`);
    }
    
    const [newStudent] = await db.insert(students).values(student).returning();
    return newStudent;
  }

  async updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student> {
    const [updatedStudent] = await db
      .update(students)
      .set(student)
      .where(eq(students.id, id))
      .returning();
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<void> {
    // First delete related records to avoid foreign key constraint violations
    await db.delete(studentHistory).where(eq(studentHistory.studentId, id));
    await db.delete(studentExercisePrograms).where(eq(studentExercisePrograms.studentId, id));
    await db.delete(studentMealPlans).where(eq(studentMealPlans.studentId, id));
    await db.delete(studentSupplements).where(eq(studentSupplements.studentId, id));
    await db.delete(supportTickets).where(eq(supportTickets.studentId, id));
    
    // Finally delete the student
    await db.delete(students).where(eq(students.id, id));
  }

  // Exercise Types Management (Main Categories)
  async getExerciseTypes(trainerId: number): Promise<ExerciseType[]> {
    try {
      const result = await db.execute(sql`
        SELECT id, trainer_id, name, color, created_at,
               '' as description
        FROM exercise_types 
        WHERE trainer_id = ${trainerId} 
        ORDER BY name
      `);
      return result.rows as ExerciseType[];
    } catch (error) {
      console.error('Error getting exercise types:', error);
      throw error;
    }
  }

  async createExerciseType(type: InsertExerciseType): Promise<ExerciseType> {
    try {
      // Remove description field since it doesn't exist in database
      const { description, ...typeData } = type as any;
      const result = await db.execute(sql`
        INSERT INTO exercise_types (trainer_id, name, color) 
        VALUES (${typeData.trainerId}, ${typeData.name}, ${typeData.color || null})
        RETURNING id, trainer_id, name, color, created_at, '' as description
      `);
      return result.rows[0] as ExerciseType;
    } catch (error) {
      console.error('Failed to create exercise type:', error);
      throw error;
    }
  }

  async updateExerciseType(id: number, type: Partial<InsertExerciseType>): Promise<ExerciseType> {
    try {
      // Remove description field since it doesn't exist in database
      const { description, ...typeData } = type as any;
      const result = await db.execute(sql`
        UPDATE exercise_types 
        SET name = COALESCE(${typeData.name || null}, name),
            color = COALESCE(${typeData.color || null}, color)
        WHERE id = ${id}
        RETURNING id, trainer_id, name, color, created_at, '' as description
      `);
      return result.rows[0] as ExerciseType;
    } catch (error) {
      console.error('Failed to update exercise type:', error);
      throw error;
    }
  }

  async deleteExerciseType(id: number): Promise<void> {
    await db.delete(exerciseTypes).where(eq(exerciseTypes.id, id));
  }

  // Exercise Category Management (Subcategories)
  async getExerciseCategories(trainerId: number): Promise<ExerciseCategory[]> {
    try {
      const result = await db.execute(sql`
        SELECT id, trainer_id, type_id as "typeId", name, type, color, created_at,
               '' as description
        FROM exercise_categories 
        WHERE trainer_id = ${trainerId} 
        ORDER BY name
      `);
      return result.rows as ExerciseCategory[];
    } catch (error) {
      console.error('Error getting exercise categories:', error);
      throw error;
    }
  }

  async getCategoriesByType(trainerId: number, typeId: number): Promise<ExerciseCategory[]> {
    try {
      const result = await db.execute(sql`
        SELECT id, trainer_id, type_id as "typeId", name, type, color, created_at,
               '' as description
        FROM exercise_categories 
        WHERE trainer_id = ${trainerId} AND type_id = ${typeId}
        ORDER BY name
      `);
      return result.rows as ExerciseCategory[];
    } catch (error) {
      console.error('Error getting categories by type:', error);
      throw error;
    }
  }

  async createExerciseCategory(category: InsertExerciseCategory): Promise<ExerciseCategory> {
    try {
      // Remove description field since it doesn't exist in database
      const { description, ...categoryData } = category as any;
      const result = await db.execute(sql`
        INSERT INTO exercise_categories (trainer_id, type_id, name, type, color) 
        VALUES (${categoryData.trainerId}, ${categoryData.typeId}, ${categoryData.name}, ${categoryData.type}, ${categoryData.color || null})
        RETURNING id, trainer_id, type_id as "typeId", name, type, color, created_at, '' as description
      `);
      return result.rows[0] as ExerciseCategory;
    } catch (error) {
      console.error('Failed to create exercise category:', error);
      throw error;
    }
  }

  async updateExerciseCategory(id: number, category: Partial<InsertExerciseCategory>): Promise<ExerciseCategory> {
    try {
      // Remove description field since it doesn't exist in database
      const { description, ...categoryData } = category as any;
      const result = await db.execute(sql`
        UPDATE exercise_categories 
        SET name = COALESCE(${categoryData.name || null}, name),
            type = COALESCE(${categoryData.type || null}, type),
            color = COALESCE(${categoryData.color || null}, color),
            type_id = COALESCE(${categoryData.typeId || null}, type_id)
        WHERE id = ${id}
        RETURNING id, trainer_id, type_id as "typeId", name, type, color, created_at, '' as description
      `);
      return result.rows[0] as ExerciseCategory;
    } catch (error) {
      console.error('Failed to update exercise category:', error);
      throw error;
    }
  }

  async deleteExerciseCategory(id: number): Promise<void> {
    await db.delete(exerciseCategories).where(eq(exerciseCategories.id, id));
  }

  // Exercise Management
  async getExercises(trainerId: number): Promise<Exercise[]> {
    try {
      const result = await db.execute(sql`
        SELECT id, trainer_id, category_id as "categoryId", name, difficulty, muscle_groups, equipment, 
               estimated_duration, calories_burned, is_active, created_at,
               '' as description, '' as instructions, '' as video_url, '' as image_url
        FROM exercises 
        WHERE trainer_id = ${trainerId} 
        ORDER BY name
      `);
      console.log(`Found ${result.rows.length} exercises for trainer_id = ${trainerId}`);
      return result.rows as Exercise[];
    } catch (error) {
      console.error('Error getting exercises:', error);
      throw error;
    }
  }

  async getExercise(id: number): Promise<Exercise | undefined> {
    try {
      const result = await db.execute(sql`
        SELECT id, trainer_id, category_id as "categoryId", name, difficulty, muscle_groups, equipment, 
               estimated_duration, calories_burned, is_active, created_at,
               '' as description, '' as instructions, '' as video_url, '' as image_url
        FROM exercises 
        WHERE id = ${id}
      `);
      return result.rows[0] as Exercise || undefined;
    } catch (error) {
      console.error('Error getting exercise:', error);
      throw error;
    }
  }

  async getExercisesByCategory(trainerId: number, categoryId: number): Promise<Exercise[]> {
    try {
      const result = await db.execute(sql`
        SELECT id, trainer_id, category_id as "categoryId", name, difficulty, muscle_groups, equipment, 
               estimated_duration, calories_burned, is_active, created_at,
               '' as description, '' as instructions, '' as video_url, '' as image_url
        FROM exercises 
        WHERE trainer_id = ${trainerId} AND category_id = ${categoryId}
        ORDER BY name
      `);
      console.log(`Found ${result.rows.length} exercises for trainer_id = ${trainerId}, category_id = ${categoryId}`);
      return result.rows as Exercise[];
    } catch (error) {
      console.error('Error getting exercises by category:', error);
      throw error;
    }
  }

  async createExercise(exercise: InsertExercise): Promise<Exercise> {
    const [newExercise] = await db.insert(exercises).values(exercise as any).returning();
    return newExercise;
  }

  async updateExercise(id: number, exerciseData: Partial<InsertExercise>): Promise<Exercise> {
    const [updatedExercise] = await db
      .update(exercises)
      .set(exerciseData as any)
      .where(eq(exercises.id, id))
      .returning();
    return updatedExercise;
  }

  async deleteExercise(id: number): Promise<void> {
    await db.delete(exercises).where(eq(exercises.id, id));
  }

  async deleteExercises(ids: number[]): Promise<void> {
    if (ids.length === 0) return;
    await db.delete(exercises).where(inArray(exercises.id, ids));
  }

  // Student Exercise Program Management
  async getStudentExercisePrograms(studentId: number): Promise<any[]> {
    try {
      const result = await db.execute(sql`
        SELECT 
          sep.id,
          sep.student_id as "studentId",
          sep.exercise_id as "exerciseId", 
          sep.day_of_week as "dayOfWeek",
          sep.sets,
          sep.reps,
          sep.rest_time as "restTime",
          sep.notes,
          e.name as "exerciseName",
          e.difficulty,
          e.muscle_groups as "muscleGroups",
          e.equipment,
          e.estimated_duration as "estimatedDuration",
          e.calories_burned as "caloriesBurned"
        FROM student_exercise_programs sep
        JOIN exercises e ON sep.exercise_id = e.id
        WHERE sep.student_id = ${studentId}
        ORDER BY sep.day_of_week, sep.id
      `);
      return result.rows;
    } catch (error) {
      console.error('Error getting student exercise programs:', error);
      throw error;
    }
  }

  async getAllStudentExercisePrograms(): Promise<StudentExerciseProgram[]> {
    return await db.select().from(studentExercisePrograms).orderBy(asc(studentExercisePrograms.studentId), asc(studentExercisePrograms.dayOfWeek));
  }

  async createStudentExerciseProgram(program: InsertStudentExerciseProgram): Promise<StudentExerciseProgram> {
    const [newProgram] = await db.insert(studentExercisePrograms).values(program).returning();
    return newProgram;
  }

  async updateStudentExerciseProgram(id: number, program: Partial<InsertStudentExerciseProgram>): Promise<StudentExerciseProgram> {
    const [updatedProgram] = await db
      .update(studentExercisePrograms)
      .set(program)
      .where(eq(studentExercisePrograms.id, id))
      .returning();
    return updatedProgram;
  }

  async deleteStudentExerciseProgram(id: number): Promise<void> {
    await db.delete(studentExercisePrograms).where(eq(studentExercisePrograms.id, id));
  }

  async deleteStudentExerciseProgramsByStudent(studentId: number): Promise<void> {
    await db.delete(studentExercisePrograms).where(eq(studentExercisePrograms.studentId, studentId));
  }

  async deleteStudentExerciseProgramsByStudentAndDay(studentId: number, dayOfWeek: number): Promise<void> {
    await db.delete(studentExercisePrograms).where(
      and(
        eq(studentExercisePrograms.studentId, studentId),
        eq(studentExercisePrograms.dayOfWeek, dayOfWeek)
      )
    );
  }

  // Meal Category Management
  async getMealCategories(trainerId: number): Promise<MealCategory[]> {
    return await db.select().from(mealCategories).where(eq(mealCategories.trainerId, trainerId)).orderBy(asc(mealCategories.name));
  }

  async createMealCategory(category: InsertMealCategory): Promise<MealCategory> {
    const [newCategory] = await db.insert(mealCategories).values(category).returning();
    return newCategory;
  }

  async updateMealCategory(id: number, category: Partial<InsertMealCategory>): Promise<MealCategory> {
    const [updatedCategory] = await db
      .update(mealCategories)
      .set(category)
      .where(eq(mealCategories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteMealCategory(id: number): Promise<void> {
    await db.delete(mealCategories).where(eq(mealCategories.id, id));
  }

  // Meal Management
  async getAllMeals(): Promise<any[]> {
    console.log("Storage: Getting all meals");
    try {
      // Get simple count first to verify table exists and has data
      const countResult = await db.execute(sql`SELECT COUNT(*) as total FROM meals`);
      console.log("Storage: Found", countResult.rows[0]?.total || 0, "total meals");
      
      // Use raw SQL to get all columns that actually exist
      const result = await db.execute(sql`SELECT * FROM meals`);
      console.log("Storage: Successfully retrieved", result.rows.length, "meals");
      return result.rows as any[];
    } catch (error) {
      console.error("Error in getAllMeals:", error);
      throw error;
    }
  }

  async getAllStudents(): Promise<any[]> {
    console.log("Storage: Getting all students");
    try {
      const result = await db.execute(sql`SELECT * FROM students`);
      console.log("Storage: Successfully retrieved", result.rows.length, "students");
      return result.rows as any[];
    } catch (error) {
      console.error("Error in getAllStudents:", error);
      throw error;
    }
  }

  async getAllExercises(): Promise<any[]> {
    console.log("Storage: Getting all exercises");
    try {
      const result = await db.execute(sql`SELECT * FROM exercises`);
      console.log("Storage: Successfully retrieved", result.rows.length, "exercises");
      return result.rows as any[];
    } catch (error) {
      console.error("Error in getAllExercises:", error);
      throw error;
    }
  }

  async getAllSupplements(): Promise<any[]> {
    console.log("Storage: Getting all supplements");
    try {
      const result = await db.execute(sql`SELECT * FROM supplements`);
      console.log("Storage: Successfully retrieved", result.rows.length, "supplements");
      return result.rows as any[];
    } catch (error) {
      console.error("Error in getAllSupplements:", error);
      throw error;
    }
  }

  async getMeals(trainerId: number): Promise<Meal[]> {
    console.log("Storage: Getting meals for trainer ID:", trainerId);
    try {
      const result = await db.execute(sql`
        SELECT id, trainer_id, name, meal_type, ingredients, preparation_time, 
               difficulty, is_vegetarian, is_vegan, allergens, created_at, day_of_week,
               '' as description, '' as instructions, 0 as calories, 0 as protein, 
               0 as carbohydrates, 0 as fat, 0 as fiber, '' as serving_size,
               null as category_id
        FROM meals 
        WHERE trainer_id = ${trainerId} 
        ORDER BY name
      `);
      console.log("Storage: Found", result.rows.length, "meals for trainer ID:", trainerId);
      return result.rows as Meal[];
    } catch (error) {
      console.error("Error getting meals:", error);
      throw error;
    }
  }

  async getMeal(id: number): Promise<Meal | undefined> {
    const [meal] = await db.select().from(meals).where(eq(meals.id, id));
    return meal || undefined;
  }

  async createMeal(meal: InsertMeal): Promise<Meal> {
    const [newMeal] = await db.insert(meals).values(meal as any).returning();
    return newMeal;
  }

  async updateMeal(id: number, mealData: Partial<InsertMeal>): Promise<Meal> {
    const [updatedMeal] = await db
      .update(meals)
      .set(mealData as any)
      .where(eq(meals.id, id))
      .returning();
    return updatedMeal;
  }

  async deleteMeal(id: number): Promise<void> {
    await db.delete(meals).where(eq(meals.id, id));
  }

  // Student Meal Plan Management
  async getStudentMealPlans(studentId: number): Promise<StudentMealPlan[]> {
    return await db.select().from(studentMealPlans).where(eq(studentMealPlans.studentId, studentId)).orderBy(asc(studentMealPlans.dayOfWeek));
  }

  async createStudentMealPlan(plan: InsertStudentMealPlan): Promise<StudentMealPlan> {
    const [newPlan] = await db.insert(studentMealPlans).values(plan).returning();
    return newPlan;
  }

  async updateStudentMealPlan(id: number, plan: Partial<InsertStudentMealPlan>): Promise<StudentMealPlan> {
    const [updatedPlan] = await db
      .update(studentMealPlans)
      .set(plan)
      .where(eq(studentMealPlans.id, id))
      .returning();
    return updatedPlan;
  }

  async deleteStudentMealPlan(id: number): Promise<void> {
    await db.delete(studentMealPlans).where(eq(studentMealPlans.id, id));
  }

  async deleteStudentMealPlansByStudent(studentId: number): Promise<void> {
    await db.delete(studentMealPlans).where(eq(studentMealPlans.studentId, studentId));
  }

  async deleteStudentMealPlansByStudentAndDay(studentId: number, dayOfWeek: number): Promise<void> {
    await db.delete(studentMealPlans).where(
      and(eq(studentMealPlans.studentId, studentId), eq(studentMealPlans.dayOfWeek, dayOfWeek))
    );
  }

  // Supplement Category Management
  async getSupplementCategories(trainerId: number): Promise<SupplementCategory[]> {
    return await db.select().from(supplementCategories).where(eq(supplementCategories.trainerId, trainerId)).orderBy(asc(supplementCategories.name));
  }

  async createSupplementCategory(category: InsertSupplementCategory): Promise<SupplementCategory> {
    const [newCategory] = await db.insert(supplementCategories).values(category).returning();
    return newCategory;
  }

  async updateSupplementCategory(id: number, category: Partial<InsertSupplementCategory>): Promise<SupplementCategory> {
    const [updatedCategory] = await db
      .update(supplementCategories)
      .set(category)
      .where(eq(supplementCategories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteSupplementCategory(id: number): Promise<void> {
    await db.delete(supplementCategories).where(eq(supplementCategories.id, id));
  }

  // Supplement Management (Optimized - only essential fields)
  async getSupplements(trainerId: number): Promise<Supplement[]> {
    return await db.select({
      id: supplements.id,
      trainerId: supplements.trainerId,
      categoryId: supplements.categoryId,
      name: supplements.name,
      type: supplements.type,
      dosage: supplements.dosage,
      frequency: supplements.frequency,
      createdAt: supplements.createdAt
    }).from(supplements).where(eq(supplements.trainerId, trainerId)).orderBy(asc(supplements.name));
  }

  async getSupplement(id: number): Promise<Supplement | undefined> {
    const [supplement] = await db.select({
      id: supplements.id,
      trainerId: supplements.trainerId,
      categoryId: supplements.categoryId,
      name: supplements.name,
      type: supplements.type,
      dosage: supplements.dosage,
      frequency: supplements.frequency,
      createdAt: supplements.createdAt
    }).from(supplements).where(eq(supplements.id, id));
    return supplement || undefined;
  }

  async createSupplement(supplement: InsertSupplement): Promise<Supplement> {
    const [newSupplement] = await db.insert(supplements).values(supplement as any).returning();
    return newSupplement;
  }

  async updateSupplement(id: number, supplementData: Partial<InsertSupplement>): Promise<Supplement> {
    const [updatedSupplement] = await db
      .update(supplements)
      .set(supplementData as any)
      .where(eq(supplements.id, id))
      .returning();
    return updatedSupplement;
  }

  async deleteSupplement(id: number): Promise<void> {
    await db.delete(supplements).where(eq(supplements.id, id));
  }

  // Student Supplement Management
  async getStudentSupplements(studentId: number): Promise<StudentSupplement[]> {
    return await db.select({
      id: studentSupplements.id,
      studentId: studentSupplements.studentId,
      supplementId: studentSupplements.supplementId,
      dosage: studentSupplements.dosage,
      frequency: studentSupplements.frequency,
      timesPerDay: studentSupplements.timesPerDay,
      instructions: studentSupplements.instructions,
      startDate: studentSupplements.startDate,
      endDate: studentSupplements.endDate,
      isActive: studentSupplements.isActive,
      notes: studentSupplements.notes,
      createdAt: studentSupplements.createdAt,
      // Include supplement data
      supplementName: supplements.name,
      supplementType: supplements.type,
      supplementCategoryId: supplements.categoryId,
    }).from(studentSupplements)
      .leftJoin(supplements, eq(studentSupplements.supplementId, supplements.id))
      .where(eq(studentSupplements.studentId, studentId))
      .orderBy(desc(studentSupplements.createdAt));
  }

  async createStudentSupplement(supplement: InsertStudentSupplement): Promise<StudentSupplement> {
    const [newSupplement] = await db.insert(studentSupplements).values(supplement).returning();
    return newSupplement;
  }

  async updateStudentSupplement(id: number, supplement: Partial<InsertStudentSupplement>): Promise<StudentSupplement> {
    const [updatedSupplement] = await db
      .update(studentSupplements)
      .set(supplement)
      .where(eq(studentSupplements.id, id))
      .returning();
    return updatedSupplement;
  }

  async deleteStudentSupplement(id: number): Promise<void> {
    await db.delete(studentSupplements).where(eq(studentSupplements.id, id));
  }

  async deleteStudentSupplementsByStudent(studentId: number): Promise<void> {
    await db.delete(studentSupplements).where(eq(studentSupplements.studentId, studentId));
  }

  // Student History Management
  async getStudentHistory(studentId: number): Promise<StudentHistory[]> {
    return await db.select().from(studentHistory).where(eq(studentHistory.studentId, studentId)).orderBy(desc(studentHistory.timestamp));
  }

  async createStudentHistory(history: InsertStudentHistory): Promise<StudentHistory> {
    const [newHistory] = await db.insert(studentHistory).values(history).returning();
    return newHistory;
  }

  async deleteStudentHistoryByStudent(studentId: number): Promise<void> {
    await db.delete(studentHistory).where(eq(studentHistory.studentId, studentId));
  }

  // Support Ticket Management
  async getSupportTickets(trainerId?: number, studentId?: number): Promise<SupportTicket[]> {
    if (trainerId && studentId) {
      return await db.select().from(supportTickets)
        .where(and(eq(supportTickets.trainerId, trainerId), eq(supportTickets.studentId, studentId)))
        .orderBy(desc(supportTickets.createdAt));
    } else if (trainerId) {
      return await db.select().from(supportTickets)
        .where(eq(supportTickets.trainerId, trainerId))
        .orderBy(desc(supportTickets.createdAt));
    } else if (studentId) {
      return await db.select().from(supportTickets)
        .where(eq(supportTickets.studentId, studentId))
        .orderBy(desc(supportTickets.createdAt));
    }
    return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
  }

  async getSupportTicket(id: number): Promise<SupportTicket | undefined> {
    const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, id));
    return ticket || undefined;
  }

  async createSupportTicket(ticket: InsertSupportTicket): Promise<SupportTicket> {
    const [newTicket] = await db.insert(supportTickets).values(ticket).returning();
    return newTicket;
  }

  async updateSupportTicket(id: number, ticket: Partial<InsertSupportTicket>): Promise<SupportTicket> {
    const [updatedTicket] = await db
      .update(supportTickets)
      .set({ ...ticket, updatedAt: new Date() })
      .where(eq(supportTickets.id, id))
      .returning();
    return updatedTicket;
  }

  async deleteSupportTicket(id: number): Promise<void> {
    // First delete all related responses
    await db.delete(ticketResponses).where(eq(ticketResponses.ticketId, id));
    // Then delete the ticket
    await db.delete(supportTickets).where(eq(supportTickets.id, id));
  }

  // Ticket Response Management
  async getTicketResponses(ticketId: number): Promise<TicketResponse[]> {
    return await db.select().from(ticketResponses).where(eq(ticketResponses.ticketId, ticketId)).orderBy(asc(ticketResponses.createdAt));
  }

  async createTicketResponse(response: InsertTicketResponse): Promise<TicketResponse> {
    const [newResponse] = await db.insert(ticketResponses).values(response).returning();
    return newResponse;
  }

  // Support Message Management
  async getSupportMessages(studentId?: number, trainerId?: number): Promise<SupportMessage[]> {
    if (studentId && trainerId) {
      return await db.select().from(supportMessages)
        .where(and(eq(supportMessages.studentId, studentId), eq(supportMessages.trainerId, trainerId)))
        .orderBy(asc(supportMessages.createdAt));
    } else if (studentId) {
      return await db.select().from(supportMessages)
        .where(eq(supportMessages.studentId, studentId))
        .orderBy(asc(supportMessages.createdAt));
    } else if (trainerId) {
      return await db.select().from(supportMessages)
        .where(eq(supportMessages.trainerId, trainerId))
        .orderBy(asc(supportMessages.createdAt));
    }
    
    return await db.select().from(supportMessages).orderBy(asc(supportMessages.createdAt));
  }

  async createSupportMessage(message: InsertSupportMessage): Promise<SupportMessage> {
    const [newMessage] = await db.insert(supportMessages).values(message).returning();
    return newMessage;
  }

  async markSupportMessagesAsRead(studentId: number, trainerId: number): Promise<void> {
    await db
      .update(supportMessages)
      .set({ isRead: true })
      .where(and(eq(supportMessages.studentId, studentId), eq(supportMessages.trainerId, trainerId)));
  }

  async deleteSupportMessage(id: number): Promise<void> {
    await db.delete(supportMessages).where(eq(supportMessages.id, id));
  }

  async deleteAllSupportMessages(): Promise<void> {
    await db.delete(supportMessages);
  }

  // Student Program Management
  async getAllStudentPrograms(): Promise<any[]> {
    const allStudents = await db.select().from(students);
    return allStudents.map(student => ({
      studentId: student.id,
      exercises: [],
      diet: [],
      supplements: [],
      vitamins: []
    }));
  }

  async updateStudentProgram(studentId: number, programData: any): Promise<any> {
    return {
      studentId,
      ...programData
    };
  }

  // User Preferences Management (localStorage replacement)
  async getUserPreference(userId: number | null, sessionId: string | null, key: string): Promise<UserPreference | undefined> {
    // Always use sessionId if userId is null or sessionId is provided
    const useSessionId = !userId || sessionId;
    const whereCondition = useSessionId
      ? and(eq(userPreferences.sessionId, sessionId!), eq(userPreferences.key, key))
      : and(eq(userPreferences.userId, userId), eq(userPreferences.key, key));
    
    const [preference] = await db
      .select()
      .from(userPreferences)
      .where(whereCondition);
    
    return preference || undefined;
  }

  async setUserPreference(userId: number | null, sessionId: string | null, key: string, value: string): Promise<UserPreference> {
    const useSessionId = !userId || sessionId;
    
    // Skip UPSERT due to nullable field conflict issues, use direct manual check
    const existingPreference = await this.getUserPreference(userId, sessionId, key);
    
    if (existingPreference) {
      // Update existing preference
      const [updatedPreference] = await db
        .update(userPreferences)
        .set({ 
          value, 
          updatedAt: new Date() 
        })
        .where(eq(userPreferences.id, existingPreference.id))
        .returning();
      return updatedPreference;
    } else {
      // Create new preference
      const [newPreference] = await db
        .insert(userPreferences)
        .values({ 
          userId: useSessionId ? null : userId, 
          sessionId, 
          key, 
          value,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
      return newPreference;
    }
  }

  async removeUserPreference(userId: number | null, sessionId: string | null, key: string): Promise<void> {
    // Always use sessionId if userId is null or sessionId is provided
    const useSessionId = !userId || sessionId;
    const whereCondition = useSessionId
      ? and(eq(userPreferences.sessionId, sessionId!), eq(userPreferences.key, key))
      : and(eq(userPreferences.userId, userId), eq(userPreferences.key, key));
    
    await db
      .delete(userPreferences)
      .where(whereCondition);
  }

  async getUserPreferences(userId: number | null, sessionId: string | null): Promise<UserPreference[]> {
    // Always use sessionId if userId is null or sessionId is provided
    const useSessionId = !userId || sessionId;
    const whereCondition = useSessionId
      ? eq(userPreferences.sessionId, sessionId!)
      : eq(userPreferences.userId, userId);
    
    return await db
      .select()
      .from(userPreferences)
      .where(whereCondition)
      .orderBy(asc(userPreferences.key));
  }

  // Auth Session Management
  async getAuthSession(sessionToken: string): Promise<AuthSession | undefined> {
    const [session] = await db
      .select()
      .from(authSessions)
      .where(eq(authSessions.sessionToken, sessionToken));
    
    return session || undefined;
  }

  async createAuthSession(session: InsertAuthSession): Promise<AuthSession> {
    const [newSession] = await db
      .insert(authSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async updateAuthSession(sessionToken: string, sessionData: Partial<InsertAuthSession>): Promise<AuthSession | undefined> {
    const [updatedSession] = await db
      .update(authSessions)
      .set({ 
        ...sessionData, 
        updatedAt: new Date() 
      })
      .where(eq(authSessions.sessionToken, sessionToken))
      .returning();
    
    return updatedSession || undefined;
  }

  async deleteAuthSession(sessionToken: string): Promise<void> {
    await db
      .delete(authSessions)
      .where(eq(authSessions.sessionToken, sessionToken));
  }

  async getUserAuthSessions(userId: number): Promise<AuthSession[]> {
    return await db
      .select()
      .from(authSessions)
      .where(eq(authSessions.userId, userId))
      .orderBy(desc(authSessions.updatedAt));
  }
}

export const storage = new DatabaseStorage();