import styles from "./Home.module.scss";
import { Button, Form, Input, Modal, Row } from "antd";
import { ProductsType } from "../helpers/types";
import SingleProduct from "../components/SingleProduct";
import { useBoolean } from "usehooks-ts";
import { useEffect } from "react";
import { v4 } from "uuid";

type Props = {
  productsSetterFunction: (_products: ProductsType[]) => void;
  products: ProductsType[];
};

const Home = ({ products, productsSetterFunction }: Props) => {
  const { value: toggleCreateModalValue, toggle: toggleCreateModal } =
    useBoolean(false);

  useEffect(() => {
    if (localStorage.getItem("products") === null) {
      localStorage.setItem("products", "[]");
    }
    productsSetterFunction(JSON.parse(localStorage.getItem("products") || ""));

  }, []);

  return (
    <div className={styles.productsContainer}>
      {products.length > 0 ? (
        <Row>
          {products.map(({ description, id, image, price, title }) => (
            <SingleProduct
              key={id}
              id={id}
              title={title}
              description={description}
              image={image}
              price={price}
            />
          ))}
          <div className={styles.plusIcon} onClick={() => toggleCreateModal()}>
            +
          </div>
        </Row>
      ) : (
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>
            Please click the button bellow to create a new product:
          </h1>
          <Button onClick={() => toggleCreateModal()}>Click me!</Button>
        </div>
      )}
      <Modal
        open={toggleCreateModalValue}
        onCancel={() => toggleCreateModal()}
        footer={null}
      >
        <div className={styles.modalSpace}>
          <Form
            onFinish={(values) => {
              let id = v4()
              productsSetterFunction([
                ...products,
                {
                  description: values.description,
                  id: id,
                  image: values.image,
                  price: values.price,
                  title: values.title,
                },
              ]);
              localStorage.setItem(
                "products",
                JSON.stringify([...products, values])
              );
              toggleCreateModal();
            }}
          >
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter the title here" name="title" required />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input
                placeholder="Enter the description here"
                name="description"
                required
              />
            </Form.Item>
            <Form.Item label="Image" name="image">
              <Input
                placeholder="Enter the image url here"
                name="image"
                required
              />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input
                placeholder="Enter the product price here"
                name="price"
                required
                type="number"
                min={0}
              />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
