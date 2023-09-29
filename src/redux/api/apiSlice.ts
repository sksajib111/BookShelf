import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bookshelf-backend-blush.vercel.app/",
  }),
  tagTypes: [
    "books",
    "reviews",
    "editBooks",
    "postbooks",
    "postwishlist",
    "postreadinglist",
    "updateStatus",
  ],
  endpoints: () => ({}),
});
