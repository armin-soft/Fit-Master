import { pgTable, text, serial, integer, boolean, timestamp, json, unique } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// جدول کاربران (مربیان)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  phoneNumber: text("phone_number").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول پروفایل مربی
export const trainerProfiles = pgTable("trainer_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  gymName: text("gym_name"),
  phone: text("phone"),
  bio: text("bio"),
  image: text("image"),
  specialty: text("specialty"),
  experience: integer("experience"),
  gymDescription: text("gym_description"),
  gymAddress: text("gym_address"),
  instagram: text("instagram"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// جدول شاگردان
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  gender: text("gender").notNull(), // "male" | "female"
  age: integer("age").notNull(),
  height: integer("height").notNull(), // به سانتی‌متر
  weight: integer("weight").notNull(), // به کیلوگرم
  phone: text("phone").notNull(),
  image: text("image").default("/Assets/Image/Place-Holder.svg"),
  goalType: text("goal_type").default("تناسب اندام"), // "کاهش وزن" | "افزایش حجم عضلات" | "تناسب اندام"
  activityLevel: text("activity_level").default("متوسط"), // "کم" | "متوسط" | "زیاد"
  medicalConditions: text("medical_conditions").default("ندارد"),
  isActive: boolean("is_active").default(true), // دسترسی فعال/غیرفعال
});

