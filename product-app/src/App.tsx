import { Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "./home/Home";
import Finantials from "./finantials/Finantials";
import { Button, Col, Menu, Row } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import Cart from "./cart/Cart";
import { useState } from "react";
import { ProductsType } from "./helpers/types";


function App() {

  const [products, setProducts] = useState<ProductsType[]>([])
  
  const productsSetterFunction = (_products: ProductsType[]) => {
    setProducts(_products)
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
        <Menu.Item key="cart" >
          <Link to="/cart">Cart</Link>
        </Menu.Item>
      </Menu>
      

        <div className={styles.bg}>
        <Row justify='center' align='middle'>
          <Col sm={24} lg={18}>
          <Routes>
          <Route path="/" element={<Home products={products} productsSetterFunction={productsSetterFunction} />} />
          <Route path="/finantials" element={<Finantials />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
          </Col>
        </Row>
        </div>
    </div>
  );
}

export default App;
