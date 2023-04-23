import React from "react";
import styles from "./Home.module.scss";
import { Button, Col, Row } from "antd";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className={styles.productsContainer}>
      <Row>
      <Col lg={9} md={12} sm={24}>
      <div className={styles.card}>
        <img
          src="https://codingyaar.com/wp-content/uploads/chair-image.jpg"
          className={styles.cardImgTop}
          alt="..."
        />
        <div className={styles.cardBody}>
          <div className={styles.textSection}>
            <h5 className={styles.cardTitle}>Card title</h5>
            <p className={styles.cardText}>
              Some quick example text to build on the card's content.
            </p>
          </div>
          <div className={styles.ctaSection}>
            <div className={styles.price}>$129.00</div>
            <Button type="default">Buy Now</Button>
          </div>
        </div>
      </div>
      </Col>
      </Row>
    </div>
  );
};

export default Home;
