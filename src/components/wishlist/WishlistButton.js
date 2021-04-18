import React from "react";
import { FiHeart } from "react-icons/fi";
import { useDataContext } from "../../context/useDataContext";

const WishlistButton = () => {
  const { dispatch } = useDataContext();

  const handleWishlistDisplay = () => {
    dispatch({ type: "DISPLAY_COMPONENT", payload: "WISHLIST" });
  };

  return (
    <div>
      <button onClick={handleWishlistDisplay}>
        <FiHeart style={{ fontSize: "1.85rem", color: "#fff" }} />
      </button>
    </div>
  );
};

export { WishlistButton };
