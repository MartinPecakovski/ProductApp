import { FinantialItemType, FinantialType } from "../helpers/types";
import { parseJson, uuid } from "../helpers/util";
import { clearCart, getCart } from "./CartService";

let financials: FinantialType[] =
  parseJson(localStorage.getItem("finantials")) ?? [];

export const getFinancials = () => {
  return financials;
};

export const createFinancial = () => {
  const cart = getCart();

  if (cart.length > 0) {
    const financialItems: FinantialItemType[] = cart.map((item) => ({
      id: uuid(),
      title: item.title,
      price: item.price * item.quantity,
    }));

    const total = cart.reduce((x, y) => x + y.quantity * y.price, 0);
    const financial = {
      title: `#${uuid()}`,
      items: financialItems,
      total,
      id: uuid(),
    };
    financials = [...financials, financial];
    clearCart();
  }
};
