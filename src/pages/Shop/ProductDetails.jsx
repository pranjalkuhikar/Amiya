import React, { useState } from "react";
import { Minus, Plus, Heart } from "lucide-react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  // Mock product data (replace with your actual data fetching logic)
  const product = {
    name: "Classic White Shirt",
    price: "$89",
    description:
      "A timeless classic reimagined for the modern wardrobe. Made from premium cotton with a relaxed fit that ensures both comfort and style.",
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low",
    images: [
      "/images/shirt1.jpg",
      "/images/shirt2.jpg",
      "/images/shirt3.jpg",
      "/images/shirt4.jpg",
    ],
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {product.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="aspect-square overflow-hidden bg-gray-100"
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl font-medium mb-4">{product.name}</h1>
            <p className="text-2xl mb-8">{product.price}</p>

            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">Size</h3>
              <div className="flex gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    } transition-colors duration-300`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">Quantity</h3>
              <div className="flex items-center border border-gray-300 w-32">
                <button
                  onClick={decreaseQuantity}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <button className="flex-1 px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors duration-300">
                Add to Cart
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-black transition-colors duration-300">
                <Heart size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Materials</h3>
                <p className="text-gray-600">{product.materials}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Care Instructions</h3>
                <p className="text-gray-600">{product.care}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="text-2xl font-medium mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add related products here */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
