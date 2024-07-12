import http from "../utils/http";

export type GetOrderDetailResponse = {
  message: string;
  data: {
    id: number;
    user_id: string;
    estimate_price: number;
    ship_fee: number;
    end_price: number;
    status: "SUCCESS";
    created_at: string;
    discount: number;
    receiver_name: string;
    phone_number: string;
    address: string;
    service_id: number;
    to_district_id: number;
    to_ward_code: number;
    transaction_no: number;
    bank_code: string;
    amount: number;
    card_type: string;
    bank_tran_no: string;
    description: string;
    time_stamp: string;
    order_detail: {
      product_id: number;
      quantity: number;
      price: number;
      sale_price: number;
      product_name: string;
    }[];
    order_ghn_code: string;
    expected_delivery_time: string;
  };
};

export const getOrderDetail = (order_id: number) =>
  http.get(`order/detail/${order_id}`);

export type OrderType = {
  id: number;
  user_id: string;
  estimate_price: number;
  ship_fee: number;
  end_price: number;
  status: "PENDING" | "SUCCESS";
  created_at: string;
  discount: number;
  receiver_name: string;
  phone_number: string;
  address: string;
  service_id: number;
  to_district_id: number;
  to_ward_code: number;
};

export const getAllOrder = () =>
  http.get<{ message: string; data: OrderType[] }>("order/all");

type GetOrderPerMonthResponse = {
  message: string;
  result: {
    [key: number]: number;
  };
};

export const getExpensePerMonth = () =>
  http.get<GetOrderPerMonthResponse>("user/total-per-month");
