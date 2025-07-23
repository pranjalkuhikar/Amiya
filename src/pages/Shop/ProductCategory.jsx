import React from "react";
import { useGetProductsQuery } from "../../features/apiSlice";
import CategoryPage from "./CategoryPage";

const ProductCategory = () => {
  // Prefetch products when this component mounts
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  return (
    <CategoryPage products={products} isLoading={isLoading} isError={isError} />
  );
};

export default ProductCategory;
