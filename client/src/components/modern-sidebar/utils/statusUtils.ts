
export type TrainerStatus = 'active' | 'busy' | 'offline';

export const getStatusColor = (status: TrainerStatus): string => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'busy':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

export const getStatusText = (status: TrainerStatus): string => {
  switch (status) {
    case 'active':
      return 'فعال';
    case 'busy':
      return 'مشغول';
    case 'offline':
      return 'آفلاین';
    default:
      return 'نامشخص';
  }
};
