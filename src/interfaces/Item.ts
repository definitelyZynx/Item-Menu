export interface IItem {
  id?: number;
  category: string;
  name: string;
  option: string | null;
  price: number;
  cost: number;
  stock: number;
  image?: string | null;
}