
export interface OperatorInfo {
  name: string;
  color: string;
  bgColor: string;
}

export const getOperatorInfo = (phoneNumber: string): OperatorInfo => {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // بررسی پیش‌شماره‌های همراه اول
  if (cleanNumber.startsWith('0901') || cleanNumber.startsWith('0902') || 
      cleanNumber.startsWith('0903') || cleanNumber.startsWith('0905') || 
      cleanNumber.startsWith('0990') || cleanNumber.startsWith('0991') || 
      cleanNumber.startsWith('0992') || cleanNumber.startsWith('0993') || 
      cleanNumber.startsWith('0994') || cleanNumber.startsWith('0995') || 
      cleanNumber.startsWith('0996') || cleanNumber.startsWith('0997') || 
      cleanNumber.startsWith('0998') || cleanNumber.startsWith('0999')) {
    return {
      name: 'همراه اول',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    };
  }
  
  // بررسی پیش‌شماره‌های ایرانسل
  if (cleanNumber.startsWith('0901') || cleanNumber.startsWith('0905') ||
      cleanNumber.startsWith('0930') || cleanNumber.startsWith('0933') ||
      cleanNumber.startsWith('0934') || cleanNumber.startsWith('0935') ||
      cleanNumber.startsWith('0936') || cleanNumber.startsWith('0937') ||
      cleanNumber.startsWith('0938') || cleanNumber.startsWith('0939')) {
    return {
      name: 'ایرانسل',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    };
  }
  
  // بررسی پیش‌شماره‌های رایتل
  if (cleanNumber.startsWith('0920') || cleanNumber.startsWith('0921') || 
      cleanNumber.startsWith('0922')) {
    return {
      name: 'رایتل',
      color: 'text-violet-600',
      bgColor: 'bg-violet-100 dark:bg-violet-900/20'
    };
  }
  
  // برای شماره‌هایی که با 091 شروع می‌شوند (ایرانسل)
  if (cleanNumber.startsWith('0910') || cleanNumber.startsWith('0911') || 
      cleanNumber.startsWith('0912') || cleanNumber.startsWith('0913') || 
      cleanNumber.startsWith('0914') || cleanNumber.startsWith('0915') || 
      cleanNumber.startsWith('0916') || cleanNumber.startsWith('0917') || 
      cleanNumber.startsWith('0918') || cleanNumber.startsWith('0919')) {
    return {
      name: 'ایرانسل',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    };
  }

  // شماره 09123823886 که مورد استفاده در سیستم است
  if (cleanNumber === '09123823886') {
    return {
      name: 'ایرانسل',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    };
  }
  
  // بررسی برای سایر شماره‌های ایرانسل
  if (cleanNumber.startsWith('0912')) {
    return {
      name: 'ایرانسل',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    };
  }
  
  // پیش‌فرض
  return {
    name: 'سایر اپراتورها',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100 dark:bg-gray-900/20'
  };
};
