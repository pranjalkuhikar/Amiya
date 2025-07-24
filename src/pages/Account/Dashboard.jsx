import React, { useState } from "react";
import { User, Package, Heart, Clock, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Add sign-out logic here (e.g., clear tokens, user data)
    navigate("/login");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "history", label: "Order History", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    orders: [
      {
        id: "#1234",
        date: "2023-07-20",
        status: "Delivered",
        total: "₹209.00",
      },
      {
        id: "#1235",
        date: "2023-07-15",
        status: "In Transit",
        total: "₹159.00",
      },
    ],
    recentlyViewed: [
      {
        id: 1,
        name: "Classic White Shirt",
        price: "₹89",
        image: "/images/shirt1.jpg",
      },
      {
        id: 2,
        name: "Relaxed Fit Pants",
        price: "₹120",
        image: "/images/pant1.jpg",
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User size={32} className="text-gray-500" />
                </div>
                <h2 className="font-medium">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${
                        activeTab === item.id
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      } rounded-md transition-colors duration-200`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-9 space-y-8"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Orders", value: "12" },
                { label: "Wishlist Items", value: "8" },
                { label: "Total Spent", value: "₹1,234" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-medium mt-2">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-6">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200">
                      <th className="pb-4 font-medium">Order ID</th>
                      <th className="pb-4 font-medium">Date</th>
                      <th className="pb-4 font-medium">Status</th>
                      <th className="pb-4 font-medium">Total</th>
                      <th className="pb-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {user.orders.map((order) => (
                      <tr key={order.id}>
                        <td className="py-4">{order.id}</td>
                        <td className="py-4">{order.date}</td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4">{order.total}</td>
                        <td className="py-4">
                          <button className="text-sm text-gray-600 hover:text-black">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recently Viewed */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-6">Recently Viewed</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {user.recentlyViewed.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group flex gap-4 items-center"
                  >
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-gray-600 transition-colors duration-200">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600">{product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