// جدول انواع اصلی تمرینات (دسته‌بندی اصلی)
export const exerciseTypes = pgTable("exercise_types", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول دسته‌بندی تمرینات (زیرمجموعه‌ها)
export const exerciseCategories = pgTable("exercise_categories", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  typeId: integer("type_id").references(() => exerciseTypes.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // "strength" | "cardio" | "flexibility"
  description: text("description"),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول تمرینات
export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  categoryId: integer("category_id").references(() => exerciseCategories.id),
  name: text("name").notNull(),
  description: text("description"),
  instructions: text("instructions"),
  difficulty: text("difficulty").default("beginner"), // "beginner" | "intermediate" | "advanced"
  muscleGroups: json("muscle_groups").$type<string[]>().default([]),
  equipment: text("equipment").default("بدون تجهیزات"),
  videoUrl: text("video_url"),
  imageUrl: text("image_url"),
  estimatedDuration: integer("estimated_duration").default(30), // به دقیقه
  caloriesBurned: integer("calories_burned").default(100),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول برنامه تمرینی شاگردان
export const studentExercisePrograms = pgTable("student_exercise_programs", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  exerciseId: integer("exercise_id").references(() => exercises.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 1-6 (شنبه تا پنج‌شنبه)
  sets: integer("sets").notNull().default(3),
  reps: text("reps").notNull().default("8-12"),
  weight: integer("weight"), // به کیلوگرم
  restTime: integer("rest_time"), // به ثانیه
  notes: text("notes"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول دسته‌بندی وعده‌های غذایی
export const mealCategories = pgTable("meal_categories", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  mealType: text("meal_type").notNull(), // "صبحانه" | "میان وعده صبح" | "ناهار" | etc.
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول وعده‌های غذایی
export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  categoryId: integer("category_id").references(() => mealCategories.id),
  name: text("name").notNull(),
  mealType: text("meal_type").notNull(),
  dayOfWeek: text("day_of_week").notNull().default("شنبه"), // روز هفته برای وعده غذایی
  description: text("description"),
  ingredients: json("ingredients").$type<string[]>().default([]),
  instructions: text("instructions"),
  calories: integer("calories").default(0),
  protein: integer("protein").default(0), // به گرم
  carbohydrates: integer("carbohydrates").default(0), // به گرم
  fat: integer("fat").default(0), // به گرم
  fiber: integer("fiber").default(0), // به گرم
  servingSize: text("serving_size"),
  preparationTime: integer("preparation_time").default(15), // به دقیقه
  difficulty: text("difficulty").default("easy"), // "easy" | "medium" | "hard"
  isVegetarian: boolean("is_vegetarian").default(false),
  isVegan: boolean("is_vegan").default(false),
  allergens: json("allergens").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول برنامه غذایی شاگردان
export const studentMealPlans = pgTable("student_meal_plans", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  mealId: integer("meal_id").references(() => meals.id).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 1-7
  mealTime: text("meal_time").notNull(), // "breakfast", "lunch", "dinner", etc.
  portion: text("portion").notNull().default("1"),
  notes: text("notes"),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول دسته‌بندی مکمل‌ها
export const supplementCategories = pgTable("supplement_categories", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "supplement" | "vitamin"
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول مکمل‌ها و ویتامین‌ها (بهینه شده)
export const supplements = pgTable("supplements", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  categoryId: integer("category_id").references(() => supplementCategories.id),
  name: text("name").notNull(),
  type: text("type").default("supplement").notNull(), // "supplement" | "vitamin"
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول مکمل‌های شاگردان
export const studentSupplements = pgTable("student_supplements", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  supplementId: integer("supplement_id").references(() => supplements.id).notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  timesPerDay: integer("times_per_day").notNull().default(1),
  instructions: text("instructions"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").default(true).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول تاریخچه شاگردان
export const studentHistory = pgTable("student_history", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  action: text("action").notNull(), // "created", "updated", "deleted", etc.
  entityType: text("entity_type").notNull(), // "exercise", "meal", "supplement", "profile"
  entityId: integer("entity_id"),
  changes: json("changes"),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// جدول تیکت‌های پشتیبانی
export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  ticketNumber: text("ticket_number").notNull().unique(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "exercise", "diet", "supplement", etc.
  priority: text("priority").notNull().default("medium"), // "low", "medium", "high", "urgent"
  status: text("status").notNull().default("open"), // "open", "in_progress", "resolved", "closed"
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// جدول پاسخ‌های تیکت‌ها
export const ticketResponses = pgTable("ticket_responses", {
  id: serial("id").primaryKey(),
  ticketId: integer("ticket_id").references(() => supportTickets.id).notNull(),
  authorType: text("author_type").notNull(), // "trainer" | "student"
  authorId: integer("author_id").notNull(),
  message: text("message").notNull(),
  isInternal: boolean("is_internal").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول پیام‌های پشتیبانی
export const supportMessages = pgTable("support_messages", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  trainerId: integer("trainer_id").references(() => users.id).notNull(),
  sender: text("sender").notNull(), // "student" | "trainer"
  message: text("message").notNull(),
  messageType: text("message_type").notNull().default("text"), // "text" | "image" | "file"
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// جدول ترجیحات کاربر برای جایگزینی localStorage
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: text("session_id"), // برای کاربران ناشناس
  key: text("key").notNull(),
  value: text("value").notNull(), // رشته JSON
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  // Unique constraint to prevent duplicate preferences per user/session and key
  uniqueUserSessionKey: unique("unique_user_session_key").on(table.userId, table.sessionId, table.key),
}));

// جدول جلسات احراز هویت/ورود
export const authSessions = pgTable("auth_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionToken: text("session_token").notNull().unique(),
  userType: text("user_type").notNull(), // 'management' | 'student'
  isLoggedIn: boolean("is_logged_in").default(true),
  loginAttempts: integer("login_attempts").default(0),
  lockExpiry: timestamp("lock_expiry"),
  rememberMe: boolean("remember_me").default(false),

  rememberMeExpiry: timestamp("remember_me_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  trainerProfile: one(trainerProfiles),
  students: many(students),
  exercises: many(exercises),
  meals: many(meals),
  supplements: many(supplements),
  exerciseCategories: many(exerciseCategories),
  mealCategories: many(mealCategories),
  supplementCategories: many(supplementCategories),
  supportTickets: many(supportTickets),
  supportMessages: many(supportMessages),
  studentHistory: many(studentHistory),
  userPreferences: many(userPreferences),
  authSessions: many(authSessions),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

export const authSessionsRelations = relations(authSessions, ({ one }) => ({
  user: one(users, {
    fields: [authSessions.userId],
    references: [users.id],
  }),
}));

export const trainerProfilesRelations = relations(trainerProfiles, ({ one }) => ({
  user: one(users, {
    fields: [trainerProfiles.userId],
    references: [users.id],
  }),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  trainer: one(users, {
    fields: [students.trainerId],
    references: [users.id],
  }),
  exercisePrograms: many(studentExercisePrograms),
  mealPlans: many(studentMealPlans),
  supplements: many(studentSupplements),
  history: many(studentHistory),
  supportTickets: many(supportTickets),
  supportMessages: many(supportMessages),
}));

export const exerciseCategoriesRelations = relations(exerciseCategories, ({ one, many }) => ({
  trainer: one(users, {
    fields: [exerciseCategories.trainerId],
    references: [users.id],
  }),
  exercises: many(exercises),
}));

export const exercisesRelations = relations(exercises, ({ one, many }) => ({
  trainer: one(users, {
    fields: [exercises.trainerId],
    references: [users.id],
  }),
  category: one(exerciseCategories, {
    fields: [exercises.categoryId],
    references: [exerciseCategories.id],
  }),
  studentPrograms: many(studentExercisePrograms),
}));

export const studentExerciseProgramsRelations = relations(studentExercisePrograms, ({ one }) => ({
  student: one(students, {
    fields: [studentExercisePrograms.studentId],
    references: [students.id],
  }),
  exercise: one(exercises, {
    fields: [studentExercisePrograms.exerciseId],
    references: [exercises.id],
  }),
}));

export const mealCategoriesRelations = relations(mealCategories, ({ one, many }) => ({
  trainer: one(users, {
    fields: [mealCategories.trainerId],
    references: [users.id],
  }),
  meals: many(meals),
}));

export const mealsRelations = relations(meals, ({ one, many }) => ({
  trainer: one(users, {
    fields: [meals.trainerId],
    references: [users.id],
  }),
  category: one(mealCategories, {
    fields: [meals.categoryId],
    references: [mealCategories.id],
  }),
  studentMealPlans: many(studentMealPlans),
}));

export const studentMealPlansRelations = relations(studentMealPlans, ({ one }) => ({
  student: one(students, {
    fields: [studentMealPlans.studentId],
    references: [students.id],
  }),
  meal: one(meals, {
    fields: [studentMealPlans.mealId],
    references: [meals.id],
  }),
}));

// SupplementCategories relations removed - no longer using categories for supplements

export const supplementsRelations = relations(supplements, ({ one, many }) => ({
  trainer: one(users, {
    fields: [supplements.trainerId],
    references: [users.id],
  }),
  studentSupplements: many(studentSupplements),
}));

export const studentSupplementsRelations = relations(studentSupplements, ({ one }) => ({
  student: one(students, {
    fields: [studentSupplements.studentId],
    references: [students.id],
  }),
  supplement: one(supplements, {
    fields: [studentSupplements.supplementId],
    references: [supplements.id],
  }),
}));

export const studentHistoryRelations = relations(studentHistory, ({ one }) => ({
  student: one(students, {
    fields: [studentHistory.studentId],
    references: [students.id],
  }),
  trainer: one(users, {
    fields: [studentHistory.trainerId],
    references: [users.id],
  }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one, many }) => ({
  student: one(students, {
    fields: [supportTickets.studentId],
    references: [students.id],
  }),
  trainer: one(users, {
    fields: [supportTickets.trainerId],
    references: [users.id],
  }),
  responses: many(ticketResponses),
}));

export const ticketResponsesRelations = relations(ticketResponses, ({ one }) => ({
  ticket: one(supportTickets, {
    fields: [ticketResponses.ticketId],
    references: [supportTickets.id],
  }),
}));

export const supportMessagesRelations = relations(supportMessages, ({ one }) => ({
  student: one(students, {
    fields: [supportMessages.studentId],
    references: [students.id],
  }),
  trainer: one(users, {
    fields: [supportMessages.trainerId],
    references: [users.id],
  }),
}));

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  phoneNumber: true,
});

export const insertTrainerProfileSchema = createInsertSchema(trainerProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
}).partial({
  image: true,
  goalType: true,
  activityLevel: true,
  medicalConditions: true,
});

export const insertExerciseTypeSchema = createInsertSchema(exerciseTypes).omit({
  id: true,
  createdAt: true,
});

export const insertExerciseCategorySchema = createInsertSchema(exerciseCategories).omit({
  id: true,
  createdAt: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
  createdAt: true,
  videoUrl: true, // Video is optional since it's not required for form submission
  imageUrl: true, // Image is optional since it's not required for form submission
}).partial().required({
  name: true,
  trainerId: true,
});

export const insertStudentExerciseProgramSchema = createInsertSchema(studentExercisePrograms).omit({
  id: true,
  createdAt: true,
});

export const insertMealCategorySchema = createInsertSchema(mealCategories).omit({
  id: true,
  createdAt: true,
});

export const insertMealSchema = createInsertSchema(meals).omit({
  id: true,
  createdAt: true,
}).partial().required({
  name: true,
  mealType: true,
  trainerId: true,
});

export const insertStudentMealPlanSchema = createInsertSchema(studentMealPlans).omit({
  id: true,
  createdAt: true,
});

export const insertSupplementCategorySchema = createInsertSchema(supplementCategories).omit({
  id: true,
  createdAt: true,
});

export const insertSupplementSchema = createInsertSchema(supplements).omit({
  id: true,
  createdAt: true,
});

export const insertStudentSupplementSchema = createInsertSchema(studentSupplements).omit({
  id: true,
  createdAt: true,
});

export const insertStudentHistorySchema = createInsertSchema(studentHistory).omit({
  id: true,
  timestamp: true,
});

export const insertSupportTicketSchema = createInsertSchema(supportTickets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTicketResponseSchema = createInsertSchema(ticketResponses).omit({
  id: true,
  createdAt: true,
});

export const insertSupportMessageSchema = createInsertSchema(supportMessages).omit({
  id: true,
  createdAt: true,
});

export const insertUserPreferenceSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAuthSessionSchema = createInsertSchema(authSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Select Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type TrainerProfile = typeof trainerProfiles.$inferSelect;
export type InsertTrainerProfile = z.infer<typeof insertTrainerProfileSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type ExerciseType = typeof exerciseTypes.$inferSelect;
export type InsertExerciseType = z.infer<typeof insertExerciseTypeSchema>;

export type ExerciseCategory = typeof exerciseCategories.$inferSelect;
export type InsertExerciseCategory = z.infer<typeof insertExerciseCategorySchema>;

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;

export type StudentExerciseProgram = typeof studentExercisePrograms.$inferSelect;
export type InsertStudentExerciseProgram = z.infer<typeof insertStudentExerciseProgramSchema>;

export type MealCategory = typeof mealCategories.$inferSelect;
export type InsertMealCategory = z.infer<typeof insertMealCategorySchema>;

export type Meal = typeof meals.$inferSelect;
export type InsertMeal = z.infer<typeof insertMealSchema>;

export type StudentMealPlan = typeof studentMealPlans.$inferSelect;
export type InsertStudentMealPlan = z.infer<typeof insertStudentMealPlanSchema>;

export type SupplementCategory = typeof supplementCategories.$inferSelect;
export type InsertSupplementCategory = z.infer<typeof insertSupplementCategorySchema>;

export type Supplement = typeof supplements.$inferSelect;
export type InsertSupplement = z.infer<typeof insertSupplementSchema>;

export type StudentSupplement = typeof studentSupplements.$inferSelect;
export type InsertStudentSupplement = z.infer<typeof insertStudentSupplementSchema>;

export type StudentHistory = typeof studentHistory.$inferSelect;
export type InsertStudentHistory = z.infer<typeof insertStudentHistorySchema>;

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = z.infer<typeof insertSupportTicketSchema>;

export type TicketResponse = typeof ticketResponses.$inferSelect;
export type InsertTicketResponse = z.infer<typeof insertTicketResponseSchema>;

export type SupportMessage = typeof supportMessages.$inferSelect;
export type InsertSupportMessage = z.infer<typeof insertSupportMessageSchema>;

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = z.infer<typeof insertUserPreferenceSchema>;

export type AuthSession = typeof authSessions.$inferSelect;
export type InsertAuthSession = z.infer<typeof insertAuthSessionSchema>;
