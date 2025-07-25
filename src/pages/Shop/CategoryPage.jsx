import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { useGetProductsQuery } from "../../features/apiSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "../../features/cartSlice";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    price: null,
  });
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
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

  // Debounce search query for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle navigation to product details
  const handleProductNavigation = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Handle add to cart with Redux
  const handleAddToCart = (product) => {
    // Check if product has sizes or colors that need to be selected
    const hasVariants =
      (product.sizes && product.sizes.length > 0) ||
      (product.colors && product.colors.length > 0);

    if (hasVariants) {
      // Redirect to product detail page for variant selection
      toast.info("Please select size and color options");
      handleProductNavigation(product.id);
      return;
    }

    // Add to cart using Redux (for products without variants)
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

    // Apply search filter
    if (debouncedSearchQuery.trim()) {
      result = result.filter(
        (product) =>
          product.name
            ?.toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(debouncedSearchQuery.toLowerCase())
      );
    }

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
  }, [products, filters, sortOption, currentPage, debouncedSearchQuery]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">
            <X size={32} />
          </div>
          <h2 className="error-title">Oops! Something went wrong</h2>
          <p className="error-message">
            We couldn't load the products. Please check your connection and try
            again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="main-container"
    >
      {/* Hero Section with Parallax Effect */}
      <div className="category-page hero-section">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <motion.h1
            className="heading hero-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            New Collection
          </motion.h1>
          <motion.p
            className="hero-description"
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
            className="hero-cta"
          ></motion.div>
        </motion.div>

        {/* Background pattern */}
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
      </div>

      <div className="content-wrapper">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-wrapper">
            <div className="search-icon">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`search-input ${
                searchQuery ? "has-clear-button" : ""
              }`}
              aria-label="Search products"
              role="searchbox"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="clear-button"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="mobile-filter-container">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="mobile-filter-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={showFilters ? "Hide filters" : "Show filters"}
            aria-expanded={showFilters}
          >
            <Filter size={18} />
            Filters
          </motion.button>
        </div>

        <div className="layout-container">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || (isClient && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="filter-sidebar"
              >
                <div
                  className="enhanced-filterbar"
                  style={{
                    boxShadow:
                      "0 10px 30px -10px rgba(0, 0, 0, 0.05) rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <div className="filter-header">
                    <h2 className="filter-title">
                      <Filter size={18} /> Filters
                    </h2>
                    {filters.size.length > 0 ||
                    filters.color.length > 0 ||
                    filters.price ? (
                      <motion.button
                        onClick={() =>
                          setFilters({ size: [], color: [], price: null })
                        }
                        className="clear-all-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Clear all
                      </motion.button>
                    ) : null}
                  </div>

                  {/* Size Filter */}
                  <div className="filter-section">
                    <h3 className="filter-section-title">Size</h3>
                    <div className="size-filter-grid">
                      {filterOptions.size.map((size) => (
                        <motion.button
                          key={size}
                          onClick={() => toggleFilter("size", size)}
                          className={`size-filter-button ${
                            filters.size.includes(size) ? "active" : "inactive"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="filter-section">
                    <h3 className="filter-section-title">Color</h3>
                    <div className="color-filter-grid">
                      {filterOptions.color.map((color) => (
                        <motion.button
                          key={color}
                          onClick={() => toggleFilter("color", color)}
                          className={`color-filter-button ${
                            filters.color.includes(color)
                              ? "active"
                              : "inactive"
                          }`}
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="filter-section">
                    <h3 className="filter-section-title">Price</h3>
                    <div className="price-filter-list">
                      {filterOptions.price.map((range) => (
                        <motion.button
                          key={range}
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, price: range }))
                          }
                          className={`enhanced-price-filter-button ${
                            filters.price === range ? "active" : "inactive"
                          }`}
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
          <div className="products-grid">
            <div className="products-header">
              <motion.p
                className="products-header-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              ></motion.p>
              <motion.select
                className="sort-select"
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

            <div className="products-container">
              {filteredProducts.length === 0 && (
                <motion.div
                  className="no-products-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="no-products-title">No products found</h3>
                  <p className="no-products-message">
                    Try adjusting your filters or search criteria
                  </p>
                  <button
                    onClick={() => {
                      setFilters({ size: [], color: [], price: null });
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="clear-all-filters-button"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
              <AnimatePresence>
                {filteredProducts.map((product, index) => {
                  return (
                    <motion.div
                      key={`${product.id}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="product-card"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div
                        className="product-card-container"
                        style={{
                          boxShadow:
                            "0 10px 30px -10px rgba(0, 0, 0, 0.05) rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        <div
                          onClick={() => handleProductNavigation(product.id)}
                          className="product-link"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="product-image-container">
                            <motion.img
                              src={
                                product.image ||
                                "https://placehold.co/300x400/ffffff/000000?text=Product+Image"
                              }
                              alt={product.name}
                              className="product-image"
                              layoutId={`product-image-${product.id}`}
                              loading="lazy"
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
                          <div className="product-overlay">
                            <motion.span className="overlay-text">
                              Quick View
                            </motion.span>
                          </div>
                        </div>

                        <div className="product-info">
                          <div
                            onClick={() => handleProductNavigation(product.id)}
                            className="product-link"
                            style={{ cursor: "pointer" }}
                          >
                            <h3 className="product-name">{product.name}</h3>
                          </div>
                          <div className="product-price-container">
                            <span className="product-price">
                              ₹{parseFloat(product.price).toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="product-original-price">
                                ₹{parseFloat(product.originalPrice).toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="product-actions">
                            <motion.button
                              onClick={() => handleAddToCart(product)}
                              className="add-to-cart-button"
                              whileTap={{ scale: 0.97 }}
                              style={{
                                boxShadow:
                                  "0 8px 16px -8px rgba(79, 70, 229, 0.3)",
                              }}
                              aria-label={`Add ${product.name} to cart`}
                            >
                              {addedProductIds[product?.id] ||
                              cartItems?.some(
                                (item) => item?.product?.id === product?.id
                              ) ? (
                                <>
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="cart-button-success-overlay"
                                  >
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.1 }}
                                      className="cart-button-success-content"
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
                              className="wishlist-button"
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
              <motion.div
                className="pagination-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="pagination-button nav-button"
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                >
                  ← Previous
                </motion.button>

                {Array.from(
                  { length: Math.ceil(products.length / productsPerPage) },
                  (_, i) => (
                    <motion.button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`pagination-button ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      {i + 1}
                    </motion.button>
                  )
                )}

                <motion.button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={
                    currentPage === Math.ceil(products.length / productsPerPage)
                  }
                  className="pagination-button nav-button"
                  whileHover={{
                    scale:
                      currentPage ===
                      Math.ceil(products.length / productsPerPage)
                        ? 1
                        : 1.05,
                  }}
                  whileTap={{
                    scale:
                      currentPage ===
                      Math.ceil(products.length / productsPerPage)
                        ? 1
                        : 0.95,
                  }}
                >
                  Next →
                </motion.button>
              </motion.div>
            )}

            {/* Pagination info */}
            {products.length > productsPerPage && (
              <motion.div
                className="pagination-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Showing {(currentPage - 1) * productsPerPage + 1} to{" "}
                {Math.min(currentPage * productsPerPage, products.length)} of{" "}
                {products.length} products
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage;
