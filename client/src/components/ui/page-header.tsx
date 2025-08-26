
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  actions?: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const PageHeader = ({
  title,
  description,
  icon: Icon,
  actions,
  className,
  animate = true,
}: PageHeaderProps) => {
  const headerContent = (
    <div className={cn("mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-sm">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex w-full sm:w-auto justify-end gap-2">{actions}</div>}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {headerContent}
      </motion.div>
    );
  }

  return headerContent;
};
