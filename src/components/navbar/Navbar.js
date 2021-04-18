import React from "react";
import styles from "./Navbar.module.css";
import { FaMountain } from "react-icons/fa";
import { WishlistButton } from "../wishlist/WishlistButton";
import { CartButton } from "../cart/CartButton";
import { useDataContext } from "../../context/useDataContext";

const Navbar = () => {
  const { dispatch } = useDataContext();
  const handleHomePageDisplay = () => {
    dispatch({ type: "DISPLAY_COMPONENT", payload: "PRODUCT" });
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.brandContainer} onClick={handleHomePageDisplay}>
        <FaMountain className={styles.brandIcon} />
        <h1 className={styles.brandName}> Barak Shop </h1>
      </div>
      <div className={styles.cartWishContainer}>
        <WishlistButton />
        <CartButton />
      </div>
    </div>
  );
};

export { Navbar };
