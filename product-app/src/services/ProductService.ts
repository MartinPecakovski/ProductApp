import { ProductsType } from "../helpers/types";
import { parseJson, uuid } from "../helpers/util";

let products: ProductsType[] =
  parseJson(localStorage.getItem("products")) ?? [];

export const getProducts = () => {
  return products;
};

export const getProductById = (id: string) => {
  return products?.find((val) => val.id === id);
};

export const createProduct = (value: ProductsType) => {
  const product = {
    id: uuid(),
    title: value.title,
    description: value.description,
    price: value.price,
    image: value.image,
  };
  products = [...products, product];
};

export const deleteProductById = (id: string) => {
  products = products?.filter((val) => val.id !== id) ?? [];
};
