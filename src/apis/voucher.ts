import http from "../utils/http";

export type VoucherType = {
  id: number;
  code: string;
  value: number;
  trading_point: number;
  created_at: string;
  expired_at: string;
  status: "ACTIVE" | "INACTIVE";
  quantity: number;
};

export const getAllVouchers = ({
  limit,
  page,
  status
}: {
  limit: number;
  page: number;
  status?: "ACTIVE" | "INACTIVE";
}) =>
  http.get<{
    message: string;
    data: {
      total: number;
      total_page: number;
      page: number;
      limit: number;
      items: VoucherType[];
    };
  }>(
    `/voucher/all?limit=${limit}&page=${page}${status ? `&status=${status}` : ""}`
  );

export const updateVoucher = (data: Omit<VoucherType, "created_at" | "code">) =>
  http.patch("/voucher", data);

export const addVoucher = (data: Omit<VoucherType, "created_at" | "id">) =>
  http.post("/voucher", data);
