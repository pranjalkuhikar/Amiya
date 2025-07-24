import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useGetProductsQuery } from "../../features/apiSlice";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../features/cartSlice";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    price: null,
  });
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const [showFilters, setShowFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState({});

  // Use Redux instead of Context API
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle add to cart with Redux
  const handleAddToCart = (product) => {
    // Add to cart using Redux
    dispatch(
      addToCart({
        product,
        selectedSize: "",
        selectedColor: "",
        quantity: 1,
      })
    );

    // Show animation
    setAddedProductIds((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    // Reset animation after delay
    setTimeout(() => {
      setAddedProductIds((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }, 2000);
  };

  const filterOptions = {
    size: ["XS", "S", "M", "L", "XL"],
    color: [
      "white",
      "black",
      "blue",
      "beige",
      "red",
      "green",
      "yellow",
      "pink",
      "purple",
      "brown",
      "gray",
    ],
    price: ["Under ₹50", "₹50-₹100", "₹100-₹200", "Over ₹200"],
  };

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      if (type === "price") {
        return {
          ...prev,
          price: prev.price === value ? null : value, // Toggle price filter
        };
      } else {
        return {
          ...prev,
          [type]: prev[type].includes(value)
            ? prev[type].filter((item) => item !== value)
            : [...prev[type], value],
        };
      }
    });
  };

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      console.log("No products available or invalid products array");
      return [];
    }

    let result = [...products];

    // Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    // Apply size filter

    // Apply size filter
    if (filters.size && filters.size.length > 0) {
      console.log("Filtering by sizes:", filters.size);
      result = result.filter((product) => {
        if (!product.sizes || !Array.isArray(product.sizes)) {
          console.log(
            `Product ${product.name || product.id} has no sizes array`
          );
          return false;
        }
        const matches = filters.size.some((size) =>
          product.sizes
            .map((s) => s?.toUpperCase())
            .includes(size?.toUpperCase())
        );
        console.log(
          `Product ${product.name} sizes:`,
          product.sizes,
          "matches:",
          matches
        );
        return matches;
      });
    }

    // Apply color filter
    if (filters.color && filters.color.length > 0) {
      console.log("Filtering by colors:", filters.color);
      result = result.filter((product) => {
        if (!product.colors || !Array.isArray(product.colors)) {
          console.log(
            `Product ${product.name || product.id} has no colors array`
          );
          return false;
        }
        const matches = filters.color.some((color) =>
          product.colors
            .map((c) => c?.toLowerCase())
            .includes(color?.toLowerCase())
        );
        console.log(
          `Product ${product.name} colors:`,
          product.colors,
          "matches:",
          matches
        );
        return matches;
      });
    }

    // Apply price filter
    if (filters.price) {
      console.log("Filtering by price:", filters.price);
      try {
        const priceRange = filters.price
          .split(" ")[0]
          .replace(/[^0-9-]/g, "")
          .split("-")
          .map((price) =>
            price === "Under" ? "0" : price === "Over" ? "1000" : price
          );

        const minPrice = parseFloat(priceRange[0]) || 0;
        const maxPrice = priceRange[1]
          ? parseFloat(priceRange[1]) || 1000
          : 1000;

        result = result.filter((product) => {
          const productPrice = parseFloat(product.price) || 0;
          const isInRange =
            productPrice >= minPrice &&
            (priceRange[1] ? productPrice <= maxPrice : true);

          console.log(
            `Product ${product.name} price:`,
            productPrice,
            `Range: ${minPrice}-${maxPrice}`,
            "matches:",
            isInRange
          );

          return isInRange;
        });
      } catch (error) {
        console.error("Error applying price filter:", error);
      }
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = result.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return currentProducts;
  }, [products, filters, sortOption, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          className="w-16 h-16 border-t-4 border-indigo-600 border-solid rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            Error loading products
          </h2>
          <p className="text-gray-600 ">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white  pt-20 font-[PPR]"
    >
      {/* Hero Section with Parallax Effect */}
      <div className="category-page relative bg-gray-50 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <motion.h1
            className="heading text-4xl md:text-8xl font-light tracking-tight mb-6 font-[PPMori] pt-80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            New Collection
          </motion.h1>
          <motion.p
            className="text-gray-900  max-w-xl mx-auto text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our latest arrivals, designed for the modern lifestyle
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8"
          ></motion.div>
        </motion.div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 00 "></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
      </div>

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-8 mx-10">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="mobile-filter-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter size={18} />
            Filters
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || (isClient && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:w-72 flex-shrink-0"
              >
                <div
                  className="sticky filterbar top-24 bg-white p-8 border border-gray-100 00 rounded-2xl shadow-sm backdrop-blur-sm -md"
                  style={{
                    boxShadow:
                      "0 10px 30px -10px rgba(0, 0, 0, 0.05) rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-medium flex gap-2 text-lg ">
                      <Filter size={18} /> Filters
                    </h2>
                    {filters.size.length > 0 ||
                    filters.color.length > 0 ||
                    filters.price ? (
                      <motion.button
                        onClick={() =>
                          setFilters({ size: [], color: [], price: null })
                        }
                        className="text-sm text-indigo-600 00 hover:text-indigo-800 digo-300 font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear all
                      </motion.button>
                    ) : null}
                  </div>

                  {/* Size Filter */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4 text-gray-900 ">Size</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {filterOptions.size.map((size) => (
                        <motion.button
                          key={size}
                          onClick={() => toggleFilter("size", size)}
                          className={`px-3 py-2 text-sm border text-center ${
                            filters.size.includes(size)
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-gray-200 00 text-gray-700  hover:border-indigo-300 indigo-500 bg-gray-50"
                          } rounded-md transition-colors duration-200`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4 text-gray-900 ">Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {filterOptions.color.map((color) => (
                        <motion.button
                          key={color}
                          onClick={() => toggleFilter("color", color)}
                          className={`relative w-8 h-8 rounded-full border-2 ${
                            filters.color.includes(color)
                              ? "border-indigo-600 -400 ring-2 ring-indigo-200 00"
                              : "border-transparent hover:border-gray-300 gray-600"
                          } transition-colors duration-200`}
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="font-medium mb-4 text-gray-900 ">Price</h3>
                    <div className="price space-y-2">
                      {filterOptions.price.map((range) => (
                        <motion.button
                          key={range}
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, price: range }))
                          }
                          className={`price-filter-button w-full text-left px-8 py-2.5 text-sm ${
                            filters.price === range
                              ? "bg-indigo-600 text-white rounded-lg"
                              : "text-gray-700  hover:bg-gray-50 -700 rounded-lg bg-gray-50"
                          } transition-colors duration-200`}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {range}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 overflow-hidden space-y-10">
            <div className="latest p-10 flex justify-between items-center mb-20 mt-20">
              <motion.p
                className="text-gray-900 font-[PPR] font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              ></motion.p>
              <motion.select
                className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 hover:border-indigo-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all duration-200 cursor-pointer shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="latest">Latest arrivals</option>
                <option value="price-asc">Price: Low to high</option>
                <option value="price-desc">Price: High to low</option>
              </motion.select>
            </div>

            <div className="product py-80 flex flex-wrap justify-between gap-8">
              {filteredProducts.length === 0 && (
                <motion.div
                  className="text-center px-4 py-16 h-full w-full gap-5 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-medium text-gray-900  mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600  mb-6">
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={() => {
                      setFilters({ size: [], color: [], price: null });
                      setCurrentPage(1);
                    }}
                    className="clear px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
              <AnimatePresence>
                {filteredProducts.map((product, index) => {
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1rem)] group font-[PPR]"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className="relative bg-white overflow-hidden rounded-xl"
                        style={{
                          boxShadow:
                            "0 10px 30px -10px rgba(0, 0, 0, 0.05) rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        <Link
                          to={`/product/${product.id}`}
                          className="block focus:outline-none"
                        >
                          <div className="w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                            <motion.img
                              src={
                                product.image ||
                                "https://placehold.co/300x400/ffffff/000000?text=Product+Image"
                              }
                              alt={product.name}
                              className="w-full h-full object-cover object-center"
                              layoutId={`product-image-${product.id}`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/300x400/ffffff/000000?text=Product+Image";
                              }}
                            />
                          </div>

                          {/* Quick shop overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-all duration-300">
                            <motion.span className="px-6 py-2.5 bg-white text-gray-900  rounded-full text-sm font-medium transform translate-y-4 transition-transform duration-300">
                              Quick View
                            </motion.span>
                          </div>
                        </Link>

                        <div className="pt-4 pb-1 px-1">
                          <Link
                            to={`/product/${product.id}`}
                            className="block hover:text-indigo-600 digo-400 transition-colors"
                          >
                            <h3 className="text-base font-[PPR] font-light text-gray-900  mb-1">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-base font-[PPR] text-gray-900 ">
                              ₹{parseFloat(product.price).toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500  line-through">
                                ₹{parseFloat(product.originalPrice).toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex gap-2 mt-3 transition-opacity duration-300">
                            <motion.button
                              onClick={() => handleAddToCart(product)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600  text-white py-2 px-3 rounded-full text-sm font-medium relative overflow-hidden"
                              whileTap={{ scale: 0.97 }}
                              style={{
                                boxShadow:
                                  "0 8px 16px -8px rgba(79, 70, 229, 0.3)",
                              }}
                            >
                              {addedProductIds[product?.id] ||
                              cartItems?.some(
                                (item) => item?.product?.id === product?.id
                              ) ? (
                                <>
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 bg-green-500 flex items-center justify-center"
                                  >
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.1 }}
                                      className="flex items-center justify-center gap-2"
                                    >
                                      <FaCheck size={14} className="mr-1" />
                                      Added
                                    </motion.div>
                                  </motion.div>

                                  {/* Ripple effect */}
                                  <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    initial={{ scale: 0, opacity: 0.8 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    style={{
                                      borderRadius: "50%",
                                      background:
                                        "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <FaShoppingCart size={14} />
                                  Add to Cart
                                </>
                              )}
                            </motion.button>
                            <motion.button
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 00 text-gray-600  hover:border-indigo-300 indigo-500 hover:text-indigo-600 digo-400 transition-colors"
                              whileTap={{ scale: 0.9 }}
                              style={{
                                boxShadow:
                                  "0 5px 15px -5px rgba(79, 70, 229, 0.1)",
                              }}
                            >
                              <FaHeart size={14} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination controls */}
            {products.length > productsPerPage && (
              <div className="flex justify-center mt-8 pagination-controls page">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="pagination-button disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from(
                  { length: Math.ceil(products.length / productsPerPage) },
                  (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`pagination-button ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    currentPage === Math.ceil(products.length / productsPerPage)
                  }
                  className="pagination-button disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage;
