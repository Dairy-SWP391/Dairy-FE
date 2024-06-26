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

type UpdateMeProps = {
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar_url: string;
};

export const updateMe = (_data: UpdateMeProps) => http.patch("user/me", _data);

export const renewToken = (_data: { refresh_token: string }) =>
  http.post<TokenResponse>("user/refresh-token", _data);
