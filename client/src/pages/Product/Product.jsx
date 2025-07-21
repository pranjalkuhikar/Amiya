import React from "react";
import Loader from "../../components/Loader";
import { useGetProductsQuery } from "../../features/productsApi";

const Product = () => {
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10">
        <span className="text-xl text-primary font-bold" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          {error?.error || "Failed to fetch products"}
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10 py-12 px-4 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-black" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
        Shop Products
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray">No products found.</div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white/95 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray hover:shadow-2xl transition group"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              <div className="w-full h-48 bg-lightgray rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0].src}
                    alt={product.title}
                    className="object-cover w-full h-full rounded-xl"
                  />
                ) : (
                  <span className="text-gray text-6xl">🛍️</span>
                )}
              </div>
              <h2 className="text-xl font-bold mb-2 text-center text-black">{product.title}</h2>
              <p className="text-gray mb-2 text-center" dangerouslySetInnerHTML={{ __html: product.body_html }} />
              <span className="text-primary font-bold text-lg mb-4">
                {product.variants && product.variants[0] ? `₹${product.variants[0].price}` : ""}
              </span>
              <a href={`/product/${product.id}`} className="btn btn-primary">
                View Details
              </a>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Product;
