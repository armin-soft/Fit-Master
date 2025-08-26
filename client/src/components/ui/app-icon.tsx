
import { cn } from "@/lib/utils";

interface AppIconProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function AppIcon({ size = "md", animated = false }: AppIconProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl bg-white",
        size === "sm" && "h-8 w-8",
        size === "md" && "h-12 w-12",
        size === "lg" && "h-16 w-16",
        animated && "animate-pulse"
      )}
    >
      <img
        src="/Assets/Image/Icon.svg"
        alt="لوگوی فیت مستر"
        className={cn(
          "rounded-xl object-cover",
          size === "sm" && "h-6 w-6",
          size === "md" && "h-10 w-10",
          size === "lg" && "h-14 w-14"
        )}
        onError={(e) => {
          console.log('Logo load error, using placeholder');
          e.currentTarget.src = "/Assets/Image/Place-Holder.svg";
        }}
      />
    </div>
  );
}
