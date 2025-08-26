
export interface MealFormData {
  name: string;
  type: string;
  day: string;
}

export const initialFormData: MealFormData = {
  name: '',
  type: 'صبحانه',
  day: 'شنبه'
};
