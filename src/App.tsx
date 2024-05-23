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
import NavBar from "@layout/NavBar";

const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const SalesAnalytics = lazy(() => import("@pages/SalesAnalytics"));
const Homepage = lazy(() => import("@pages/Homepage"));
const Product = lazy(() => import("@pages/Product"));
// const Cart = lazy(() => import("@pages/Cart"));

const App = () => {
  const { width } = useWindowSize();
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withAdminbar = path === "/admin" || path === "/product-editor";
  const withSidebar =
    path !== "/admin" &&
    path !== "/login" &&
    path !== "/register" &&
    path !== "/product-editor";
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
            {width < 1280 && withAdminbar && <AppBar />}
            {width < 1280 && withSidebar && <NavBar />}
            <div className={`app ${!withAdminbar ? "fluid" : ""}`}>
              {withAdminbar && <Sidebar />}
              <div className="app_content">
                {width >= 1280 && withAdminbar && <AppBar />}
                {width >= 1280 && withSidebar && <NavBar />}
                <Suspense fallback={<Loader />}>
                  <div className="main">
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/admin" element={<SalesAnalytics />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/product" element={<Product />} />
                      {/* <Route path="/cart" element={<Cart />} /> */}
                      <Route path="/" element={<Homepage />} />
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
