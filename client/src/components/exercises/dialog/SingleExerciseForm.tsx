import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SimpleSpeechInput } from "@/components/ui/simple-speech-input";
import { InputTypeSelector } from "./InputTypeSelector";
import { motion, AnimatePresence } from "framer-motion";

interface SingleExerciseFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const SingleExerciseForm: React.FC<SingleExerciseFormProps> = ({
  value,
  onChange
}) => {
  const [inputType, setInputType] = useState<"speech" | "manual">("manual");

  return (
    <div className="space-y-6 text-right max-h-[60vh] overflow-y-auto">
      <InputTypeSelector 
        selectedInputType={inputType}
        onInputTypeChange={setInputType}
      />
      
      <div>
        <Label className="text-base mb-3 block">نام حرکت</Label>
        
        <AnimatePresence mode="wait">
          {inputType === "speech" ? (
            <motion.div
              key="speech"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <SimpleSpeechInput 
                value={value}
                onChange={onChange}
                placeholder="روی میکروفون کلیک کنید و نام حرکت را بگویید..."
                className="text-right border-brand-200 dark:border-brand-800 focus:border-brand-500 dark:focus:border-brand-400"
              />
            </motion.div>
          ) : (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="نام حرکت را تایپ کنید..."
                className="text-right border-brand-200 dark:border-brand-800 focus:border-brand-500 dark:focus:border-brand-400"
                dir="rtl"
                required
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SingleExerciseForm;