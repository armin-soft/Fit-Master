import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Printer, 
  Download, 
  Dumbbell, 
  UtensilsCrossed, 
  Pill,
  CheckCircle,
  Settings,
  Calendar,
  User,
  Building2
} from "lucide-react";
import { Student } from "@/components/students/StudentTypes";
import { useQuery } from "@tanstack/react-query";
import { useStudentAllPrograms } from "@/hooks/students/useStudentPrograms";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentProgramExporterProps {
  student: Student;
  onClose?: () => void;
}

const StudentProgramExporter: React.FC<StudentProgramExporterProps> = ({ 
  student, 
  onClose 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState({
    exercise: true,
    diet: true,
    supplements: true
  });
  
  const [pdfOptions, setPdfOptions] = useState({
    includeStudentInfo: true,
    includeFooter: true
  });
  
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch student programs
  const { exercisePrograms, mealPlans, supplements } = useStudentAllPrograms(student.id);

  // Fetch trainer profile
  const { data: trainerProfile } = useQuery({
    queryKey: ['/api/trainer/profile'],
    queryFn: async () => {
      const response = await fetch('/api/trainer/profile', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch trainer profile');
      }
      return response.json();
    },
  });

  // Fetch all data for export
  const { data: exercises = [] } = useQuery({
    queryKey: ['/api/exercises'],
    queryFn: async () => {
      const response = await fetch('/api/exercises', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      return response.json();
    },
  });

  const { data: meals = [] } = useQuery({
    queryKey: ['/api/data/meals'],
    queryFn: async () => {
      const response = await fetch('/api/data/meals', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      return response.json();
    },
  });

  const { data: supplementsData = [] } = useQuery({
    queryKey: ['/api/data/supplements'],
    queryFn: async () => {
      const response = await fetch('/api/data/supplements', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch supplements');
      }
      return response.json();
    },
  });

  const handleSectionToggle = (section: keyof typeof selectedSections) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePdfOptionToggle = (option: keyof typeof pdfOptions) => {
    setPdfOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleSelectAllPdfOptions = () => {
    const allSelected = Object.values(pdfOptions).every(Boolean);
    setPdfOptions({
      includeStudentInfo: !allSelected,
      includeFooter: !allSelected
    });
  };

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedSections).every(Boolean);
    setSelectedSections({
      exercise: !allSelected,
      diet: !allSelected,
      supplements: !allSelected
    });
  };

  const handlePrint = () => {
    try {
      console.log('Print function called');
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        console.log('Print window opened');
        const content = generatePrintContent();
        const styles = getPrintStyles();
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html dir="rtl" lang="fa">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>برنامه ${student.name}</title>
            <style>
              ${styles}
            </style>
          </head>
          <body>
            ${content}
          </body>
          </html>
        `);
        printWindow.document.close();
        
        // Wait for content to load then print
        setTimeout(() => {
          printWindow.print();
        }, 500);
      } else {
        console.error('Could not open print window');
        alert('نمی‌توان پنجره چاپ را باز کرد. لطفاً popup blocker را غیرفعال کنید.');
      }
    } catch (error) {
      console.error('Print error:', error);
      alert('خطا در فرآیند چاپ رخ داد');
    }
  };

  const handleExportPDF = async () => {
    try {
      console.log('PDF export function called');
      
      // Create a new window with PDF content and auto-download
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const content = generatePrintContent();
        const styles = getPrintStyles();
        const fileName = `${student.name || 'شاگرد'}_برنامه_تمرینی.pdf`;
        
        printWindow.document.write(`
          <!DOCTYPE html>
          <html dir="rtl" lang="fa">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${fileName}</title>
            <style>
              ${styles}
            </style>
          </head>
          <body>
            ${content}
          </body>
          </html>
        `);
        printWindow.document.close();
        
        // Wait for content to load then trigger PDF download
        setTimeout(() => {
          // Set document title for PDF filename
          printWindow.document.title = fileName;
          
          // Automatically open print dialog with print-to-PDF as default
          printWindow.print();
          
          // Listen for print dialog close to close the window
          printWindow.addEventListener('afterprint', () => {
            printWindow.close();
          });
          
          // Fallback: close window after 10 seconds if user doesn't print
          setTimeout(() => {
            if (!printWindow.closed) {
              printWindow.close();
            }
          }, 10000);
        }, 1000);
      } else {
        console.error('Could not open print window');
        alert('نمی‌توان پنجره پی دی اف را باز کرد. لطفاً popup blocker را غیرفعال کنید.');
      }
    } catch (error) {
      console.error('PDF export error:', error);
      alert('خطا در فرآیند تولید پی دی اف رخ داد');
    }
  };

  const getPrintStyles = () => `
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    @page {
      size: A4;
      margin: 2cm 1.5cm;
      direction: rtl;
      font-family: 'Vazirmatn', sans-serif;
    }
    
    body {
      font-family: 'Vazirmatn', sans-serif;
      direction: rtl;
      color: #1f2937;
      line-height: 1.4;
      font-size: 14px;
      background: white;
      font-feature-settings: "ss02" on;
      font-variant-numeric: tabular-nums;
      margin: 0;
      padding: 0;
    }
    
    .print-container {
      width: 21cm;
      max-width: 21cm;
      margin: 0 auto;
      padding: 0;
      background: white;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    .no-page-break {
      page-break-inside: avoid;
      margin-bottom: 25px;
    }
    
    .header {
      text-align: center;
      border-bottom: 3px solid #059669;
      padding: 15px 0 15px 0;
      margin-bottom: 20px;
      background: #f8fafc;
    }
    
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #059669;
      margin-bottom: 8px;
    }
    
    .header .subtitle {
      font-size: 14px;
      color: #6b7280;
      font-weight: 400;
    }
    
    .student-info {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .student-info h2 {
      color: #059669;
      margin-bottom: 15px;
      font-size: 20px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      text-align: center;
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 8px;
      border-bottom: 1px solid #e5e7eb;
      text-align: center;
    }
    
    .info-label {
      font-weight: bold;
      color: #374151;
      margin-bottom: 5px;
      font-size: 14px;
    }
    
    .info-value {
      color: #059669;
      font-weight: 600;
      font-size: 15px;
    }
    
    .section {
      margin-bottom: 25px;
      page-break-inside: avoid;
    }
    
    .section:not(:last-child) {
      margin-bottom: 20px;
    }
    
    .section-title {
      background: #059669;
      color: white;
      padding: 18px 25px;
      border-radius: 10px 10px 0 0;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
    }
    
    .section-content {
      border: 2px solid #059669;
      border-top: none;
      border-radius: 0 0 10px 10px;
      padding: 20px;
    }
    
    .day-section {
      margin-bottom: 15px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      page-break-inside: avoid;
    }
    
    .day-header {
      background: #f3f4f6;
      padding: 10px 15px;
      font-weight: bold;
      color: #374151;
      border-bottom: 1px solid #e5e7eb;
      text-align: center;
      font-size: 15px;
    }
    
    .day-content {
      padding: 10px;
    }
    
    .exercise-item, .meal-item, .supplement-item {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 6px;
      page-break-inside: avoid;
    }
    
    .exercise-item h4, .meal-item h4, .supplement-item h4 {
      color: #059669;
      margin-bottom: 10px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }
    
    .exercise-details, .meal-details, .supplement-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
      font-size: 15px;
      color: #6b7280;
      text-align: center;
    }
    
    .exercise-details div, .meal-details div, .supplement-details div {
      background: #f8fafc;
      padding: 6px 10px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
      font-weight: 500;
      font-size: 14px;
    }
    
    .footer {
      text-align: center;
      border-top: 3px solid #059669;
      padding: 15px 0 15px 0;
      margin-top: 20px;
      background: #f8fafc;
      page-break-inside: avoid;
    }
    
    .footer h3 {
      font-size: 20px;
      font-weight: 700;
      color: #059669;
      margin-bottom: 15px;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      text-align: center;
    }
    
    .footer-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 8px;
      border-bottom: 1px solid #e5e7eb;
      text-align: center;
    }
    
    .footer-title {
      font-weight: bold;
      color: #374151;
      margin-bottom: 5px;
      font-size: 14px;
    }
    
    .footer-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      color: #059669;
      font-weight: 600;
      font-size: 13px;
    }
    
    .info-row {
      font-size: 13px;
      color: #059669;
      font-weight: 600;
    }
    
    .info-text {
      font-weight: 600;
    }
    
    @media print {
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      body {
        font-size: 14px !important;
        line-height: 1.4 !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .print-container {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
      }
      
      .header {
        background: #f8fafc !important;
        border-bottom: 2px solid #059669 !important;
        margin-bottom: 15px !important;
        padding: 10px 0 !important;
      }
      
      .header h1 {
        font-size: 18px !important;
        margin-bottom: 5px !important;
      }
      
      .header .subtitle {
        font-size: 12px !important;
      }
      
      .student-info {
        background: #f8fafc !important;
        border: 1px solid #e2e8f0 !important;
        margin-bottom: 15px !important;
        padding: 12px !important;
      }
      
      .info-grid {
        break-inside: avoid;
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 10px !important;
      }
      
      .section {
        margin-bottom: 15px !important;
        break-inside: avoid;
      }
      
      .section-title {
        background: #059669 !important;
        color: white !important;
        padding: 12px 20px !important;
        font-size: 16px !important;
        break-after: avoid;
      }
      
      .section-content {
        border: 1px solid #059669 !important;
        padding: 12px !important;
      }
      
      .day-section {
        break-inside: avoid;
        margin-bottom: 12px !important;
      }
      
      .day-header {
        font-size: 12px !important;
        padding: 8px !important;
      }
      
      .exercise-item, .meal-item, .supplement-item {
        background: white !important;
        border: 1px solid #d1d5db !important;
        margin-bottom: 5px !important;
        padding: 6px !important;
        break-inside: avoid;
      }
      
      .exercise-details, .meal-details, .supplement-details {
        font-size: 12px !important;
        gap: 8px !important;
      }
      
      table {
        font-size: 12px !important;
      }
      
      .footer {
        background: #f8fafc !important;
        border-top: 2px solid #059669 !important;
        margin-top: 15px !important;
        padding: 10px 0 !important;
        break-inside: avoid;
      }
      
      .footer h3 {
        font-size: 14px !important;
        margin-bottom: 10px !important;
      }
    }
  `;

  const generatePrintContent = () => {
    const dayNames = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];
    
    let content = `
      <div class="print-container">
        ${pdfOptions.includeStudentInfo ? `
        <!-- Header -->
        <div class="header">
          <h1>برنامه تمرینی و غذایی</h1>
          <div class="subtitle">سامانه مدیریت باشگاه فیت مستر</div>
          <div class="date-info" style="margin-top: 12px; font-size: 13px; color: #4b5563; font-weight: 500;">
            ${(() => {
              const date = new Date();
              const weekday = date.toLocaleDateString('fa-IR', { weekday: 'long' });
              const day = toPersianNumbers(date.toLocaleDateString('fa-IR', { day: 'numeric' }));
              const month = date.toLocaleDateString('fa-IR', { month: 'long' });
              const year = toPersianNumbers(date.toLocaleDateString('fa-IR', { year: 'numeric' }));
              const time = toPersianNumbers(date.toLocaleTimeString('fa-IR', { hour12: false }));
              return `${weekday} ${day} ${month} ${year} - ${time}`;
            })()}
          </div>
        </div>
        ` : ''}
        
        ${pdfOptions.includeStudentInfo ? `
        <!-- Student Info -->
        <div class="student-info">
          <h2>اطلاعات شاگرد</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">نام کامل:</span>
              <span class="info-value">${student.name || 'نامشخص'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">سن:</span>
              <span class="info-value">${student.age ? toPersianNumbers(student.age.toString()) + ' سال' : 'نامشخص'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">جنسیت:</span>
              <span class="info-value">${student.gender === 'male' ? 'مرد' : student.gender === 'female' ? 'زن' : 'نامشخص'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">قد:</span>
              <span class="info-value">${student.height ? toPersianNumbers(student.height.toString()) + ' سانتی متر' : 'نامشخص'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">وزن فعلی:</span>
              <span class="info-value">${student.weight ? toPersianNumbers(student.weight.toString()) + ' کیلوگرم' : 'نامشخص'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">شماره تماس:</span>
              <span class="info-value">${student.phone ? toPersianNumbers(student.phone) : 'نامشخص'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">هدف ورزشی:</span>
              <span class="info-value">${student.goalType || 'تناسب اندام'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">سطح فعالیت:</span>
              <span class="info-value">${student.activityLevel || 'متوسط'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">شرایط پزشکی:</span>
              <span class="info-value">${student.medicalConditions || 'ندارد'}</span>
            </div>
          </div>
        </div>
        ` : ''}
    `;

    // Exercise Programs
    if (selectedSections.exercise && exercisePrograms.data?.length) {
      content += `
        <div class="section">
          <div class="section-title">
            <span style="display: inline-block; width: 24px; height: 24px; background: white; color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">ت</span>
            برنامه تمرینی
          </div>
          <div class="section-content">
      `;
      
      // Group exercises by day
      const exercisesByDay: { [key: number]: any[] } = {};
      exercisePrograms.data.forEach((program: any) => {
        if (!exercisesByDay[program.dayOfWeek]) {
          exercisesByDay[program.dayOfWeek] = [];
        }
        exercisesByDay[program.dayOfWeek].push(program);
      });

      Object.keys(exercisesByDay).forEach(day => {
        const dayNumber = parseInt(day);
        const dayExercises = exercisesByDay[dayNumber];
        
        content += `
          <div class="day-section">
            <div class="day-header">${dayNames[dayNumber - 1]}</div>
            <div class="day-content">
        `;
        
        dayExercises.forEach((program: any) => {
          const exercise = exercises.find((ex: any) => ex.id === program.exerciseId);
          if (exercise) {
            content += `
              <div class="exercise-item">
                <h4>${exercise.name}</h4>
                <div class="exercise-details">
                  <div><strong>تعداد ست:</strong> ${toPersianNumbers(program.sets?.toString() || '۳')}</div>
                  <div><strong>تکرار:</strong> ${toPersianNumbers(program.reps?.toString() || '۸-۱۲')}</div>
                  ${program.weight ? `<div><strong>وزن:</strong> ${toPersianNumbers(program.weight.toString())} کیلوگرم</div>` : ''}
                  ${program.restTime ? `<div><strong>زمان استراحت:</strong> ${toPersianNumbers(program.restTime.toString())} ثانیه</div>` : ''}
                  ${exercise.description ? `<div style="grid-column: 1/-1; text-align: justify; margin-top: 5px;"><strong>توضیحات:</strong> ${exercise.description}</div>` : ''}
                  ${program.notes ? `<div style="grid-column: 1/-1; text-align: justify; margin-top: 5px;"><strong>نکته مربی:</strong> ${program.notes}</div>` : ''}
                </div>
              </div>
            `;
          }
        });
        
        content += `
            </div>
          </div>
        `;
      });
      
      content += `
          </div>
        </div>
      `;
    }

    // Meal Plans
    if (selectedSections.diet && mealPlans.data?.length) {
      content += `
        <div class="section no-page-break">
          <div class="section-title">
            <span style="display: inline-block; width: 24px; height: 24px; background: white; color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">غ</span>
            برنامه غذایی
          </div>
          <div class="section-content">
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; page-break-inside: auto;">
              <thead>
                <tr style="background: #f3f4f6; border-bottom: 2px solid #059669;">
                  <th style="padding: 8px; text-align: center; border: 1px solid #e5e7eb; font-weight: bold; width: 20%;">روز هفته</th>
                  <th style="padding: 8px; text-align: center; border: 1px solid #e5e7eb; font-weight: bold; width: 25%;">وعده غذایی</th>
                  <th style="padding: 8px; text-align: center; border: 1px solid #e5e7eb; font-weight: bold; width: 55%;">منوی غذایی</th>
                </tr>
              </thead>
              <tbody>
      `;
      
      // Group meals by day
      const mealsByDay: { [key: number]: any[] } = {};
      mealPlans.data.forEach((plan: any) => {
        if (!mealsByDay[plan.dayOfWeek]) {
          mealsByDay[plan.dayOfWeek] = [];
        }
        mealsByDay[plan.dayOfWeek].push(plan);
      });

      // Define meal order based on actual meal types in database
      const mealOrder = ['صبحانه', 'میان وعده صبح', 'ناهار', 'میان وعده عصر', 'شام', 'میان وعده شام'];

      Object.keys(mealsByDay).sort((a, b) => parseInt(a) - parseInt(b)).forEach(day => {
        const dayNumber = parseInt(day);
        const dayMeals = mealsByDay[dayNumber];
        
        // Sort meals by mealType order
        dayMeals.sort((a: any, b: any) => {
          const mealA = meals.find((m: any) => m.id === a.mealId);
          const mealB = meals.find((m: any) => m.id === b.mealId);
          const typeA = mealA?.meal_type || mealA?.mealType || 'صبحانه';
          const typeB = mealB?.meal_type || mealB?.mealType || 'صبحانه';
          
          const indexA = mealOrder.indexOf(typeA);
          const indexB = mealOrder.indexOf(typeB);
          
          return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
        });
        
        dayMeals.forEach((plan: any, index: number) => {
          const meal = meals.find((m: any) => m.id === plan.mealId);
          if (meal) {
            content += `
              <tr style="border-bottom: 1px solid #e5e7eb; page-break-inside: avoid;">
                ${index === 0 ? `<td style="padding: 8px; text-align: center; border: 1px solid #e5e7eb; vertical-align: middle; font-weight: bold; background: #f8fafc; font-size: 14px;" rowspan="${dayMeals.length}">${dayNames[dayNumber - 1]}</td>` : ''}
                <td style="padding: 8px; text-align: center; border: 1px solid #e5e7eb; vertical-align: middle; font-size: 13px; color: #374151;">${meal.meal_type || meal.mealType || 'صبحانه'}</td>
                <td style="padding: 8px; text-align: right; border: 1px solid #e5e7eb; vertical-align: middle; font-weight: 500; font-size: 13px; line-height: 1.3;">${meal.name}</td>
              </tr>`;
          }
        });
      });
      
      content += `
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Supplements  
    if (selectedSections.supplements && supplements.data?.length) {
      content += `
        <div class="section no-page-break">
          <div class="section-title">
            <span style="display: inline-block; width: 24px; height: 24px; background: white; color: #059669; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">م</span>
            مکمل ها و ویتامین ها
          </div>
          <div class="section-content">
      `;
      
      supplements.data.forEach((supplement: any) => {
        const supplementData = supplementsData.find((s: any) => s.id === supplement.supplementId);
        if (supplementData) {
          content += `
            <div class="supplement-item">
              <h4>${supplementData.name}</h4>
              <div class="supplement-details">
                <div><strong>مقدار مصرف:</strong> ${toPersianNumbers(supplement.dosage)}</div>
                <div><strong>زمان مصرف:</strong> ${toPersianNumbers(supplement.frequency)}</div>
                ${supplement.endDate ? `<div><strong>تاریخ پایان:</strong> ${toPersianNumbers(new Date(supplement.endDate).toLocaleDateString('fa-IR'))}</div>` : ''}
                ${supplement.instructions ? `<div style="grid-column: 1/-1; text-align: justify; margin-top: 5px;"><strong>نحوه مصرف:</strong> ${toPersianNumbers(supplement.instructions)}</div>` : ''}
                ${supplement.notes ? `<div style="grid-column: 1/-1; text-align: justify; margin-top: 5px;"><strong>توضیح مربی:</strong> ${toPersianNumbers(supplement.notes)}</div>` : ''}
              </div>
            </div>
          `;
        }
      });
      
      content += `
          </div>
        </div>
      `;
    }

    // Footer
    if (pdfOptions.includeFooter) {
      content += `
        <div class="footer">
          <h3>اطلاعات مربی و مرکز ورزشی</h3>
          
          <!-- اطلاعات مربی -->
          <div class="footer-row" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 15px;">
            <div class="footer-section">
              <span class="footer-title">مربی مسئول:</span>
              <div class="footer-info">
                <div class="info-row">${trainerProfile?.name || 'نامشخص'}</div>
              </div>
            </div>
            <div class="footer-section">
              <span class="footer-title">شماره تماس:</span>
              <div class="footer-info">
                <div class="info-row">${trainerProfile?.phone ? toPersianNumbers(trainerProfile.phone) : 'نامشخص'}</div>
              </div>
            </div>
            ${trainerProfile?.instagram ? `
            <div class="footer-section">
              <span class="footer-title">اینستاگرام:</span>
              <div class="footer-info">
                <div class="info-row">${trainerProfile.instagram}</div>
              </div>
            </div>
            ` : `
            <div class="footer-section">
              <span class="footer-title">سامانه:</span>
              <div class="footer-info">
                <div class="info-row">فیت مستر</div>
              </div>
            </div>
            `}
          </div>
          
          <!-- اطلاعات باشگاه -->
          <div class="footer-row" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 15px;">
            <div class="footer-section">
              <span class="footer-title">نام باشگاه:</span>
              <div class="footer-info">
                <div class="info-row">${trainerProfile?.gymName || 'نامشخص'}</div>
              </div>
            </div>
            ${trainerProfile?.website ? `
            <div class="footer-section">
              <span class="footer-title">آدرس سایت باشگاه:</span>
              <div class="footer-info">
                <div class="info-row">${trainerProfile.website}</div>
              </div>
            </div>
            ` : `
            <div class="footer-section">
              <span class="footer-title">سامانه:</span>
              <div class="footer-info">
                <div class="info-row">فیت مستر</div>
              </div>
            </div>
            `}
          </div>
          
          <!-- آدرس باشگاه -->
          ${trainerProfile?.gymAddress ? `
          <div class="footer-address" style="text-align: center; margin-top: 15px; padding: 12px 20px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px;">
            <div style="font-weight: 600; color: #059669; font-size: 14px; line-height: 1.8;">${trainerProfile.gymAddress}</div>
          </div>
          ` : ''}
        </div>
      `;
    }
    
    content += `
      </div>
    `;

    return content;
  };

  const hasAnyPrograms = Boolean(
    exercisePrograms.data?.length || 
    mealPlans.data?.length || 
    supplements.data?.length
  );

  const selectedCount = Object.values(selectedSections).filter(Boolean).length;
  const pdfOptionsCount = Object.values(pdfOptions).filter(Boolean).length;
  const totalSelectedItems = selectedCount + pdfOptionsCount;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          خروجی
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-brand-600" />
            خروجی برنامه {student.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6">
          {!hasAnyPrograms ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>هیچ برنامه‌ای برای این شاگرد تعریف نشده است</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Section Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">انتخاب بخش‌ها</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSelectAll}
                      className="text-xs"
                    >
                      {Object.values(selectedSections).every(Boolean) ? 'عدم انتخاب همه' : 'انتخاب همه'}
                    </Button>
                    <Badge variant="secondary" className="text-xs">
                      {toPersianNumbers(selectedCount)} از ۳ مورد انتخاب شده
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center space-x-2 space-x-reverse"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Checkbox
                        id="exercise"
                        checked={selectedSections.exercise}
                        onCheckedChange={() => handleSectionToggle('exercise')}
                        disabled={!exercisePrograms.data?.length}
                      />
                      <label
                        htmlFor="exercise"
                        className={`flex items-center gap-2 text-sm cursor-pointer ${
                          !exercisePrograms.data?.length ? 'text-gray-400' : ''
                        }`}
                      >
                        <Dumbbell className="h-4 w-4 text-blue-500" />
                        برنامه تمرینی 
                        <Badge variant="outline" className="text-xs">
                          {toPersianNumbers(exercisePrograms.data?.length || 0)}
                        </Badge>
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-2 space-x-reverse"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Checkbox
                        id="diet"
                        checked={selectedSections.diet}
                        onCheckedChange={() => handleSectionToggle('diet')}
                        disabled={!mealPlans.data?.length}
                      />
                      <label
                        htmlFor="diet"
                        className={`flex items-center gap-2 text-sm cursor-pointer ${
                          !mealPlans.data?.length ? 'text-gray-400' : ''
                        }`}
                      >
                        <UtensilsCrossed className="h-4 w-4 text-orange-500" />
                        برنامه غذایی
                        <Badge variant="outline" className="text-xs">
                          {toPersianNumbers(mealPlans.data?.length || 0)}
                        </Badge>
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center space-x-2 space-x-reverse"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Checkbox
                        id="supplements"
                        checked={selectedSections.supplements}
                        onCheckedChange={() => handleSectionToggle('supplements')}
                        disabled={!supplements.data?.length}
                      />
                      <label
                        htmlFor="supplements"
                        className={`flex items-center gap-2 text-sm cursor-pointer ${
                          !supplements.data?.length ? 'text-gray-400' : ''
                        }`}
                      >
                        <Pill className="h-4 w-4 text-green-500" />
                        مکمل ها و ویتامین ها
                        <Badge variant="outline" className="text-xs">
                          {toPersianNumbers(supplements.data?.length || 0)}
                        </Badge>
                      </label>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* PDF Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xs sm:text-sm">تنظیمات فارسی پی دی اف</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSelectAllPdfOptions}
                      className="text-xs"
                    >
                      {Object.values(pdfOptions).every(Boolean) ? 'عدم انتخاب همه' : 'انتخاب همه'}
                    </Button>
                    <Badge variant="secondary" className="text-xs">
                      {toPersianNumbers(Object.values(pdfOptions).filter(Boolean).length)} از ۲ مورد انتخاب شده
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                  <motion.div 
                    className="flex items-center space-x-2 space-x-reverse"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Checkbox
                      id="includeStudentInfo"
                      checked={pdfOptions.includeStudentInfo}
                      onCheckedChange={() => handlePdfOptionToggle('includeStudentInfo')}
                    />
                    <label
                      htmlFor="includeStudentInfo"
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Building2 className="h-4 w-4 text-purple-500" />
                      شامل اطلاعات شاگرد
                    </label>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center space-x-2 space-x-reverse"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Checkbox
                      id="includeFooter"
                      checked={pdfOptions.includeFooter}
                      onCheckedChange={() => handlePdfOptionToggle('includeFooter')}
                    />
                    <label
                      htmlFor="includeFooter"
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <User className="h-4 w-4 text-teal-500" />
                      شامل فوتر (اطلاعات مربی)
                    </label>
                  </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Export Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handlePrint}
                  disabled={selectedCount === 0}
                  className="flex-1 gap-2 text-sm sm:text-base"
                  variant="default"
                >
                  <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
                  چاپ
                </Button>
                <Button
                  onClick={handleExportPDF}
                  disabled={selectedCount === 0}
                  className="flex-1 gap-2 text-sm sm:text-base"
                  variant="outline"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  دانلود پی دی اف
                </Button>
              </div>

              {selectedCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    {toPersianNumbers(totalSelectedItems)} مورد کل برای خروجی انتخاب شده است
                  </div>
                  <div className="text-xs text-green-600 mt-1 mr-6">
                    ({toPersianNumbers(selectedCount)} بخش محتوا + {toPersianNumbers(pdfOptionsCount)} تنظیم پی‌دی‌اف)
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProgramExporter;