
export function toPersianNumbers(number: number | string | null | undefined): string {
  if (number === null || number === undefined) {
    return '';
  }
  
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/\d/g, (digit: string) => persianDigits[parseInt(digit)]);
}

// Format numbers with thousands separator
export function formatNumber(number: number | string): string {
  if (!number) return '';
  
  const numberString = number.toString();
  const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return toPersianNumbers(formatted);
}

// Format price with Toman currency
export function formatPrice(price: number | string): string {
  if (!price) return '';
  
  const formattedPrice = formatNumber(price);
  return `${formattedPrice} تومان`;
}

// Format date to Persian with RTL alignment
export function formatPersianDate(date: Date | string | number): string {
  try {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    return toPersianNumbers(`${year}/${month}/${day} - ${hours}:${minutes}`);
  } catch (error) {
    return '';
  }
}
