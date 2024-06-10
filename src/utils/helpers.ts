/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useCategoryStore } from "../store/category";

export const sortProducts = (products: any[], sort: string) => {
  switch (sort) {
    default:
    case "best-selling":
      return products.sort(
        (a: { sold: number }, b: { sold: number }) => b.sold - a.sold
      );
    case "available":
      return products.sort(
        (a: { in_stock: number }, b: { in_stock: number }) =>
          b.in_stock - a.in_stock
      );
    case "price-low-to-high":
      return products.sort(
        (a: { regular_price: number }, b: { regular_price: number }) =>
          a.regular_price - b.regular_price
      );
    case "price-high-to-low":
      return products.sort(
        (a: { regular_price: number }, b: { regular_price: number }) =>
          b.regular_price - a.regular_price
      );
  }
};
