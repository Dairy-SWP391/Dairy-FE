// export const registerApi = (_data: Omit<IRegisterForm, "agreeToTerms">) =>

import http from "../utils/http";

//   http.post<TokenResponse>("user/register", _data);
type TokenResponse = {
  message: string;
  result: {
    access_token: string;
    refresh_token: string;
  };
};

export const registerApi = (_data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => http.post<TokenResponse>("user/register", _data);

export const login = (_data: { email: string; password: string }) =>
  http.post<TokenResponse>("user/login", _data);

type GetMeResponse = {
  message: string;
  result: {
    created_at: Date;
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    phone_number: string;
    role: "MEMBER" | "ADMIN";
    status: "UNVERIFIED" | "VERIFIED";
    updated_at: Date;
    avatar_url: string;
  };
};

export const getMe = () => http.get<GetMeResponse>("user/me");

export const renewToken = (_data: { refresh_token: string }) =>
  http.post<TokenResponse>("user/refresh-token", _data);

export type AccountType = {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  point: number;
  role: "MEMBER" | "STAFF" | "ADMIN";
  status: "UNVERIFIED" | "VERIFIED" | "BANNED";
  ban_reason: string;
};

interface GetAllUserResponse {
  message: string;
  result: {
    total_page: number;
    total_account: number;
    users: AccountType[];
  };
}

export const getAllUser = (page: number) =>
  http.get<GetAllUserResponse>(`user/users?page=${page}`);

export const deleteUser = ({ user_id }: { user_id: string }) =>
  http.delete("user/delete-user", {
    data: {
      user_id
    }
  });

type getALlMessagesResponse = {
  message: string;
  result: {
    chatLines: {
      id: number | string;
      content: string;
      sender: "MEMBER" | "STAFF";
      created_at: number;
    }[];
    total: number;
    limit: number;
    page: number;
    total_page: number;
  };
};

export const getALlMessages = ({
  access_token,
  limit = 20,
  page
}: {
  access_token: string;
  limit?: number;
  page: number;
}) =>
  http.get<getALlMessagesResponse>(
    `conversations/me?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

export const getMessageByUser = ({
  access_token,
  limit = 20,
  page,
  user_id
}: {
  access_token: string;
  limit?: number;
  page: number;
  user_id: string;
}) =>
  http.get<getALlMessagesResponse>(
    `conversations/user/${user_id}?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

export const addWishlist = ({
  product_id,
  access_token
}: {
  product_id: number;
  access_token: string;
}) =>
  http.post(
    "user/add-wishlist",
    { product_id },
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

type UpdateMeProps = {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  avatar_url?: string;
  access_token: string;
};

type UpdateMeResponse = {
  message: string;
};

export const updateMe = ({
  access_token,
  first_name,
  last_name,
  phone_number,
  avatar_url
}: UpdateMeProps) =>
  http.patch<UpdateMeResponse>(
    "user/me",
    {
      avatar_url,
      first_name,
      last_name,
      phone_number
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

type GetAllAddressResponse = {
  message: string;
  result: AddressType[];
};

export type AddressType = {
  id: number;
  name: string;
  phone_number: string;
  address: string;
  default_address: boolean;
  province_id: number;
  district_id: number;
  ward_code: number;
  user_id: string;
};

export const getAllAddress = (access_token: string) =>
  http.get<GetAllAddressResponse>("user/addresses", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

export const addNewAddress = ({
  access_token,
  address
}: {
  access_token: string;
  address: Omit<AddressType, "id">;
}) =>
  http.post<{ message: string; result: AddressType }>(
    "user/add-address",
    address,
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }
  );

export const updateAddress = ({
  id,
  address,
  default_address,
  district_id,
  name,
  phone_number,
  province_id,
  ward_code
}: Omit<AddressType, "user_id">) =>
  http.patch("user/address", {
    id,
    name,
    phone_number,
    address,
    default_address,
    district_id,
    province_id,
    ward_code
  });

export const getDefaultAddress = (access_token: string) =>
  http.get<{ message: string; result: AddressType }>("user/default-address", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

export const callAccessToken = (refresh_token: string) =>
  http.post("user/refresh-token", {
    refresh_token
  });

export type CheckOutParams = {
  service_id: number;
  to_district_id: number;
  to_ward_code: number;
  receiver_name: string;
  voucher_code: string;
  phone_number: string;
  address: string;
  cart_list: {
    product_id: number;
    quantity: number;
  }[];
};

export const checkOut = ({
  address,
  cart_list,
  phone_number,
  receiver_name,
  service_id,
  to_district_id,
  voucher_code,
  to_ward_code
}: CheckOutParams) =>
  http.post<{ vnpayURL: string }>("pay", {
    address,
    cart_list,
    phone_number,
    voucher_code,
    receiver_name,
    service_id: service_id.toString(),
    to_district_id: to_district_id.toString(),
    to_ward_code: to_ward_code.toString()
  });

export type WishlistType = {
  id: number;
  name: string;
  image_urls: string[];
  category_id: number;
  ship_category_id: number;
  price: number;
  sale_price: number;
};

export type GetWishListResponse = {
  result: {
    totalPage: number;
    products: WishlistType[];
  };
  message: string;
};

export const getWishList = (page: number, num_of_items_per_page: number) =>
  http.get<GetWishListResponse>(
    `user/wishlist?num_of_items_per_page=${num_of_items_per_page}&page=${page}`
  );

export const removeFromWishlist = (product_id: number) =>
  http.delete(`user/delete-wishlist?product_id=${product_id}`);

export const getTotalExpense = () =>
  http.get<{ message: string; result: number }>("user/total");

export const banUser = ({
  user_id,
  reason,
  status = "banned"
}: {
  user_id: string;
  reason?: string;
  status?: "banned" | "verified";
}) => http.patch("user/update-user", { user_id, status, ban_reason: reason });

export const updateRole = ({
  id,
  role
}: {
  id: string;
  role: "MEMBER" | "STAFF" | "ADMIN";
}) => http.patch("user/role", { id, role });
