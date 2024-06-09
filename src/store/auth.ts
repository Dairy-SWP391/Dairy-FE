import { create } from "zustand";

export type Authentication = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  role: "ADMIN" | "MEMBER";
  status: "UNVERIFIED" | "VERIFIED";
  access_token: string;
  exp: Date;
  iat: Date;
  avatar_url: string;
};

type AuthStore = {
  auth: Authentication | null;
  setAuth: (auth: Authentication | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  setAuth: (auth) => set({ auth })
}));
