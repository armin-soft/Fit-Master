
import React from "react";
import { Button } from "@/components/ui/button";
import { Mic, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

interface InputTypeSelectorProps {
  selectedInputType: "speech" | "manual";
  onInputTypeChange: (type: "speech" | "manual") => void;
}

export const InputTypeSelector: React.FC<InputTypeSelectorProps> = ({
  selectedInputType,
  onInputTypeChange
}) => {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-right">
        نحوه ورود اطلاعات را انتخاب کنید:
      </h4>
      
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="button"
            variant={selectedInputType === "speech" ? "default" : "outline"}
            onClick={() => onInputTypeChange("speech")}
            className={`w-full h-16 flex flex-col items-center gap-2 ${
              selectedInputType === "speech" 
                ? "bg-gradient-to-r from-brand-600 to-info-600 text-white" 
                : "border-2 hover:border-brand-300"
            }`}
          >
            <Mic className="w-5 h-5" />
            <span className="text-sm">گفتار به نوشتار</span>
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="button"
            variant={selectedInputType === "manual" ? "default" : "outline"}
            onClick={() => onInputTypeChange("manual")}
            className={`w-full h-16 flex flex-col items-center gap-2 ${
              selectedInputType === "manual" 
                ? "bg-gradient-to-r from-info-600 to-brand-600 text-white" 
                : "border-2 hover:border-info-300"
            }`}
          >
            <Edit3 className="w-5 h-5" />
            <span className="text-sm">تایپ دستی</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default InputTypeSelector;
