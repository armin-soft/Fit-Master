
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabSectionType {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationTabsProps {
  sections: TabSectionType[];
  activeSection: string;
  onTabChange: (section: string) => void;
}

export const NavigationTabs = ({ 
  sections, 
  activeSection, 
  onTabChange 
}: NavigationTabsProps) => {
  const tabVariants = {
    active: { 
      backgroundColor: "hsl(var(--primary))", 
      color: "hsl(var(--primary-foreground))",
      scale: 1,
    },
    inactive: { 
      backgroundColor: "transparent", 
      color: "hsl(var(--muted-foreground))",
      scale: 0.98,
    }
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <motion.button
            key={section.id}
            onClick={() => onTabChange(section.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
              "transition-all duration-200",
              activeSection === section.id 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover:bg-muted/50"
            )}
            variants={tabVariants}
            initial="inactive"
            animate={activeSection === section.id ? "active" : "inactive"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className={cn(
              "h-4.5 w-4.5",
              activeSection === section.id ? "text-primary-foreground" : "text-muted-foreground"
            )} />
            <span>{section.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
