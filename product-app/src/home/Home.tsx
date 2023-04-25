import styles from "./Home.module.scss";
import { Button, Form, Input, Modal, Row } from "antd";
import { CartProductType, ProductsType } from "../helpers/types";
import SingleProduct from "../components/SingleProduct";
import { useBoolean } from "usehooks-ts";

type Props = {
  products: ProductsType[];
  cart: CartProductType[];
  onDeleteProduct: (id: string) => void;
  onAddToCart: (id: string) => void;
  onCreateProduct: (product: ProductsType) => void;
};

const Home = ({
  products,
  onDeleteProduct,
  onAddToCart,
  onCreateProduct,
}: Props) => {
  const { value: toggleCreateModalValue, toggle: toggleCreateModal } =
    useBoolean(false);
  const [form] = Form.useForm<ProductsType>();

  const handleCreateProductSubmit = (values: ProductsType) => {
    onCreateProduct(values);
    form.setFieldsValue({
      description: undefined,
      id: undefined,
      image: undefined,
      price: undefined,
      title: undefined,
    });
    toggleCreateModal();
  };

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
              onDelete={onDeleteProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </Row>
      ) : (
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>
            Please click the button bellow to create a new product:
          </h1>
          <Button onClick={toggleCreateModal}>Click me!</Button>
        </div>
      )}
      <Button
        type="ghost"
        className={styles.plusIcon}
        onClick={toggleCreateModal}
      >
        +
      </Button>
      <Modal
        open={toggleCreateModalValue}
        onCancel={toggleCreateModal}
        footer={null}
      >
        <div className={styles.modalSpace}>
          <Form onFinish={handleCreateProductSubmit} form={form}>
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
