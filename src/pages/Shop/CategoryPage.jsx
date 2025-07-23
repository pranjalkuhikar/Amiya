import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

const CategoryPage = () => {
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

  // Mock product data
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "$89",
      image: "/images/shirt1.jpg",
      colors: ["white"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 2,
      name: "Relaxed Fit Pants",
      price: "$120",
      image: "/images/pant1.jpg",
      colors: ["black"],
      sizes: ["M", "L", "XL"],
    },
  ];

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="group">
                    <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
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
