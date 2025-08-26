import { db } from '../db';
import { sql } from 'drizzle-orm';

export async function removeUnusedFields() {
  console.log('Removing unused fields from students table...');
  
  try {
    // Remove the specified fields
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS emergency_contact;`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS emergency_phone;`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS notes;`);
    await db.execute(sql`ALTER TABLE students DROP COLUMN IF EXISTS grade;`);
    
    // Update existing records to use Persian values for goal_type and activity_level
    await db.execute(sql`
      UPDATE students SET 
        goal_type = CASE 
          WHEN goal_type = 'fitness' THEN 'تناسب اندام'
          WHEN goal_type = 'weight_loss' THEN 'کاهش وزن'
          WHEN goal_type = 'muscle_gain' THEN 'افزایش حجم عضلات'
          ELSE goal_type
        END,
        activity_level = CASE
          WHEN activity_level = 'low' THEN 'کم'
          WHEN activity_level = 'medium' THEN 'متوسط'
          WHEN activity_level = 'high' THEN 'زیاد'
          ELSE activity_level
        END
      WHERE goal_type IN ('fitness', 'weight_loss', 'muscle_gain') 
        OR activity_level IN ('low', 'medium', 'high');
    `);
    
    console.log('Successfully removed unused fields and updated Persian values');
  } catch (error) {
    console.error('Error removing unused fields:', error);
    throw error;
  }
}