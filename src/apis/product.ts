import { ProductEditorForm } from "../pages/ProductEditor";
import { ImageType } from "../types/image";
import http from "../utils/http";

export type Product = {
  id: number;
  name: string;
  quantity: number;
  rating_number: number;
  rating_point: number;
  brand_id: number;
  brand: string;
  origin: string;
  producer: string;
  manufactured_at: string;
  target: string;
  image_urls: string[];
  volume: number;
  weight: number;
  caution: string;
  images: ImageType[];
  preservation: string;
  description: string;
  instruction: string;
  category_id: number;
  parent_category_id: number;
  price: number;
  sale_price: number;
  starting_timestamp: Date;
  ending_timestamp: Date;
};

type ProductResponse = {
  message: string;
  data: Product;
};

export const getProductDetail = (id: string) =>
  http.get<ProductResponse>(`product/${id}`);

type AddProductParam = Omit<
  ProductEditorForm,
  "starting_timestamp" | "ending_timestamp"
> & {
  starting_timestamp?: string;
  ending_timestamp?: string;
};

export const addProduct = (product: AddProductParam) =>
  http.post("product/add-product", product);

export const updateProduct = (product: AddProductParam & { id: number }) =>
  http.patch("product/me", product);

export const addWishList = (product_id: number) =>
  http.post("user/add-wishlist", {
    product_id
  });

export const convertCart = (cart: { id: number; quantity: number }[]) =>
  http.post<{
    message: string;
    result: {
      products: {
        id: number;
        name: string;
        quantity: number;
        image_url: string[];
        price: number;
        sale_price: number;
      }[];
    };
  }>("cart/cart", cart);

export const searchProduct = ({
  // num_of_items_per_page,
  page,
  query
}: {
  // num_of_items_per_page: number;
  page: number;
  query: string;
}) =>
  http.get<{
    message: string;
    data: {
      totalPage: number;
      products: Product[];
    };
  }>(`product/search-product?page=${page}&search=${query}`);

export const getBrandName = (product_id: number) =>
  http.get<{
    message: string;
    data: {
      id: number;
      name: string;
    };
  }>(`product/brand_name/${product_id}`);
