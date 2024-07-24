import http from "../utils/http";

export type FeedbackType = {
  user_id: string;
  content: string;
  rating_point: number;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
};

export const getFeedbacks = (product_id: number) =>
  http.get<{ message: string; result: FeedbackType[] }>(
    `feedback/detail-feedback?product_id=${product_id}`
  );

export const sendFeedback = (data: {
  product_id: number;
  content: string;
  rating_point: number;
}) =>
  http.post<{ message: string; result: FeedbackType }>(
    "feedback/send-feekback",
    data
  );
