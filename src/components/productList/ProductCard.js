import React from "react";
import styles from "./ProductCard.module.css";
import { AddToCartButton } from "./AddToCartButton";
import { LikeButton } from "./LikeButton";
import { CancelButton } from "./CancelButton";

const ProductCard = ({
  productId,
  index,
  type,
  name,
  dismissBtn,
  desc,
  image,
  price,
  fastDelivery,
  inStock,
  offer
}) => {
  return (
    <div className={styles.productCard}>
      {dismissBtn ? (
        <CancelButton productId={productId} index={index} stateType={type} />
      ) : (
        <LikeButton productId={productId} index={index} />
      )}
      <img src={image} alt="product-img" style={{ width: "100%" }} />
      <div className={styles.productDesc}>
        <h3> {name} </h3>
        <span> ₹ {price} </span>
        <span style={{ color: "red", fontWeight: "700" }}> {offer} </span>
        <p>
          {!inStock ? <span> Out Of Stock </span> : <span> In Stock </span>}
        </p>
        <p>
          {fastDelivery ? (
            <span> Fast Delivery Included </span>
          ) : (
            <span> Delivery in 3 days </span>
          )}
        </p>
      </div>
      <AddToCartButton productId={productId} index={index} />
    </div>
  );
};

export { ProductCard };
