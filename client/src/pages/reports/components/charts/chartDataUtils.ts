
export const prepareGenderData = (students: any[]) => {
  const maleStudents = students.filter(s => s.gender === 'male').length;
  const femaleStudents = students.filter(s => s.gender === 'female').length;
  const totalStudents = students.length;

  if (totalStudents === 0) return [];

  return [
    { 
      name: "آقایان", 
      value: maleStudents,
      percentage: Math.round((maleStudents / totalStudents) * 100),
      color: "#3b82f6" 
    },
    { 
      name: "بانوان", 
      value: femaleStudents,
      percentage: Math.round((femaleStudents / totalStudents) * 100),
      color: "#8b5cf6" 
    }
  ];
};

// Note: prepareActivityData removed - now using real database data from /api/reports/activity-stats

export const prepareWeeklyData = (weeklyStats: any[]) => {
  // Use actual weekly data from database - no more fake data!
  if (weeklyStats && weeklyStats.length > 0) {
    return weeklyStats.map((stat) => ({
      week: stat.week,
      students: stat.students || 0,
      sessions: stat.sessions || 0
    }));
  }
  
  // Return empty array if no data available - no fake data generation
  return [];
};
