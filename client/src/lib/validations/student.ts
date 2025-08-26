
import * as z from "zod";

// Convert Persian numbers to English for validation
const convertPersianToEnglish = (value: string): string => {
  if (!value) return '';
  return value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
};

// Preprocessing for number fields
const numberPreprocessor = (value: string) => {
  return convertPersianToEnglish(value);
};

export const studentFormSchema = z.object({
  name: z.string().min(2, { message: "نام و نام خانوادگی الزامی است" }),
  phone: z.string()
    .min(1, { message: "شماره موبایل الزامی است" })
    .transform(numberPreprocessor)
    .refine(val => /^09\d{9}$/.test(val), { 
      message: "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد" 
    }),
  height: z.union([z.string(), z.number(), z.undefined()])
    .transform((val) => {
      if (val === undefined || val === '') return undefined;
      if (typeof val === 'string') {
        const converted = convertPersianToEnglish(val);
        const num = parseInt(converted);
        return isNaN(num) ? undefined : num;
      }
      return val;
    })
    .refine(val => val !== undefined && val > 0, { 
      message: "قد الزامی است و باید عدد مثبت باشد" 
    }),
  weight: z.union([z.string(), z.number(), z.undefined()])
    .transform((val) => {
      if (val === undefined || val === '') return undefined;
      if (typeof val === 'string') {
        const converted = convertPersianToEnglish(val);
        const num = parseInt(converted);
        return isNaN(num) ? undefined : num;
      }
      return val;
    })
    .refine(val => val !== undefined && val > 0, { 
      message: "وزن الزامی است و باید عدد مثبت باشد" 
    }),
  age: z.union([z.string(), z.number(), z.undefined()])
    .transform((val) => {
      if (val === undefined || val === '') return undefined;
      if (typeof val === 'string') {
        const converted = convertPersianToEnglish(val);
        const num = parseInt(converted);
        return isNaN(num) ? undefined : num;
      }
      return val;
    })
    .refine(val => val !== undefined && val > 0 && val < 120, { 
      message: "سن الزامی است و باید بین ۱ تا ۱۲۰ سال باشد" 
    }),
  gender: z.enum(["male", "female"], {
    required_error: "انتخاب جنسیت الزامی است",
    invalid_type_error: "جنسیت انتخاب شده معتبر نیست"
  }),
  // Add required database fields - made optional for form to start empty
  goalType: z.string().min(1, { message: "انتخاب هدف الزامی است" }),
  activityLevel: z.string().min(1, { message: "انتخاب سطح فعالیت الزامی است" }),
  medicalConditions: z.string().min(1, { message: "وضعیت بیماری الزامی است" }),

  image: z.string().default("/Assets/Image/Place-Holder.svg").optional(),
  isActive: z.boolean().default(true), // دسترسی فعال/غیرفعال
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;
