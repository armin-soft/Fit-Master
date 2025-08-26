
import React from "react";
import { Utensils } from "lucide-react";

const EmptyDayState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
      <Utensils className="h-16 w-16 text-gray-300 mb-4" />
      <p className="text-lg text-gray-600 font-medium">لطفا یک روز از هفته را انتخاب کنید</p>
      <p className="text-sm text-gray-400 mt-2 max-w-md">
        برای مشاهده و تنظیم برنامه غذایی، ابتدا روز مورد نظر را انتخاب کنید
      </p>
    </div>
  );
};

export default EmptyDayState;
