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
  const updateCategory = useCategoryStore((state) => state.setCategory);

  useEffect(() => {
    const getCategory = async () => {
      const res = await getAllCategories();
      updateCategory(res.data.data);
    };
    getCategory();
  }, [updateCategory]);

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
