import React, { useEffect } from "react";
import "./styles.css";
import { useDataContext } from "./context/useDataContext";
import { ProductList } from "./components/productList/ProductList";
import { Navbar } from "./components/navbar/Navbar";
import { Filters } from "./components/filters/Filters";
import { Cart } from "./components/cart/Cart";
import { Wishlist } from "./components/wishlist/Wishlist";

export default function App() {
  const { state, fetchProductAndAdd } = useDataContext();

  useEffect(() => {
    fetchProductAndAdd({
      url: "/api/products",
      dispatchType: "ADD_TO_PRODUCT",
      listType: "products"
    });
  }, []);

  useEffect(() => {
    fetchProductAndAdd({
      url: "/api/wishLists",
      dispatchType: "ADD_TO_WISHLIST",
      listType: "wishLists"
    });
  }, []);

  useEffect(() => {
    fetchProductAndAdd({
      url: "/api/cartLists",
      dispatchType: "ADD_TO_CART",
      listType: "cartLists"
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      {state.displayComponent === "PRODUCT" && <Filters />}
      {state.displayComponent === "PRODUCT" && (
        <ProductList products={state.productList} />
      )}
      {state.displayComponent === "CART" && <Cart />}
      {state.displayComponent === "WISHLIST" && <Wishlist />}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { uuid } from "uuidv4";
// import "./styles.css";

// export default function App() {
//   const [addresses, setAddresses] = useState([]);
//   const [newAddress, setNewAddress] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   useEffect(() => {
//     (async function () {
//       const { data } = await axios.get("/api/addresses");
//       setAddresses(data.addresses);
//     })();
//   }, []);

//   const handleButtonSave = async () => {
//     setIsLoading(true);
//     try {
//       const {
//         data: { address },
//         status
//       } = await axios.post("/api/addresses", {
//         address: {
//           id: uuid(),
//           city: newAddress
//         }
//       });

//       if (status === 201) {
//         setAddresses((addresses) => [...addresses, address]);
//         setNewAddress("");
//       }
//     } catch (error) {
//       setIsError(true);
//     }

//     setIsLoading(false);
//   };

//   const handleEditAddress = (id) => {};

//   const handleDeleteAddress = async (id) => {
//     setIsLoading(true);
//     setAddresses((addresses) => addresses.filter((a) => a.id !== id));
//     setIsLoading(false);
//   };

//   console.log("addresses", addresses);

//   return (
//     <div className="App">
//       <h1>
//         {isLoading ? (
//           <span>saving to server...</span>
//         ) : isError ? (
//           <span>Couldn't save the data</span>
//         ) : (
//           <span> Address Book </span>
//         )}
//       </h1>
//       <input
//         type="text"
//         value={newAddress}
//         placeholder="enter city"
//         onChange={(event) => {
//           const { value } = event.target;
//           setNewAddress(value);
//         }}
//       />
//       <button onClick={handleButtonSave}> Save Address </button>
//       <ul>
//         {addresses.map(({ id, city }) => (
//           // {console.log(address.id)}
//           <li
//             key={id}
//             style={{
//               margin: "0.5em 0",
//               listStyleType: "none",
//               backgroundColor: "#333",
//               color: "#fff",
//               padding: "0.7em",
//               borderRadius: "0.5em"
//             }}
//           >
//             {city}
//             <button onClick={() => handleEditAddress(id)}> Edit </button>
//             <button onClick={() => handleDeleteAddress(id)}> Delete </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
