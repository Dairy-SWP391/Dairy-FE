import { NextUIProvider } from "@nextui-org/react";
import { Suspense, lazy } from "react";
import "@styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import ThemeStyles from "@styles/theme";
import { ThemeProvider } from "styled-components";
import { useTheme } from "@contexts/themeContext";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "@contexts/sidebarContext";
import Sidebar from "@layout/Sidebar";
import Loader from "@components/Loader";
import { useWindowSize } from "react-use";
import AppBar from "@layout/AppBar";

const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const SalesAnalytics = lazy(() => import("@pages/SalesAnalytics"));

const App = () => {
  const { width } = useWindowSize();
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withSidebar = path !== "/login" && path !== "/404";
  return (
    <>
      <NextUIProvider>
        <SidebarProvider>
          <ThemeProvider theme={{ theme: theme }}>
            <ThemeStyles />
            <ToastContainer
              theme={theme}
              autoClose={2000}
              style={{ padding: "20px" }}
            />
            {width < 1280 && withSidebar && <AppBar />}
            <div className={`app ${!withSidebar ? "fluid" : ""}`}>
              {withSidebar && <Sidebar />}
              <div className="app_content">
                {width >= 1280 && withSidebar && <AppBar />}
                <Suspense fallback={<Loader />}>
                  <div className="main">
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/admin" element={<SalesAnalytics />} />
                      <Route path="/register" element={<Register />} />
                    </Routes>
                  </div>
                </Suspense>
              </div>
            </div>
          </ThemeProvider>
        </SidebarProvider>
      </NextUIProvider>
    </>
  );
};

export default App;
