import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/apiSlice";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle add to cart with localStorage
  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        selectedSize,
        selectedColor,
        quantity: 1,
        price: parseFloat(product.price),
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  if (isError || !product) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">Product not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <Link to="/shop" className="flex items-center text-indigo-600 mb-6 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to Shop
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          {/* Main product image */}
          <img
            src={product.images && product.images.length > 0
              ? product.images[currentImageIndex]
              : (product.image || "https://placehold.co/400x500/ffffff/000000?text=Product+Image")}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow mb-4"
          />
          
          {/* Thumbnail images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 flex-shrink-0 rounded ${currentImageIndex === index ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-2xl font-bold text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-lg text-gray-500 line-through">${parseFloat(product.originalPrice).toFixed(2)}</p>
            )}
            {product.available ? (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">In Stock</span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded ml-2">Out of Stock</span>
            )}
          </div>
          
          {/* Product description with HTML */}
          {product.description && (
            <div className="mb-6 text-gray-600 prose">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}
          
          {/* Size selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Size:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border ${
                      selectedSize === size
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-300 hover:border-indigo-600"
                    } rounded-md transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-indigo-600 ring-2 ring-indigo-300"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
              {selectedColor && <p className="mt-2 text-sm text-gray-600">Selected: {selectedColor}</p>}
            </div>
          )}
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.available}
            className={`mt-4 flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-medium shadow-md ${
              product.available
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaShoppingCart />
            {product.available ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
