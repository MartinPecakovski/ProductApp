import { Button, Col, Space } from "antd";
import styles from "./SingleProduct.module.scss";
import { ProductsType } from "../helpers/types";



const SingleProduct = ({description, id, image, price, title}: ProductsType) => {
  return (
    <Col lg={8} md={12} sm={24}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
        <img
          src={image ?? 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'}
          className={styles.cardImgTop}
          alt="..."
        />
        </div>
        <div className={styles.cardBody}>
          <div className={styles.textSection}>
            <h5 className={styles.cardTitle}>{title}</h5>
            <p className={styles.cardText}>
              {description}
            </p>
          </div>
          <div className={styles.ctaSection}>
            <div className={styles.price}>${price}</div>
            <Space direction="vertical" align="end">
            <Button type="default">Buy Now</Button>
            <Button type="primary">Add to cart</Button>
            </Space>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SingleProduct;
