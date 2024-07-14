import http from "../utils/http";

export type BlogDetailType = {
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
  http.get<{ message: string; result: BlogDetailType }>(
    `post/post-detail/${id}`
  );

export type BlogType = {
  id: 2;
  title: string;
  content: string;
  creator_id: string;
  created_at: string;
  image: string;
};

export const getAllBlog = ({ limit, page }: { page: number; limit: number }) =>
  http.get<{
    message: string;
    result: {
      posts: BlogType[];
      total: number;
      limit: number;
      page: number;
      total_page: number;
    };
  }>(`post/all?limit=${limit}&page=${page}`);
