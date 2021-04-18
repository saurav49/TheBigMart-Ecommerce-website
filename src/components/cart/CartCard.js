import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import styles from "./CartCard.module.css";
import { useDataContext } from "../../context/useDataContext";

const CartCard = ({
  index,
  type,
  productId,
  dismissBtn,
  name,
  image,
  price,
  fastDelivery,
  inStock,
  offer
}) => {
  const {
    state: { cartList },
    updateCartQuantity,
    removeProductFromDb
  } = useDataContext();

  const handleCartQuantity = ({ type }) => {
    switch (type) {
      case "INCREMENT":
        updateCartQuantity({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          productIndex: index,
          updateType: "INCREMENT"
        });
        break;

      case "DECREMENT":
        updateCartQuantity({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: "UPDATE_PRODUCT_QUANTITY_IN_CART",
          productId: productId,
          productIndex: index,
          updateType: "DECREMENT"
        });
        break;

      case "REMOVE":
        removeProductFromDb({
          url: `/api/cartLists`,
          listType: "cartList",
          dispatchType: `REMOVE_PRODUCT_FROM_CART`,
          productId: productId,
          productIndex: index
        });
        break;

      default:
        alert("SOMETHING WENT WRONG WHEN UPDATING THE CART QUANTITY");
    }
  };

  return (
    <div className={styles.cartCardContainer}>
      <img
        style={{
          height: "200px",
          paddingRight: "1em"
        }}
        src={image}
        alt={productId}
      />
      <div className={styles.cartContentContainer}>
        <h3> {name} </h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ padding: "0em 1em 0em 0em" }}> ₹ {price} </h3>

          {cartList.find((product) => product.productId === productId)[
            "quantity"
          ] === 1 ? (
            <button
              className={styles.cartBtn}
              onClick={() => handleCartQuantity({ type: "REMOVE" })}
            >
              <RiDeleteBin5Fill />
            </button>
          ) : (
            <button
              className={styles.cartBtn}
              onClick={() => handleCartQuantity({ type: "DECREMENT" })}
            >
              <FaMinus />
            </button>
          )}

          <span>
            {
              cartList.find((product) => product.productId === productId)[
                "quantity"
              ]
            }
          </span>
          <button
            className={styles.cartBtn}
            onClick={() => handleCartQuantity({ type: "INCREMENT" })}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export { CartCard };
