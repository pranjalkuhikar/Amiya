import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../features/cartSlice";
import { useGetProductsQuery } from "../../../features/productsApi";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [selectedVariant, setSelectedVariant] = React.useState(0);
  const { data: products = [], isLoading, isError, error } = useGetProductsQuery();

  const product = products.find((p) => String(p.id) === String(id));

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10">
        <span className="text-xl text-primary font-bold" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          {error?.error || "Failed to fetch product"}
        </span>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10">
        <span className="text-xl text-gray font-bold" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          Product not found.
        </span>
      </div>
    );
  }

  const images = product.images || [];
  const variants = product.variants || [];
  const mainImage = images[selectedImage]?.src || null;
  const price = variants[selectedVariant]?.price || "";
  const variantOptions = product.options || [];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id + (variants[selectedVariant]?.id ? `-${variants[selectedVariant].id}` : ""),
        title: product.title + (variants[selectedVariant]?.title ? ` (${variants[selectedVariant].title})` : ""),
        price,
        image: mainImage,
        quantity: 1,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-lightgray to-primary/10 py-12 px-4 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white/95 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-12 border border-gray">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-xs aspect-square bg-lightgray rounded-2xl flex items-center justify-center overflow-hidden mb-4 border border-gray">
            {mainImage ? (
              <img src={mainImage} alt={product.title} className="object-cover w-full h-full rounded-2xl" />
            ) : (
              <span className="text-gray text-7xl">🛍️</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  className={`btn btn-icon ${selectedImage === idx ? "bg-primary/10" : ""}`}
                  onClick={() => setSelectedImage(idx)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img.src} alt={`Thumbnail ${idx + 1}`} className="w-10 h-10 object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-center" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          <h1 className="text-3xl font-extrabold mb-4 text-black">{product.title}</h1>
          <span className="text-primary font-bold text-2xl mb-2 block">₹{price}</span>
          {/* Variant Selector */}
          {variantOptions.length > 0 && variants.length > 1 && (
            <div className="mb-4">
              {variantOptions.map((option) => (
                <div key={option.name} className="mb-2">
                  <span className="font-semibold text-black mr-2">{option.name}:</span>
                  <div className="flex gap-2 flex-wrap mt-1">
                    {variants.map((variant, vIdx) => (
                      <button
                        key={variant.id}
                        className={`btn btn-sm ${selectedVariant === vIdx ? "btn-primary" : "btn-secondary"}`}
                        onClick={() => setSelectedVariant(vIdx)}
                        aria-label={`Select ${variant.title}`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-gray mb-6" dangerouslySetInnerHTML={{ __html: product.body_html }} />
          <button
            className={`btn ${added ? "btn-secondary" : "btn-primary"} btn-lg btn-full`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
