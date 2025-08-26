
import { ColumnDef } from "@tanstack/react-table";
import { Student } from "@/components/students/StudentTypes";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, UserRound, User, UserCheck } from "lucide-react";
import { toPersianNumbers, formatPrice } from "@/lib/utils/numbers";
import { BMIDisplay } from "@/components/students/bmi";

export const useTableColumns = () => {
  const deviceInfo = useDeviceInfo();

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "image",
      header: () => "تصویر",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center justify-center">
            <Avatar className="h-10 w-10 border-2 border-white/20 shadow-lg">
              <AvatarImage src={student.image} alt={student.name} />
              <AvatarFallback><UserRound className="h-4 w-4" /></AvatarFallback>
            </Avatar>
          </div>
        );
      },
      size: deviceInfo.isMobile ? 40 : 80,
    },
    {
      accessorKey: "name",
      header: () => "نام",
      cell: ({ row }) => {
        const value = row.original.name;
        return <div className="font-medium text-right">{value || ""}</div>;
      },
    },
    {
      accessorKey: "phone",
      header: () => "شماره موبایل",
      cell: ({ row }) => {
        const value = row.original.phone;
        return <div className="text-center">{toPersianNumbers(value) || ""}</div>;
      },
    },
    {
      accessorKey: "gender",
      header: () => "جنسیت",
      cell: ({ row }) => {
        const value = row.original.gender;
        if (!value) return <div className="text-center">-</div>;
        const isMale = value === "male";
        return (
          <div className="text-center">
            <Badge variant="outline" className={`gap-2 ${isMale ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/30 dark:text-blue-400' : 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:border-pink-700/30 dark:text-pink-400'}`}>
              {isMale ? <User className="h-3.5 w-3.5" /> : <UserCheck className="h-3.5 w-3.5" />}
              {isMale ? "مرد" : "زن"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "height",
      header: () => "قد",
      cell: ({ row }) => {
        const value = row.original.height;
        return <div className="text-center">{toPersianNumbers(value?.toString() || "")} <span className="text-xs text-muted-foreground">سانتی‌متر</span></div>;
      },
    },
    {
      accessorKey: "weight",
      header: () => "وزن",
      cell: ({ row }) => {
        const value = row.original.weight;
        return <div className="text-center">{toPersianNumbers(value?.toString() || "")} <span className="text-xs text-muted-foreground">کیلوگرم</span></div>;
      },
    },
    {
      accessorKey: "activityLevel",
      header: () => "سطح تمرینی",
      cell: ({ row }) => {
        const value = row.original.activityLevel;
        if (!value) return <div className="text-center">-</div>;
        let badgeClass = "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/30 dark:text-blue-400";
        if (value === "کم") badgeClass = "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700/30 dark:text-yellow-400";
        if (value === "زیاد") badgeClass = "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-700/30 dark:text-green-400";
        
        return (
          <div className="text-center">
            <Badge variant="outline" className={`gap-1 ${badgeClass}`}>
              {value}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "goalType",
      header: () => "هدف تمرینی",
      cell: ({ row }) => {
        const value = row.original.goalType;
        if (!value) return <div className="text-center">-</div>;
        let badgeClass = "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700/30 dark:text-purple-400";
        if (value === "کاهش وزن") badgeClass = "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700/30 dark:text-orange-400";
        if (value === "افزایش حجم عضلات") badgeClass = "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-700/30 dark:text-red-400";
        
        return (
          <div className="text-center">
            <Badge variant="outline" className={`gap-1 ${badgeClass}`}>
              {value}
            </Badge>
          </div>
        );
      },
    },

    {
      accessorKey: "progress",
      header: () => "تکمیل پروفایل",
      cell: ({ row }) => {
        const value = row.getValue<number>("progress") || 0;
        const isComplete = value >= 100;
        
        return (
          <div className="text-center">
            {isComplete ? (
              <Badge variant="outline" className="gap-2 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-700/30 dark:text-green-400">
                <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                کامل
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/30 dark:text-amber-400">
                ناقص
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: () => "وضعیت دسترسی",
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <div className="text-center">
            <Badge variant="outline" className={`gap-2 ${isActive ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-700/30 dark:text-green-400' : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:border-red-700/30 dark:text-red-400'}`}>
              {isActive ? "فعال" : "غیرفعال"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "bmi",
      header: () => "BMI",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="text-center">
            <BMIDisplay 
              height={student.height} 
              weight={student.weight} 
              name={student.name}
              age={student.age}
              gender={student.gender}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => "اقدامات",
      cell: () => "",
    },
  ];

  return columns;
};
