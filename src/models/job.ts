export interface Job {
  id?: number;
  title: string;
  company: string;
  location?: string;
  salary?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
