import http from "../utils/http";

export type ChatRooms = {
  id: number;
  member: {
    id: string;
    first_name: string;
    last_name: string;
  };
  staff: {
    id: string;
    first_name: string;
    last_name: string;
  };
  created_at: string;
  updated_at: string;
  ChatLine: {
    content: string;
    created_at: string;
    sender: string;
  }[];
};

export const getAllChatRooms = () =>
  http.get<{
    message: string;
    result: ChatRooms[];
  }>("conversations/all");
