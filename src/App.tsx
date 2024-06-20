import { NextUIProvider } from "@nextui-org/react";
import "./styles/index.scss";
import NavBar from "./layout/user/NavBar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./layout/user/Footer";
import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumbs from "./components/BreadCrumbs";
import { getAllCategories } from "./apis/category";
import { useCategoryStore } from "./store/category";
import Loader from "./components/Loader";
import ChatButton from "./layout/user/ChatButton";
import useLayout from "./hooks/useLayout";
import AppBar from "./layout/admin/AppBar";
import { SidebarProvider } from "./context/sidebarContext";
import Sidebar from "./layout/admin/Sidebar";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { getMe, renewToken } from "./apis/user";
import { useAuthStore } from "./store/auth";
import { unix } from "dayjs";
import { isAxiosError } from "./utils/utils";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Category = lazy(() => import("./pages/Category"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ProductsGrid = lazy(() => import("./pages/ProductsGrid"));
const ProductManagement = lazy(() => import("./pages/ProductManagement"));
const ProductEditor = lazy(() => import("./pages/ProductEditor"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  // const { width } = useWindowSize();
  const path = useLocation().pathname;
  const layout = useLayout();
  const setAuth = useAuthStore((state) => state.setAuth);
  const updateCategory = useCategoryStore((state) => state.setCategory);

  useEffect(() => {
    const getCategory = async () => {
      const res = await getAllCategories();
      updateCategory(res.data.data);
    };
    getCategory();
  }, [updateCategory]);

  useEffect(() => {
    (async () => {
      const user: { access_token: string; refresh_token: string } = JSON.parse(
        localStorage.getItem("user") as string
      );
      if (user) {
        const decoded = jwtDecode<
          JwtPayload & { user_id: string; verify: "VERIFIED" | "UNVERIFIED" }
        >(user.access_token);
        try {
          const user_info = await getMe({
            access_token: user.access_token
          });
          setAuth({
            access_token: user.access_token,
            exp: unix(decoded.exp as number).toDate(),
            iat: unix(decoded.exp as number).toDate(),
            id: decoded.user_id as string,
            status: decoded.verify,
            created_at: user_info.data.result.created_at,
            email: user_info.data.result.email,
            first_name: user_info.data.result.first_name,
            last_name: user_info.data.result.last_name,
            phone_number: user_info.data.result.phone_number,
            role: user_info.data.result.role,
            updated_at: user_info.data.result.updated_at,
            avatar_url:
              "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/avatar.png?alt=media"
          });
        } catch (error) {
          if (
            isAxiosError<{
              message: string;
            }>(error)
          ) {
            if (
              error.response?.status === 401 &&
              error.response?.data.message === "jwt expired"
            ) {
              try {
                console.log(user.refresh_token);
                const res = await renewToken({
                  refresh_token: user.refresh_token
                });
                const { access_token: access, refresh_token: refresh } =
                  res.data.result;
                const nDecoded = jwtDecode<
                  JwtPayload & {
                    user_id: string;
                    verify: "VERIFIED" | "UNVERIFIED";
                  }
                >(access);
                const user_info = await getMe({
                  access_token: access
                });
                setAuth({
                  access_token: access,
                  exp: unix(nDecoded.exp as number).toDate(),
                  iat: unix(nDecoded.exp as number).toDate(),
                  id: nDecoded.user_id as string,
                  status: nDecoded.verify,
                  created_at: user_info.data.result.created_at,
                  email: user_info.data.result.email,
                  first_name: user_info.data.result.first_name,
                  last_name: user_info.data.result.last_name,
                  phone_number: user_info.data.result.phone_number,
                  role: user_info.data.result.role,
                  updated_at: user_info.data.result.updated_at,
                  avatar_url:
                    "https://firebasestorage.googleapis.com/v0/b/dairy-7d363.appspot.com/o/avatar.png?alt=media"
                });
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    access_token: access,
                    refresh_token: refresh
                  })
                );
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      }
    })();
  }, []);

  return (
    <NextUIProvider>
      <SidebarProvider>
        <ToastContainer autoClose={2000} style={{ padding: "20px" }} />
        {layout.includes("navbar") && <NavBar />}
        {layout.includes("breadcrumb") && (
          <BreadCrumbs
            pathname={path}
            classNames="mx-auto w-5/6 mt-6 text-lg"
          />
        )}
        <div className={`app ${layout.includes("none") && "fluid"}`}>
          {layout.includes("admin") && <Sidebar />}
          <div
            className={`app_content ${layout.includes("admin") && "bg-[#f9f9f9]"}`}
          >
            {layout.includes("admin") && <AppBar />}
            <Suspense fallback={<Loader />}>
              <div className="main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  {/* <Route path="/product-detail/:id" element={<ProductDetail />} /> */}
                  <Route
                    path="/:category/:category/:id"
                    element={<ProductDetail />}
                  />
                  <Route path="/:category" element={<Category />} />
                  <Route path="/:category/:category" element={<Category />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route
                    path="/admin/products-grid"
                    element={<ProductsGrid />}
                  />
                  <Route
                    path="/admin/products-management"
                    element={<ProductManagement />}
                  />
                  <Route
                    path="/admin/product-editor"
                    element={<ProductEditor />}
                  />
                  <Route path="/404" element={<PageNotFound />} />
                  <Route path="*" element={<Navigate to={"/404"} />} />
                </Routes>
              </div>
            </Suspense>
          </div>
        </div>
        {layout.includes("footer") && <Footer />}
        {layout.includes("chat") && <ChatButton />}
      </SidebarProvider>
    </NextUIProvider>
  );
}

export default App;
