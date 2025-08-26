
import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentExerciseListWrapperProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
  viewMode?: "grid" | "list";
}

export const StudentExerciseListWrapper: React.FC<StudentExerciseListWrapperProps> = ({
  children,
  maxHeight = "100%",
  className = "",
  viewMode = "grid"
}) => {
  return (
    <div className={cn("flex-1 min-h-0 overflow-hidden", className)}>
      <ScrollArea className="h-full w-full" orientation="vertical">
        <div className="p-4 overflow-x-hidden">
          <div
            className={cn(
              "w-full overflow-x-hidden", 
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col space-y-3"
            )}
          >
            {children}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StudentExerciseListWrapper;
