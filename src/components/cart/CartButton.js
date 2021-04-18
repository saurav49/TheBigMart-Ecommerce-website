import React from "react";
import { BiCartAlt } from "react-icons/bi";
import { useDataContext } from "../../context/useDataContext";

const CartButton = () => {
  const { dispatch } = useDataContext();

  const handleCartDisplay = () => {
    dispatch({ type: "DISPLAY_COMPONENT", payload: "CART" });
  };

  return (
    <div>
      <button onClick={handleCartDisplay}>
        <BiCartAlt style={{ fontSize: "1.85rem", color: "#fff" }} />
      </button>
    </div>
  );
};

export { CartButton };
