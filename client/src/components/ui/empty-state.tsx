
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, UserPlus, FilePlus, FolderPlus, ListPlus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export function EmptyState({
  icon = "Plus",
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  const getIcon = (): React.ReactNode => {
    const iconProps = { className: "mb-4 h-12 w-12 text-muted-foreground/70" };
    
    switch (icon) {
      case "UserPlus":
        return <UserPlus {...iconProps} />;
      case "FilePlus":
        return <FilePlus {...iconProps} />;
      case "FolderPlus":
        return <FolderPlus {...iconProps} />;
      case "ListPlus":
        return <ListPlus {...iconProps} />;
      default:
        return <Plus {...iconProps} />;
    }
  };
  
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 w-full", className)}>
      {getIcon()}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-muted-foreground mt-2 mb-4 max-w-sm">{description}</p>}
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-4"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
