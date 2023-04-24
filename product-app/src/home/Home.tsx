import styles from "./Home.module.scss";
import { Button, Form, Input, Modal, Row } from "antd";
import { ProductsType } from "../helpers/types";
import SingleProduct from "../components/SingleProduct";
import { useBoolean } from "usehooks-ts";
import { useEffect } from "react";

type Props = {
  productsSetterFunction: (_products: ProductsType[]) => void;
  products: ProductsType[];
  cartSetterFunction: (_products: ProductsType[]) => void
  cart: ProductsType[]
};

const Home = ({ products, productsSetterFunction, cartSetterFunction, cart }: Props) => {
  const { value: toggleCreateModalValue, toggle: toggleCreateModal } =
    useBoolean(false);

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
    productsSetterFunction(JSON.parse(localStorage.getItem("products") || ""));

  }, []);

  const [form] = Form.useForm()

  return (
    <div className={styles.productsContainer}>
      {products.length > 0 ? (
        <Row>
          {products.map(({ description, id, image, price, title }) => (
            <SingleProduct
              key={title + description}
              id={id}
              title={title}
              description={description}
              image={image}
              price={price}
              productsSetterFunction={productsSetterFunction}
              products={products}
              cartSetterFunction={cartSetterFunction}
              cart={cart}
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
              productsSetterFunction([
                ...products,
                {
                  'description': values.description,
                  'id': values.description + values.title,
                  'image': values.image,
                  'price': values.price,
                  'title': values.title,
                },
              ]);
              localStorage.setItem(
                "products",
                JSON.stringify([...products, values])
              );
              form.setFieldsValue({
                description: '',
                  id: '',
                  image: '',
                  price: 0,
                  title: '',

              })
              toggleCreateModal();

              
            }}
            form={form}
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
