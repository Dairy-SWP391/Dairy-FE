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
    // avatar_url: string;
  };
};

export const getMe = (_data: { access_token: string }) =>
  http.get<GetMeResponse>("user/me", {
    headers: { Authorization: `Bearer ${_data.access_token}` }
  });
