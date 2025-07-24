import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // Products endpoints
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
      transformResponse: (response) => {
        // Transform the response to match the expected format
        return response.map(product => {
          // Extract sizes from variants
          const sizes = [...new Set(product.variants.map(variant =>
            variant.option2 || variant.option1).filter(Boolean))];
          
          // Extract colors from variants
          const colors = [...new Set(product.variants.map(variant =>
            variant.option1 !== "S" && variant.option1 !== "M" && variant.option1 !== "L" &&
            variant.option1 !== "S/M" && variant.option1 !== "M/L" ?
            variant.option1 : (variant.option2 || "")).filter(Boolean))];
          
          // Get the first variant's price
          const price = product.variants[0]?.price || "0";
          
          // Get the first image URL
          const image = product.images[0]?.src || "";
          
          return {
            id: product.id,
            name: product.title,
            price,
            sizes,
            colors,
            image,
            originalPrice: null, // No original price in the data
            description: product.body_html,
            variants: product.variants,
          };
        });
      },
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
      transformResponse: (response) => {
        if (!response) return null;
        
        // Extract sizes from variants
        const sizes = [...new Set(response.variants.map(variant =>
          variant.option2 || variant.option1).filter(Boolean))];
        
        // Extract colors from variants
        const colors = [...new Set(response.variants.map(variant =>
          variant.option1 !== "S" && variant.option1 !== "M" && variant.option1 !== "L" &&
          variant.option1 !== "S/M" && variant.option1 !== "M/L" ?
          variant.option1 : (variant.option2 || "")).filter(Boolean))];
        
        // Get all images
        const images = response.images.map(img => img.src);
        
        return {
          id: response.id,
          name: response.title,
          price: response.variants[0]?.price || "0",
          sizes,
          colors,
          image: images[0] || "",
          images,
          originalPrice: null,
          description: response.body_html,
          variants: response.variants,
          available: response.variants.some(v => v.available)
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = apiSlice;
