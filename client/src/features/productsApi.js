import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://amiya.com/collections/all/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products.json",
      transformResponse: (response) => response.products || [],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
