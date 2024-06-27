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

export const getMe = (access_token: string) =>
  http.get<GetMeResponse>("user/me", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

export const renewToken = (_data: { refresh_token: string }) =>
  http.post<TokenResponse>("user/refresh-token", _data);

export type AccountType = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  point: number;
  role: "MEMBER" | "STAFF" | "ADMIN";
  status: "UNVERIFIED" | "VERIFIED";
};

interface GetAllUserResponse {
  message: string;
  result: AccountType[];
}

export const getAllUser = (access_token: string) =>
  http.get<GetAllUserResponse>("user/users", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

export const deleteUser = ({
  access_token,
  user_id
}: {
  access_token: string;
  user_id: string;
}) =>
  http.delete("user/delete-user", {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
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
  http.post("user/add-address", address, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

export const getDefaultAddress = (access_token: string) =>
  http.get<{ message: string; result: AddressType }>("user/default-address", {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
