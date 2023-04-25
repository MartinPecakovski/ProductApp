import { CartProductType } from "../helpers/types";
import SingleProduct from "../components/SingleProduct";
import { Button, Row } from "antd";
import {
  clearCart,
  deleteByProductId,
  getCart,
  updateQuantityByProductId,
} from "../services/CartService";
import styles from "./Cart.module.scss";

type Props = {
  cart: CartProductType[];
  cartSetterFunction: (_products: CartProductType[]) => void;
  handleCreateFinancial: () => void;
};

const Cart = ({ cart, cartSetterFunction, handleCreateFinancial }: Props) => {
  const handleDeleteCartProduct = (id: string) => {
    deleteByProductId(id);
    const cart = getCart();
    cartSetterFunction(cart);
  };

  const handleChangleQuantity = (id: string, quantity: number) => {
    updateQuantityByProductId(id, quantity);
    const cart = getCart();
    cartSetterFunction(cart);
  };

  const handleClearCart = () => {
    clearCart();
    cartSetterFunction([]);
  };

  const total = cart?.reduce((x, y) => x + y.price * y.quantity, 0);


  return (
    <>
      <Row>
        {cart.map(({ description, id, image, price, title, quantity }) => (
          <SingleProduct
            key={id}
            id={id}
            title={title}
            description={description}
            image={image}
            price={price}
            quantity={quantity}
            onChangeQuantity={handleChangleQuantity}
            onDelete={handleDeleteCartProduct}
            deleteCartProduct
          />
        ))}
      </Row>
      <div className={styles.footer}>
        <div>Total: &#36;{total}</div>{" "}
        <div>
        <Button type="primary" onClick={handleClearCart}>
          Clear
        </Button>{" "}
        <Button type="primary" onClick={handleCreateFinancial}>
          Buy
        </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
