import { Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "./home/Home";
import Finantials from "./finantials/Finantials";
import { Col, Menu, Row } from "antd";
import Cart from "./cart/Cart";
import { useEffect, useState } from "react";
import { ProductsType, CartProductType, FinantialType } from "./helpers/types";
import {
  getFinancials,
  addToCart,
  getCart,
  createProduct,
  deleteProductById,
  getProducts,
  createFinancial,
} from "./services";

function App() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [cart, setCart] = useState<CartProductType[]>([]);
  const [financials, setFinancials] = useState<FinantialType[]>([]);

  const productsSetterFunction = (_products: ProductsType[]) => {
    setProducts(_products);
    localStorage.setItem("products", JSON.stringify(_products));
  };

  const cartSetterFunction = (cart: CartProductType[]) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const financialsSetterFunction = (financials: FinantialType[]) => {
    setFinancials(financials);
    localStorage.setItem("finantials", JSON.stringify(financials));
  };

  useEffect(() => {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", "[]");
    }
    if (localStorage.getItem("products") === null) {
      localStorage.setItem("products", "[]");
    }
    if (localStorage.getItem("finantials") === null) {
      localStorage.setItem("finantials", "[]");
    }
    productsSetterFunction(getProducts());
    cartSetterFunction(getCart());
    financialsSetterFunction(getFinancials());
  }, []);

  const handleDeleteProduct = (id: string) => {
    deleteProductById(id);
    const products = getProducts();
    productsSetterFunction(products);
  };

  const handleAddToCart = (id: string) => {
    addToCart(id);
    const cart = getCart();
    cartSetterFunction(cart);
  };

  const handleCreateProduct = (product: ProductsType) => {
    createProduct(product);
    const products = getProducts();
    productsSetterFunction(products);
  };

  const handleCreateFinancial = () => {
    createFinancial();
    const financials = getFinancials();
    financialsSetterFunction(financials);

    const cart = getCart();
    cartSetterFunction(cart);
  }

  return (
    <div className="App">
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="finantials">
          <Link to="/finantials">Finantials</Link>
        </Menu.Item>
        <Menu.Item key="cart">
          <Link to="/cart">Cart</Link>
        </Menu.Item>
      </Menu>

      <div className={styles.bg}>
        <Row justify="center" align="middle">
          <Col sm={24} lg={18}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    products={products}
                    onDeleteProduct={handleDeleteProduct}
                    onAddToCart={handleAddToCart}
                    onCreateProduct={handleCreateProduct}
                    cart={cart}
                  />
                }
              />
              <Route path="/finantials" element={<Finantials financials={financials} />} />
              <Route
                path="/cart"
                element={
                  <Cart cart={cart} cartSetterFunction={cartSetterFunction} handleCreateFinancial={handleCreateFinancial} />
                }
              />
            </Routes>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
