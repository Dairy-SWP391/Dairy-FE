import { CategoryType } from "../store/category";
import { ProductType } from "../types/Product";
import http from "../utils/http";

type CategoryResponse = {
  message: string;
  data: CategoryType[];
};

export const getAllCategories = () =>
  http.get<CategoryResponse>("category/all");

export type SortType = "price" | "rating_point" | "sold" | "discount";

type GetProductByCateProps = {
  category_id?: number;
  num_of_product?: number;
  num_of_items_per_page?: number;
  page: number;
  sort_by?: SortType;
  order_by?: "ASC" | "DESC";
  parent_category_id: number;
};

type GetProductByCateResponse = {
  message: string;
  data: {
    products: ProductType[];
    totalPage: number;
  };
};

export const getProductByCategory = ({
  num_of_items_per_page,
  num_of_product,
  order_by,
  page,
  sort_by,
  category_id,
  parent_category_id
}: GetProductByCateProps) =>
  http.post<GetProductByCateResponse>(`product/get-product`, {
    category_id,
    num_of_product,
    num_of_items_per_page,
    page,
    sort_by,
    order_by,
    parent_category_id
  });
