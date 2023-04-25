import { CartProductType } from "../helpers/types";
import { parseJson } from "../helpers/util";
import { getProductById } from "./ProductService";

let cart: CartProductType[] = parseJson(localStorage.getItem("cart")) ?? [];

export const getCart = () => {
  return cart;
};

export const addToCart = (productId: string) => {
  const cartProduct = cart?.find((val) => val.id === productId);
  if (cartProduct) {
    cartProduct.quantity++;
    return;
  }

  const product = getProductById(productId);
  if (product) {
    cart = [...cart, { ...product, quantity: 1 }];
  }
};

export const deleteByProductId = (id: string) => {
  cart = cart?.filter((val) => val.id !== id) ?? [];
};

export const updateQuantityByProductId = (productId: string, quantity: number) => {
  const cartProduct = cart.find((val) => val.id === productId);
    if (!cartProduct) {
      return;
    }

    cartProduct.quantity = quantity;
    cart = [...cart]
}

export const clearCart = () => {
  cart = [];
}