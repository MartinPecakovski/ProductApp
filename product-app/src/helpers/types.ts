export interface ProductsType {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface CartProductType extends ProductsType {
  quantity: number;
}

export interface FinantialItemType {
  title: string;
  price: number;
  id: string;
  quantity: number;
}
export interface FinantialType {
  title: string;
  items: FinantialItemType[];
  total: number;
}
