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
  volume: number;
  weight: number;
  caution: string;
  images: ImageType[];
  preservation: string;
  description: string;
  instruction: string;
  category_id: number;
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
  starting_timestamp: string;
  ending_timestamp?: string;
};

export const addProduct = (product: AddProductParam) =>
  http.post("product/add-product", product);
