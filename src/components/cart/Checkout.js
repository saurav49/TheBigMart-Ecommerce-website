import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "../productList/ProductCard.module.css";
import checkoutStyles from "./Checkout.module.css";

const Checkout = ({}) => {
  return (
    <>
      <div
        className={checkoutStyles.totalPriceContainer}
        style={{ marginTop: "5em" }}
      ></div>
      <div className={checkoutStyles.checkoutContainer}>
        <div className={checkoutStyles.checkoutPriceContainer}>
          <div className={checkoutStyles.priceContainer}>
            <p> TOTAL MRP </p> <span> ₹ 2000 </span>
          </div>
          <div className={checkoutStyles.priceContainer}>
            <p> CONVENIENCE FEE </p> <span> ₹ 2000 </span>
          </div>

          <div className={checkoutStyles.totalPriceContainer}></div>

          <div className={checkoutStyles.priceContainer}>
            <p className={checkoutStyles.textDark}> TOTAL AMOUNT </p>

            <span className={checkoutStyles.textDark}> ₹ 4000 </span>
          </div>
        </div>
        <button className={styles.btn} style={{ height: "80px", width: "55%" }}>
          <span> PLACE ORDER </span>

          <FaArrowRight className={styles.arrowIcon} />
        </button>
      </div>
    </>
  );
};

export { Checkout };
