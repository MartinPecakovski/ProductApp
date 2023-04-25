import { Button, Col, Space } from "antd";
import styles from "./SingleProduct.module.scss";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  quantity?: number;
  deleteCartProduct?: boolean;
  onChangeQuantity?: (id: string, quantity: number) => void;
  onDelete?: (id: string) => void;
  onAddToCart?: (id: string) => void;
};

const SingleProduct = ({
  description,
  id,
  image,
  price,
  title,
  deleteCartProduct,
  quantity,
  onChangeQuantity,
  onDelete,
  onAddToCart,
}: Props) => {
  return (
    <Col lg={8} md={12} xs={24}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img
            src={
              image ??
              "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
            }
            className={styles.cardImgTop}
            alt="..."
          />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.textSection}>
            <h5 className={styles.cardTitle}>{title}</h5>
            <p className={styles.cardText}>{description}</p>
          </div>
          <div className={styles.ctaSection}>
            <div className={styles.price}>${price * (quantity ?? 1)}</div>
            <Space direction="vertical" align="end">
              {!deleteCartProduct && (
                  <Button
                    type="primary"
                    onClick={() => onAddToCart && onAddToCart(id)}
                  >
                    Add to cart
                  </Button>
              )}
              <Button
                onClick={() => onDelete && onDelete(id)}
                type="primary"
                danger
              >
                Delete
              </Button>
              {quantity && (
                <div className={styles.amount}>
                  <Button
                    onClick={() => {
                      onChangeQuantity && onChangeQuantity(id, quantity + 1);
                    }}
                  >
                    +
                  </Button>
                  <div className={styles.amountNumber}>{quantity}</div>
                  <Button
                    onClick={() => {
                      onChangeQuantity && onChangeQuantity(id, quantity! - 1);
                      if (quantity === 1) {
                        onDelete && onDelete(id);
                      }
                    }}
                  >
                    -
                  </Button>
                </div>
              )}
            </Space>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SingleProduct;
