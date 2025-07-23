import React from "react";
import {
  useGetProductsQuery,
  useAddToCartMutation,
} from "../features/apiSlice";

const Products = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async (product) => {
    try {
      await addToCart({
        ...product,
        quantity: 1,
      }).unwrap();
      alert("Added to cart successfully!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add to cart");
    }
  };

  if (isLoading)
    return <div className="text-center py-8">Loading products...</div>;
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading products
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">${product.price}</p>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {product.description}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
