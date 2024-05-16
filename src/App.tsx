import { NextUIProvider } from "@nextui-org/react";
import { lazy } from "react";
import "@styles/index.scss";
import { Route, Routes } from "react-router-dom";
import ThemeStyles from "@styles/theme";
import { ThemeProvider } from "styled-components";
import { useTheme } from "@contexts/themeContext";

const Login = lazy(() => import("@pages/Login"));

const App = () => {
  const { theme } = useTheme();
  return (
    <>
      <NextUIProvider>
        <ThemeProvider theme={{ theme: theme }}>
          <ThemeStyles />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </NextUIProvider>
    </>
  );
};

export default App;
