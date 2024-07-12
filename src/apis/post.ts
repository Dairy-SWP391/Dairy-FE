import http from "../utils/http";

export const addPost = (_data: {
  title: string;
  content: string;
  post_category: string;
  images: string[];
}) => http.post("post/add-post", _data);
