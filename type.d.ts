export interface Product {
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  price: number;
  brand: string;
  image: string;
  isNew: boolean;
  category: string;
}
[];

export interface Item {
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  price: number;
  brand: string;
  image: string;
  isNew: boolean;
  category: string;
}

export interface StoreProduct {
  _id: number;
  title: string;
  description: string;
  oldPrice: number;
  quantity: number;
  price: number;
  brand: string;
  image: string;
  category: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
}

export interface StoreProduct {
  brand: string;
  category: string;
  description: string;
  image: string;
  isNew: boolean;
  oldPrice: number;
  price: number;
  title: string;
  _id: number;
  quantity: number;
}
