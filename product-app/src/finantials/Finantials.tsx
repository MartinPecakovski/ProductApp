import React from "react";
import styles from "./Finantials.module.scss";
import { FinantialType } from "../helpers/types";
import { Col, Row } from "antd";

type Props = {
  financials: FinantialType[];
};

const Finantials = ({ financials }: Props) => {
  console.log(financials);
  return (
    <Row>
      {financials?.map((finantial) => (
        <Col lg={24}>
          <div className={styles.finantialContainer}>
            <h3>{finantial.title}</h3>
            <Row>
              {
                finantial.items.map(item => (
                  <Col span={24}>
                    <div className={styles.productsTable}>
                    <div>{item.title} x{item.quantity}</div><div>&#36;{item.price}</div>
                    </div>
                  </Col>
                ))
              }
            </Row>
            <div className={styles.total}>Total: &#36;{finantial.total}</div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default Finantials;
