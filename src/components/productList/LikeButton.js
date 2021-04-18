import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import styles from "./ProductCard.module.css";
import { useDataContext } from "../../context/useDataContext";

const LikeButton = ({ productId, index }) => {
  const { state, addProductToDb, removeProductFromDb } = useDataContext();

  const handleLikeBtn = () => {
    state.productList[index].isInWishList
      ? removeProductFromDb({
          url: `/api/wishLists`,
          listType: "wishList",
          dispatchType: "REMOVE_PRODUCT_FROM_WISHLIST",
          productId: productId,
          productIndex: index
        })
      : addProductToDb({
          url: "/api/wishLists",
          listType: "wishList",
          dispatchType: "ADD_PRODUCT_TO_WISHLIST",
          productId: productId,
          productIndex: index
        });
  };

  return (
    <div>
      <button className={styles.btn_wish} onClick={handleLikeBtn}>
        {state.productList[index].isInWishList ? (
          <FaHeart style={{ fontSize: "1.3rem" }} />
        ) : (
          <FaRegHeart style={{ fontSize: "1.3rem" }} />
        )}
      </button>
    </div>
  );
};

export { LikeButton };
