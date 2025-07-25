import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/apiSlice";
import { FaArrowLeft, FaShoppingCart, FaHeart, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const colorMap = {
    Verde: "#008000",
    Crema: "#F5F5DC",
    Striped: "#A9A9A9",
    White: "#FFFFFF",
    Pink: "#FFC0CB",
    "Sky Blue": "#87CEEB",
    Gray: "#808080",
    Beige: "#F5F5DC",
  };

  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const addButtonRef = useRef(null);

  console.log("Product ID from URL:", id);
  console.log("Fetched product data:", product);
  // Use Redux instead of Context API
  const dispatch = useDispatch();

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize("");
      setSelectedColor("");
      setCurrentImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  // Handle add to cart with Redux
  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    // Add to cart using Redux
    dispatch(
      addToCart({
        product,
        selectedSize,
        selectedColor,
        quantity,
      })
    );

    // Show success animation
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen text-red-600 dark:text-red-400"
      >
        Product not found.
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="deatils mx-auto py-12 px-4 sm:px-6 lg:px-8 "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Product Images Section */}
        <div className="space-y-6">
          {/* Main product image with zoom effect */}
          <motion.div
            className="relative overflow-hidden rounded-lg aspect-square"
            whileHover={{ scale: isImageZoomed ? 1 : 1.02 }}
            transition={{ duration: 0.3 }}
            style={{}}
          >
            <motion.img
              src={
                product.images && product.images.length > 0
                  ? product.images[currentImageIndex]
                  : product.image ||
                    "https://placehold.co/600x600/ffffff/000000?text=Product+Image"
              }
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isImageZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsImageZoomed(!isImageZoomed)}
              style={{
                objectPosition: isImageZoomed ? "center center" : "top",
              }}
              layoutId={`product-image-${product.id}`}
            />

            {/* 3D-like hover effect overlay */}
          </motion.div>

          {/* Thumbnail images */}
          {product.images && product.images.length > 1 && (
            <motion.div
              className="product-thumbnail-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`thumbnail-button ${currentImageIndex === index ? "active" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={img}
                    alt={`${product.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Product Info Section */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Product title and price */}
          <div>
            <motion.h1
              className="text-3xl sm:text-4xl font-semibold mb-2 font-[PPS]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {product.name}
            </motion.h1>

            <motion.div
              className="flex items-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-3xl font-[PPR]">
                ₹{parseFloat(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                  ₹{parseFloat(product.originalPrice).toFixed(2)}
                </span>
              )}
              {product.available ? (
                <span className="bg-green-50  text-green-700  text-xs font-medium px-3 py-1 rounded-full ml-2">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1 rounded-full ml-2">
                  Out of Stock
                </span>
              )}
            </motion.div>
          </div>

          {/* Product description with expand/collapse */}
          {product.description && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div
                className={`prose prose-gray font-[PPR] dark:prose-invert max-w-none overflow-hidden ${
                  !isDescriptionExpanded ? "max-h-32" : ""
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
              {product.description.length > 150 && (
                <button
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-2 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  {isDescriptionExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </motion.div>
          )}

          {/* Size and Color selection */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 product-options">
            {/* Size selection */}
            {product.sizes && product.sizes.length > 0 && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="text-sm font-medium text-gray-900 font-[PPS] mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 size py-2 text-sm border ${
                        selectedSize === size
                          ? "border-indigo-600 bg-indigo-600 text-white"
                          : "border-gray-300 text-gray-700 hover:border-indigo-600"
                      } rounded-md transition-all duration-200`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <motion.div
                className="mb-4"
                style={{ marginTop: "1em" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <h3 className="text-sm font-medium text-gray-900 font-[PPS] mb-3">
                  Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-indigo-600 ring-2 ring-indigo-300"
                          : "border-gray-300 hover:border-gray-400"
                      } transition-all duration-200`}
                      style={{
                        backgroundColor: colorMap[color] || color.toLowerCase(),
                      }}
                      title={
                        color.charAt(0).toUpperCase() +
                        color.slice(1).toLowerCase()
                      }
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-base text-indigo-600 font-medium"
                  >
                    Selected: {selectedColor}
                  </motion.p>
                )}
              </motion.div>
            )}

            {/* Quantity selector */}
            <motion.div
              className="mb-6"
              style={{ marginTop: "1em" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <h3 className="text-sm font-medium text-gray-900 font-[PPS] mb-3">
                Quantity
              </h3>
              <div className="quantity-selector">
                <motion.button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  whileTap={{ scale: 0.9 }}
                >
                  -
                </motion.button>
                <span>{quantity}</span>
                <motion.button
                  onClick={() => handleQuantityChange(1)}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="action-buttons"
              style={{ marginTop: "1em" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              <motion.button
                ref={addButtonRef}
                onClick={handleAddToCart}
                disabled={!product.available}
                className={`add-to-cart`}
                whileHover={product.available ? { scale: 1.02 } : {}}
                whileTap={product.available ? { scale: 0.98 } : {}}
              >
                <AnimatePresence>
                  {isAddedToCart && (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="added-to-cart-overlay"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <FaCheck className="mr-2" />
                          Added
                        </motion.div>
                      </motion.div>

                      {/* Ripple effect */}
                      <motion.div
                        className="ripple-effect"
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                          borderRadius: "50%",
                          background:
                            "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
                        }}
                      />
                    </>
                  )}
                </AnimatePresence>
                {!isAddedToCart && (
                  <>
                    <FaShoppingCart />
                    {product.available ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </motion.button>

              <motion.button
                className="wishlist"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaHeart />
                Wishlist
              </motion.button>
            </motion.div>
          </div>

          {/* Product details accordion */}
          <div className="mt-6 border-t border-gray-200 pt-4 product-details-accordion">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <ProductAccordion title="Shipping & Returns" className="accordion-item">
                <p className="text-gray-600 accordion-content">
                  Free shipping on all orders over ₹50. Returns accepted within
                  30 days of delivery.
                </p>
              </ProductAccordion>

              <ProductAccordion title="Materials & Care" className="accordion-item">
                <p className="text-gray-600 accordion-content">
                  Please refer to the product description for material details.
                  Follow care instructions on the label.
                </p>
              </ProductAccordion>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Related products section could be added here */}
    </motion.div>
  );
};

// Accordion component for product details
const ProductAccordion = ({ title, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion-item ${className || ''}`}>
      <button
        className="accordion-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="accordion-content">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
