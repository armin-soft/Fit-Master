
export interface Supplement {
  id: number;
  name: string;
  categoryId?: number;
  category?: string;
  dosage?: string;
  timing?: string;
  description?: string;
  type: 'supplement' | 'vitamin';
}

export interface SupplementCategory {
  id: number;
  name: string;
  description?: string;
  type?: 'supplement' | 'vitamin';
}

export type SupplementType = 'supplement' | 'vitamin';
