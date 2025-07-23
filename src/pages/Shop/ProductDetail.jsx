import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/apiSlice";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  if (isError || !product) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">Product not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link to="/shop" className="flex items-center text-indigo-600 mb-6 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to Shop
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.image || "https://via.placeholder.com/400x500?text=Product+Image"}
          alt={product.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-gray-700 mb-4">${parseFloat(product.price).toFixed(2)}</p>
          {product.description && <p className="mb-4 text-gray-600">{product.description}</p>}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">Sizes:</span> {product.sizes.join(", ")}
            </div>
          )}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">Colors:</span> {product.colors.join(", ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
