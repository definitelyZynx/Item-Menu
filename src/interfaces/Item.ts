/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IItem {
  uuid: string;
  category: string;
  name: string;
  option: string | null;
  price: number;
  cost: number;
  stock: number;
  image?: any;
}

export interface ICategory {
  uuid: string;
  name: string;
}