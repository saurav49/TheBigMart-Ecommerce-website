import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import styles from "./ProductCard.module.css";
import { useDataContext } from "../../context/useDataContext";

const AddToCartButton = ({ productId, index }) => {
  const {
    state,
    dispatch,
    addProductToDb,
    updateCartQuantity
  } = useDataContext();

  // To check whether item is in cartList
  const checkIsInCartList = (cartList, productId) => {
    return (
      cartList.find((product) => product.productId === productId) !== undefined
    );
  };

  const handleAddToCart = () => {
    state.productList[index].isInCartList
      ? dispatch({ type: "DISPLAY_COMPONENT", payload: "CART" })
      : checkIsInCartList(state.cartList, productId)
      ? updateCartQuantity({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          productIndex: index,
          updateType: "INCREMENT"
        })
      : addProductToDb({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: "ADD_PRODUCT_TO_CART",
          productId: productId,
          productIndex: index
        });
  };

  return (
    <>
      <button className={styles.btn} onClick={handleAddToCart}>
        {state.productList[index].isInCartList ? (
          <>
            <span>GO TO CART</span>
            <FaArrowRight className={styles.arrowIcon} />
          </>
        ) : (
          <>
            <FaShoppingBag className={styles.bagIcon} />
            <span>ADD TO CART</span>
          </>
        )}
      </button>
    </>
  );
};

export { AddToCartButton };
