export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD_TO_PRODUCT":
      const updateProductStatus = (products) => {
        return updateProductsWithWishListAndCartStatus(
          products,
          state.wishList,
          state.cartList
        );
      };

      return { ...state, productList: updateProductStatus(action.payload) };

    case "ADD_TO_CART":
      return { ...state, cartList: action.payload };

    case "ADD_TO_WISHLIST":
      return { ...state, wishList: action.payload };

    case "ADD_PRODUCT_TO_WISHLIST":
      return {
        ...state,
        productList: state.productList.map((product) =>
          product.productId === action.productId
            ? { ...product, isInWishList: true }
            : { ...product }
        ),
        wishList: [...state.wishList, { ...action.payload, isInWishList: true }]
      };

    case "REMOVE_PRODUCT_FROM_WISHLIST":
      return {
        ...state,
        productList: state.productList.map((product) =>
          product.productId === action.productId
            ? { ...product, isInWishList: false }
            : { ...product }
        ),
        wishList: state.wishList.filter(
          (item) => item.productId !== action.productId
        )
      };

    case "ADD_PRODUCT_TO_CART":
      return {
        ...state,
        cartList: [
          ...state.cartList,
          {
            ...action.payload,
            quantity: 1,
            isInCartList: true
          }
        ],
        productList: state.productList.map((product) =>
          product.productId === action.productId
            ? { ...product, isInCartList: true }
            : { ...product }
        )
      };

    case "REMOVE_PRODUCT_FROM_CART":
      return {
        ...state,
        productList: state.productList.map((product) =>
          product.productId === action.productId
            ? { ...product, isInCartList: false }
            : { ...product }
        ),
        cartList: state.cartList.filter(
          (product) => product.productId !== action.productId
        )
      };

    case "UPDATE_PRODUCT_QUANTITY_IN_CART":
      return {
        ...state,
        cartList: state.cartList.map((product) =>
          product.productId === action.productId
            ? { ...product, quantity: action.payload }
            : { ...product }
        )
      };

    case "DISPLAY_COMPONENT":
      return { ...state, displayComponent: action.payload };

    case "SORT":
      return {
        ...state,
        filterStates: { ...state.filterStates, sortBy: action.payload }
      };

    case "TOGGLE_AVAILABILITY":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          includeOutOfStock: !state.filterStates.includeOutOfStock
        }
      };

    case "TOGGLE_DELIVERY":
      return {
        ...state,
        filterStates: {
          ...state.filterStates,
          includeFastDelivery: !state.filterStates.includeFastDelivery
        }
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filterStates: {
          sortBy: null,
          includeFastDelivery: false,
          includeOutOfStock: false
        }
      };

    default:
      console.log("something went wrong");
      return state;
  }
};

const handleCheckingStatus = (list, product) => {
  return (
    list.find((item) => item.productId === product.productId) !== undefined
  );
};

const updateProductsWithWishListAndCartStatus = (
  productList,
  wishList,
  cartList
) => {
  if (wishList) {
    productList = productList.map((product) => {
      if (handleCheckingStatus(wishList, product)) {
        return { ...product, isInWishList: true };
      } else {
        return { ...product, isInWishList: false };
      }
    });
  }

  if (cartList) {
    productList = productList.map((product) => {
      if (handleCheckingStatus(cartList, product)) {
        return { ...product, isInCartList: true };
      } else {
        return { ...product, isInCartList: false };
      }
    });
  }

  return productList;
};

// const updateProductWithQuantity = ({ cartList, productId, updateType }) => {
//   for (const product of cartList) {
//     if (product.productId === productId) {
//       if (product.isInCartList) {
//         return updateType === "INCREMENT"
//           ? product.quantity + 1
//           : product.quantity - 1;
//       } else {
//         return 0;
//       }
//     }
//   }
// };

// return product.isInCartList
// ? updateType === "INCREMENT"
//   ? product.quantity + 1
//   : product.quantity - 1
// : 1;
