
// Map of day numbers to Persian day names
export const weekDayMap: Record<number, string> = {
  1: "شنبه",
  2: "یکشنبه",
  3: "دوشنبه",
  4: "سه شنبه",
  5: "چهارشنبه",
  6: "پنج شنبه",
  7: "جمعه"
};

// Map of meal type IDs to Persian meal type names
export const mealTypeMap: Record<number, string> = {
  1: "صبحانه",
  2: "میان وعده صبح",
  3: "ناهار",
  4: "میان وعده عصر",
  5: "شام",
  6: "میان وعده شب"
};

// Color utilities for meal types - aligned with theme colors
export const getMealTypeColor = (type: string) => {
  switch (type) {
    case "صبحانه": return "text-primary bg-primary/10 border-primary/20";
    case "میان وعده صبح": return "text-secondary-foreground bg-secondary/10 border-secondary/20";
    case "ناهار": return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "میان وعده عصر": return "text-destructive bg-destructive/10 border-destructive/20";
    case "شام": return "text-sky-600 bg-sky-50 border-sky-200";
    case "میان وعده شب": return "text-muted-foreground bg-muted border-border";
    default: return "text-muted-foreground bg-muted border-border";
  }
};
