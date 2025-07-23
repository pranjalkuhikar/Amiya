import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import {
  useGetProductsQuery,
  useAddToCartMutation,
} from "../../features/apiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const CategoryPage = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [filters, setFilters] = useState({
    size: [],
    color: [],
    price: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [addToCart] = useAddToCartMutation();

  const filterOptions = {
    size: ["XS", "S", "M", "L", "XL"],
    color: ["white", "black", "blue", "beige"],
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

  // Handle add to cart
  const handleAddToCart = async (product) => {
    try {
      await addToCart({
        ...product,
        quantity: 1,
        price: parseFloat(product.price),
      }).unwrap();
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    let result = [...products];

    // Apply size filter
    if (filters.size.length > 0) {
      result = result.filter((product) =>
        filters.size.some((size) => product.sizes?.includes(size))
      );
    }

    // Apply color filter
    if (filters.color.length > 0) {
      result = result.filter((product) =>
        filters.color.some((color) => product.colors?.includes(color))
      );
    }

    // Apply price filter
    if (filters.price) {
      const priceRange = filters.price
        .split(" ")[0]
        .replace(/[^0-9-]/g, "")
        .split("-")
        .map((price) =>
          price === "Under" ? "0" : price === "Over" ? "1000" : price
        );

      const minPrice = parseFloat(priceRange[0]);
      const maxPrice = priceRange[1] ? parseFloat(priceRange[1]) : 1000;

      result = result.filter((product) => {
        const productPrice = parseFloat(product.price);
        return (
          productPrice >= minPrice &&
          (priceRange[1] ? productPrice <= maxPrice : true)
        );
      });
    }

    return result;
  }, [products, filters]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
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
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-20"
    >
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-50 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl md:text-5xl font-medium mb-4">
            New Collection
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto px-4">
            Discover our latest arrivals, designed for the modern lifestyle
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md"
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || (isClient && window.innerWidth >= 1024)) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:w-64 flex-shrink-0"
              >
                <div className="sticky top-24 bg-white p-6 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-medium">Filters</h2>
                    {filters.size.length > 0 || filters.color.length > 0 ? (
                      <button
                        onClick={() =>
                          setFilters({ size: [], color: [], price: null })
                        }
                        className="text-sm text-gray-600 hover:text-black"
                      >
                        Clear all
                      </button>
                    ) : null}
                  </div>

                  {/* Size Filter */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4">Size</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {filterOptions.size.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleFilter("size", size)}
                          className={`px-3 py-2 text-sm border ${
                            filters.size.includes(size)
                              ? "border-black bg-black text-white"
                              : "border-gray-200 hover:border-black"
                          } transition-colors duration-200`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-4">Color</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {filterOptions.color.map((color) => (
                        <button
                          key={color}
                          onClick={() => toggleFilter("color", color)}
                          className={`relative w-8 h-8 rounded-full border-2 ${
                            filters.color.includes(color)
                              ? "border-black"
                              : "border-transparent hover:border-gray-300"
                          } transition-colors duration-200`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="font-medium mb-4">Price</h3>
                    <div className="space-y-2">
                      {filterOptions.price.map((range) => (
                        <button
                          key={range}
                          onClick={() =>
                            setFilters((prev) => ({ ...prev, price: range }))
                          }
                          className={`w-full text-left px-3 py-2 text-sm ${
                            filters.price === range
                              ? "bg-black text-white"
                              : "text-gray-600 hover:bg-gray-50"
                          } rounded-md transition-colors duration-200`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">24 products</p>
              <select className="border-none bg-transparent focus:ring-0 text-sm">
                <option>Latest arrivals</option>
                <option>Price: Low to high</option>
                <option>Price: High to low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-md group hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                    <Link
                      to={`/product/${product.id}`}
                      className="block focus:outline-none"
                    >
                      <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                        <img
                          src={
                            product.image ||
                            "https://via.placeholder.com/300x400?text=Product+Image"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/300x400?text=Product+Image";
                          }}
                        />
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        <h3 className="text-lg font-semibold truncate mb-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${parseFloat(product.originalPrice).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="mt-2 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium shadow transition-all duration-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 focus:opacity-100 focus:translate-y-0"
                        tabIndex={0}
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                    <div className="absolute inset-0 pointer-events-none rounded-xl ring-2 ring-indigo-500 ring-opacity-0 group-hover:ring-opacity-10 transition-all duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryPage;
