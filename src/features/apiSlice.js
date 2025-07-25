import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://amiya-data.vercel.app" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // Products endpoints
    getProducts: builder.query({
      query: () => "/products.json",
      providesTags: ["Product"],
      transformResponse: (response) => {
        // Transform the response to match the expected format
        return response.products.map(product => {
          // Extract sizes from variants
          const sizes = [
            ...new Set(
              product.variants
                .map((variant) => variant.option2 || variant.option1)
                .filter(Boolean)
            ),
          ];

          // Extract colors from variants
          const colors = [
            ...new Set(
              product.variants
                .map((variant) =>
                  variant.option1 !== "S" &&
                  variant.option1 !== "M" &&
                  variant.option1 !== "L" &&
                  variant.option1 !== "S/M" &&
                  variant.option1 !== "M/L"
                    ? variant.option1
                    : variant.option2 || ""
                )
                .filter(Boolean)
            ),
          ];

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
      query: () => "/products.json",
      providesTags: (result, error, id) => [{ type: "Product", id }],
      transformResponse: (response, _, id) => {
        if (!response) return null;
        const productIdNum = Number(id);
        const product = response.products.find(p => p.id === productIdNum);
        if (!product) return null;

        // Extract sizes from variants
        const sizes = [
          ...new Set(
            product.variants
              .map((variant) => variant.option2 || variant.option1)
              .filter(Boolean)
          ),
        ];

        // Extract colors from variants
        const colors = [
          ...new Set(
            product.variants
              .map((variant) =>
                variant.option1 !== "S" &&
                product.option1 !== "M" &&
                product.option1 !== "L" &&
                product.option1 !== "S/M" &&
                product.option1 !== "M/L"
                  ? variant.option1
                  : variant.option2 || ""
              )
              .filter(Boolean)
          ),
        ];

        // Get all images
        const images = product.images.map((img) => img.src);

        return {
          id: product.id,
          name: product.title,
          price: product.variants[0]?.price || "0",
          sizes,
          colors,
          image: images[0] || "",
          images,
          originalPrice: null,
          description: product.body_html,
          variants: product.variants,
          available: product.variants.some((v) => v.available),
        };
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice;
