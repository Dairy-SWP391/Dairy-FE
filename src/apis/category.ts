import { Category } from "../store/category";
import http from "../utils/http";

type CategoryResponse = {
  message: string;
  data: Category[];
};

export const getAllCategories = () =>
  http.get<CategoryResponse>("category/all");
