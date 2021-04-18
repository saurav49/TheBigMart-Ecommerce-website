import React from "react";
import { ProductCard } from "./ProductCard";
import { useDataContext } from "../../context/useDataContext";
import styles from "./ProductList.module.css";

const ProductList = ({ products }) => {
  const { state } = useDataContext();

  const getDataSorted = (productList, sortBy) => {
    if (sortBy === null) {
      return productList;
    }

    return sortBy === "HIGH_TO_LOW"
      ? productList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      : productList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  };

  const getFilteredData = (
    productList,
    isIncludeFastDelivery,
    isIncludeOutOfStock
  ) => {
    if (isIncludeFastDelivery) {
      productList = productList.filter((item) => item.fastDelivery);
    }

    if (!isIncludeOutOfStock) {
      productList = productList.filter((item) => item.inStock);
    }

    return productList;
  };

  const sortedData = getDataSorted(
    state.productList,
    state.filterStates.sortBy
  );
  const filteredData = getFilteredData(
    sortedData,
    state.filterStates.includeFastDelivery,
    state.filterStates.includeOutOfStock
  );

  return (
    <div>
      <h1> All Products </h1>
      <div className={styles.productList}>
        {filteredData.map(
          (
            {
              productId,
              name,
              desc,
              image,
              price,
              fastDelivery,
              inStock,
              offer
            },
            index
          ) => {
            return (
              <ProductCard
                key={productId}
                productId={productId}
                index={index}
                name={name}
                desc={desc}
                image={image}
                price={price}
                fastDelivery={fastDelivery}
                inStock={inStock}
                offer={offer}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export { ProductList };
