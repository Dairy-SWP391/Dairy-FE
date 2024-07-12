import http from "../utils/http";

export type ChatRooms = {
  id: 4;
  member_id: string;
  staff_id: string;
  created_at: string;
  updated_at: string;
};

export const getAllChatRooms = () =>
  http.get<{
    message: string;
    result: ChatRooms[];
  }>("conversations/all");
