import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { reducerFunc } from "./reducerFunc";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, {
    productList: [],
    wishList: [],
    cartList: [],
    filterStates: {
      sortBy: null,
      includeOutOfStock: true,
      includeFastDelivery: false
    },
    displayComponent: "PRODUCT"
  });

  const fetchProductAndAdd = async ({ url, dispatchType, listType }) => {
    try {
      const { data, status } = await axios.get(url);

      if (status === 200) {
        dispatch({ type: dispatchType, payload: data[listType] });
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateCartQuantity = async ({
    url,
    listType,
    dispatchType,
    productId,
    productIndex,
    updateType
  }) => {
    let currentQuantity = state.cartList.filter(
      (product) => product.productId === productId
    )[0].quantity;

    const idToUpdate = state.cartList.filter(
      (product) => product.productId === productId
    )[0].id;

    updateType === "INCREMENT"
      ? (currentQuantity = currentQuantity + 1)
      : (currentQuantity = currentQuantity - 1);

    console.log(
      "updateCartQuantity1",
      { currentQuantity },
      `${url}/${productId}`
    );

    try {
      const { data, status } = await axios.patch(`${url}/${idToUpdate}`, {
        product: { quantity: currentQuantity }
      });

      console.log("updateCartQuantity2", { data }, { status });

      if (status === 200) {
        dispatch({
          type: dispatchType,
          payload: data.cartList.quantity,
          productId: productId
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const addProductToDb = async ({
    url,
    listType,
    dispatchType,
    productId,
    productIndex,
    updateType
  }) => {
    try {
      const { id, ...itemNoId } = state.productList[productIndex];

      const { data, status } = await axios.post(`${url}`, {
        product: { ...itemNoId }
      });

      if (status === 201) {
        dispatch({
          type: dispatchType,
          payload: data[listType],
          productId: productId,
          updateType: updateType
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  const removeProductFromDb = async ({
    url,
    listType,
    dispatchType,
    productId,
    productIndex,
    updateType
  }) => {
    try {
      const idToDelete = state[listType].filter(
        (item) => item.productId === productId
      )[0].id;

      const response = await axios.delete(`${url}/${idToDelete}`);

      if (response.status === 204) {
        dispatch({
          type: dispatchType,
          productId: productId,
          updateType: updateType
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  console.log("useDataCONtext", { state });

  return (
    <DataContext.Provider
      value={{
        state,
        dispatch,
        fetchProductAndAdd,
        updateCartQuantity,
        addProductToDb,
        removeProductFromDb
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
