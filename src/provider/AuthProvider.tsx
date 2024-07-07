import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import http from "../utils/http";

type AuthContextType = {
  token: {
    access_token: string | null;
    refresh_token: string | null;
  };
  addToken: ({
    access_token,
    refresh_token
  }: {
    access_token: string;
    refresh_token: string;
  }) => void;
  clearToken: () => void;
};

const initialToken = JSON.parse(
  localStorage.getItem("token") ||
    '{"access_token": null, "refresh_token": null}'
);

const AuthContext = createContext<AuthContextType>({
  token: initialToken,
  addToken: () => {},
  clearToken: () => {}
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<{
    access_token: string | null;
    refresh_token: string | null;
  }>(initialToken);

  http.defaults.headers.common.Authorization = `Bearer ${token.access_token}`;

  const addToken = ({
    access_token,
    refresh_token
  }: {
    access_token: string;
    refresh_token: string;
  }) => {
    setToken({ access_token, refresh_token });
    http.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    localStorage.setItem(
      "token",
      JSON.stringify({ access_token, refresh_token })
    );
  };

  const clearToken = () => {
    setToken({ access_token: null, refresh_token: null });
    delete http.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
  };

  const contextValue = useMemo(
    () => ({ token, addToken, clearToken }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
