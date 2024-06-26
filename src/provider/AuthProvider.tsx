import { ReactNode, createContext, useContext, useMemo, useState } from "react";

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

  const addToken = ({
    access_token,
    refresh_token
  }: {
    access_token: string;
    refresh_token: string;
  }) => {
    setToken({ access_token, refresh_token });
    // axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    localStorage.setItem(
      "token",
      JSON.stringify({ access_token, refresh_token })
    );
  };

  const clearToken = () => {
    setToken({ access_token: null, refresh_token: null });
    // delete axios.defaults.headers.common.Authorization;
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
