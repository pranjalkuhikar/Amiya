import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import { useGetProductsQuery } from "../../features/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingCart, FaHeart, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { selectIsDarkMode } from "../../features/themeSlice";

const CategoryPage = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    price: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState({});
  
  // Use Redux instead of Context API
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle add to cart with Redux
  const handleAddToCart = (product) => {
    // Add to cart using Redux
    dispatch(addToCart({
      product,
      selectedSize: "",
      selectedColor: "",
      quantity: 1
    }));
    
    // Show animation
    setAddedProductIds(prev => ({
      ...prev,
      [product.id]: true
    }));
    
    // Reset animation after delay
    setTimeout(() => {
      setAddedProductIds(prev => ({
        ...prev,
        [product.id]: false
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
    price: ["Under $50", "$50-$100", "$100-$200", "Over $200"],
  };

  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products) || products.length === 0) {
      console.log("No products available or invalid products array");
      return [];
    }

    console.log("All products:", products);
    console.log("Current filters:", filters);

    let result = [...products];

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
      console.log("After size filter:", result.length, "products");
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
      console.log("After color filter:", result.length, "products");
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

        console.log("After price filter:", result.length, "products");
      } catch (error) {
        console.error("Error applying price filter:", error);
      }
    }

    return result;
  }, [products, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error loading products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 pt-20"
    >
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[50vh] bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <motion.h1
            className="text-4xl md:text-8xl font-light mb-6 font-[PPMori]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            New Collection
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-lg"
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
          >
            <Link
              to="/shop"
              className="inline-block px-8 py-3 border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-800 transition-all duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: isDarkMode ? 
              'radial-gradient(circle, #fff 1px, transparent 1px)' : 
              'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-8">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors duration-300"
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
                <div className="sticky top-24 bg-white dark:bg-gray-800 p-8 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm backdrop-blur-sm dark:backdrop-blur-md"
                  style={{
                    boxShadow: isDarkMode ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
                    background: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)'
                  }}>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-medium text-lg dark:text-gray-100">Filters</h2>
                    {filters.size.length > 0 || filters.color.length > 0 || filters.price ? (
                      <motion.button
                        onClick={() =>
                          setFilters({ size: [], color: [], price: null })
                        }
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear all
                      </motion.button>
                    ) : null}
                  </div>

                  {/* Size Filter */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">Size</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {filterOptions.size.map((size) => (
                        <motion.button
                          key={size}
                          onClick={() => toggleFilter("size", size)}
                          className={`px-3 py-2 text-sm border ${
                            filters.size.includes(size)
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-500"
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
                    <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">Color</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {filterOptions.color.map((color) => (
                        <motion.button
                          key={color}
                          onClick={() => toggleFilter("color", color)}
                          className={`relative w-8 h-8 rounded-full border-2 ${
                            filters.color.includes(color)
                              ? "border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-700"
                              : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
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
                    <h3 className="font-medium mb-4 text-gray-900 dark:text-gray-100">Price</h3>
                    <div className="space-y-2">
                      {filterOptions.price.map((range) => (
                        <motion.button
                          key={range}
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, price: range }))
                          }
                          className={`w-full text-left px-4 py-2.5 text-sm ${
                            filters.price === range
                              ? "bg-indigo-600 text-white rounded-lg"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
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
          <div className="flex-1">
            <div className="flex justify-between items-center mb-10">
              <motion.p
                className="text-gray-600 dark:text-gray-400 font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {filteredProducts.length} products
              </motion.p>
              <motion.select
                className="border-none bg-transparent focus:ring-0 text-sm text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <option>Latest arrivals</option>
                <option>Price: Low to high</option>
                <option>Price: High to low</option>
              </motion.select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative bg-white dark:bg-gray-800 overflow-hidden rounded-xl"
                    style={{
                      boxShadow: isDarkMode ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : '0 10px 30px -10px rgba(0, 0, 0, 0.05)'
                    }}>
                    <Link
                      to={`/product/${product.id}`}
                      className="block focus:outline-none"
                    >
                      <div className="w-full aspect-[3/4] bg-gray-50 dark:bg-gray-700 overflow-hidden">
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
                      <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20 transition-all duration-300">
                        <motion.span
                          className="px-6 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          Quick View
                        </motion.span>
                      </div>
                    </Link>
                    
                    <div className="pt-4 pb-1 px-1">
                      <Link
                        to={`/product/${product.id}`}
                        className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <h3 className="text-base font-light text-gray-900 dark:text-gray-100 mb-1 font-[PPMori]">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base font-[PPMori] text-gray-900 dark:text-gray-100">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${parseFloat(product.originalPrice).toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 dark:bg-indigo-700 text-white py-2 px-3 rounded-full text-sm font-medium relative overflow-hidden"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            boxShadow: isDarkMode ? '0 8px 16px -8px rgba(79, 70, 229, 0.5)' : '0 8px 16px -8px rgba(79, 70, 229, 0.3)'
                          }}
                        >
                          {addedProductIds[product.id] ? (
                            <>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 bg-green-500 dark:bg-green-600 flex items-center justify-center"
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.1 }}
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
                                  borderRadius: '50%',
                                  background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)'
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
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            boxShadow: isDarkMode ? '0 5px 15px -5px rgba(79, 70, 229, 0.3)' : '0 5px 15px -5px rgba(79, 70, 229, 0.1)'
                          }}
                        >
                          <FaHeart size={14} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Empty state */}
            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => setFilters({ size: [], color: [], price: null })}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
            
            {/* Pagination placeholder */}
            {filteredProducts.length > 0 && (
              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors">
                    &laquo;
                  </button>
                  <button className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors">
                    3
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors">
                    &raquo;
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage;
