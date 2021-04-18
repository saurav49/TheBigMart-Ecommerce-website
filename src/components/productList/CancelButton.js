import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { useDataContext } from "../../context/useDataContext";
import styles from "./ProductCard.module.css";

const CancelButton = ({ productId, index, stateType }) => {
  const { removeProductFromDb } = useDataContext();

  const type = stateType === "cartList" ? "CART" : "WISHLIST";

  const handleCancelBtn = () => {
    removeProductFromDb({
      url: `/api/${stateType}s`,
      listType: stateType,
      dispatchType: `REMOVE_PRODUCT_FROM_${type}`,
      productId: productId,
      productIndex: index
    });
  };

  return (
    <>
      <button onClick={handleCancelBtn} className={styles.btn_wish}>
        <ImCancelCircle style={{ fontSize: "1.3rem" }} />
      </button>
    </>
  );
};

export { CancelButton };
