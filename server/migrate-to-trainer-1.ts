import { db } from "./db";
import { 
  students, 
  exerciseTypes, 
  exerciseCategories, 
  exercises, 
  mealCategories, 
  meals, 
  supplements, 
  supplementCategories, 
  studentHistory, 
  supportTickets, 
  supportMessages 
} from "@shared/schema";
import { sql } from "drizzle-orm";

async function migrateAllDataToTrainer1() {
  console.log("🚀 شروع انتقال تمام داده‌ها به trainer_id = 1...");
  
  try {
    // ابتدا بررسی کنیم که کدام trainer_id ها وجود دارند
    console.log("\n📊 بررسی وضعیت فعلی داده‌ها:");
    
    const studentCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM students 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("👥 Students:", studentCount.rows);
    
    const mealCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM meals 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("🍽️ Meals:", mealCount.rows);
    
    const exerciseCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM exercises 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("💪 Exercises:", exerciseCount.rows);
    
    const supplementCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM supplements 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("💊 Supplements:", supplementCount.rows);

    console.log("\n🔄 شروع انتقال داده‌ها...");
    
    // انتقال داده‌ها به trainer_id = 1
    const updates = [
      { table: 'students', name: '👥 شاگردان' },
      { table: 'exercise_types', name: '🏋️ انواع تمرینات' },
      { table: 'exercise_categories', name: '📂 دسته‌بندی تمرینات' },
      { table: 'exercises', name: '💪 تمرینات' },
      { table: 'meal_categories', name: '🍽️ دسته‌بندی وعده‌ها' },
      { table: 'meals', name: '🍲 وعده‌های غذایی' },
      { table: 'supplement_categories', name: '💊 دسته‌بندی مکمل‌ها' },
      { table: 'supplements', name: '⚡ مکمل‌ها' },
      { table: 'student_history', name: '📜 تاریخچه شاگردان' },
      { table: 'support_tickets', name: '🎫 تیکت‌های پشتیبانی' },
      { table: 'support_messages', name: '💬 پیام‌های پشتیبانی' }
    ];

    for (const update of updates) {
      try {
        const result = await db.execute(sql`
          UPDATE ${sql.identifier(update.table)} 
          SET trainer_id = 1 
          WHERE trainer_id != 1
        `);
        console.log(`✅ ${update.name}: ${result.rowCount || 0} رکورد به‌روزرسانی شد`);
      } catch (error) {
        console.log(`⚠️ ${update.name}: خطا - ${error}`);
      }
    }

    console.log("\n📊 بررسی وضعیت نهایی:");
    
    // بررسی نهایی
    const finalStudentCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM students 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("👥 Students (نهایی):", finalStudentCount.rows);
    
    const finalMealCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM meals 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("🍽️ Meals (نهایی):", finalMealCount.rows);
    
    const finalExerciseCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM exercises 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("💪 Exercises (نهایی):", finalExerciseCount.rows);
    
    const finalSupplementCount = await db.execute(sql`
      SELECT trainer_id, COUNT(*) as count 
      FROM supplements 
      GROUP BY trainer_id 
      ORDER BY trainer_id
    `);
    console.log("💊 Supplements (نهایی):", finalSupplementCount.rows);

    console.log("\n✅ انتقال تمام داده‌ها به trainer_id = 1 با موفقیت انجام شد!");
    
  } catch (error) {
    console.error("❌ خطا در انتقال داده‌ها:", error);
    throw error;
  }
}

// اجرای migration اگر فایل مستقیماً فراخوانی شود
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateAllDataToTrainer1()
    .then(() => {
      console.log("🎉 Migration کامل شد!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Migration ناموفق:", error);
      process.exit(1);
    });
}

export { migrateAllDataToTrainer1 };