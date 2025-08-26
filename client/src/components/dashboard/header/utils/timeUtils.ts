
export const getGreeting = (currentTime: Date) => {
  const hour = currentTime.getHours();
  if (hour >= 0 && hour < 3) return "نیمه شب بخیر";
  if (hour >= 3 && hour < 5) return "پیش سحر بخیر";
  if (hour >= 5 && hour < 6) return "سحر بخیر";
  if (hour >= 6 && hour < 8) return "طلوع آفتاب";
  if (hour >= 8 && hour < 11) return "صبح بخیر";
  if (hour >= 11 && hour < 12) return "پیش از ظهر بخیر";
  if (hour >= 12 && hour < 14) return "ظهر بخیر";
  if (hour >= 14 && hour < 17) return "بعد از ظهر بخیر";
  if (hour >= 17 && hour < 19) return "عصر بخیر";
  if (hour >= 19 && hour < 20) return "غروب بخیر";
  if (hour >= 20 && hour < 22) return "اوایل شب بخیر";
  return "شب بخیر";
};
