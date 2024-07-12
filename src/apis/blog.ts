import http from "../utils/http";

export type BlogType = {
  id: number;
  title: string;
  content: string;
  creator_id: string;
  created_at: string;
  category: string;
  category_description: string | null;
  category_id: number;
};

export const getBlogDetail = (id: number) =>
  http.get<{ message: string; result: BlogType }>(`post/post-detail/${id}`);
