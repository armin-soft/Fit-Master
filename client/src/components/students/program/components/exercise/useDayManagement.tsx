
import { useState } from "react";
import { toPersianNumbers } from "@/lib/utils/numbers";

export interface DayManagementProps {
  initialDays?: number[];
  initialDayLabels?: Record<number, string>;
  onDayChange?: (day: number) => void;
  maxDays?: number;
}

export const useDayManagement = ({
  initialDays = [1, 2, 3, 4, 5, 6], // Updated to include day 6
  initialDayLabels = {
    1: "روز اول",
    2: "روز دوم", 
    3: "روز سوم",
    4: "روز چهارم",
    5: "روز پنجم",
    6: "روز ششم", // Added day 6
  },
  onDayChange,
  maxDays = 6 // Updated max days to 6
}: DayManagementProps = {}) => {
  const [days, setDays] = useState<number[]>(initialDays);
  const [dayLabels, setDayLabels] = useState<Record<number, string>>(initialDayLabels);
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [tempDayLabel, setTempDayLabel] = useState<string>("");
  const [showAddDayDialog, setShowAddDayDialog] = useState(false);
  const [showDeleteDayDialog, setShowDeleteDayDialog] = useState(false);
  const [dayToDelete, setDayToDelete] = useState<number | null>(null);
  
  // Update external day state if provided
  const handleDayChange = (day: number) => {
    setCurrentDay(day);
    if (onDayChange) {
      onDayChange(day);
    }
  };
  
  const getDayLabel = (day: number) => {
    return dayLabels[day] || `روز ${toPersianNumbers(day)}`;
  };

  const handleEditDayLabel = (day: number) => {
    setEditingDay(day);
    setTempDayLabel(dayLabels[day] || `روز ${toPersianNumbers(day)}`);
  };

  const handleSaveDayLabel = () => {
    if (editingDay !== null && tempDayLabel.trim()) {
      setDayLabels(prev => ({
        ...prev,
        [editingDay]: tempDayLabel.trim()
      }));
      setEditingDay(null);
      setTempDayLabel("");
    }
  };

  const handleAddDay = (label: string) => {
    if (days.length >= maxDays) {
      // Maximum days reached
      return false;
    }
    
    const newDayNumber = Math.max(...days) + 1;
    const newLabel = label.trim() || `روز ${toPersianNumbers(newDayNumber)}`;
    
    setDays(prev => [...prev, newDayNumber]);
    setDayLabels(prev => ({
      ...prev,
      [newDayNumber]: newLabel
    }));
    
    setShowAddDayDialog(false);
    return true;
  };

  const prepareDeleteDay = (day: number) => {
    // Days 1-4 are mandatory, cannot be deleted
    if (day <= 4) {
      return;
    }
    setDayToDelete(day);
    setShowDeleteDayDialog(true);
  };

  const confirmDeleteDay = (day: number) => {
    // Days 1-4 are mandatory, cannot be deleted
    if (day <= 4) {
      return;
    }
    
    // Filter out the day
    setDays(prev => prev.filter(d => d !== day));
    
    // Create new labels object without the deleted day
    const newLabels = { ...dayLabels };
    delete newLabels[day];
    setDayLabels(newLabels);
    
    // If current day is deleted, select the first available day
    if (currentDay === day && days.length > 0) {
      const firstDay = days.filter(d => d !== day)[0] || 1;
      handleDayChange(firstDay);
    }
    
    setDayToDelete(null);
    setShowDeleteDayDialog(false);
  };

  // Check if a day is mandatory (days 1-4)
  const isDayMandatory = (day: number) => day <= 4;

  // Check if a day is optional (days 5-6)
  const isDayOptional = (day: number) => day >= 5;

  return {
    days,
    setDays,
    dayLabels,
    setDayLabels,
    currentDay,
    setCurrentDay: handleDayChange,
    editingDay,
    setEditingDay,
    tempDayLabel,
    setTempDayLabel,
    showAddDayDialog,
    setShowAddDayDialog,
    showDeleteDayDialog,
    setShowDeleteDayDialog,
    dayToDelete,
    setDayToDelete,
    getDayLabel,
    handleEditDayLabel,
    handleSaveDayLabel,
    handleAddDay,
    prepareDeleteDay,
    confirmDeleteDay,
    maxDays,
    isDayMandatory,
    isDayOptional
  };
};

export default useDayManagement;
