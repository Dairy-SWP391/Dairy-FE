import { NextUIProvider } from "@nextui-org/react";
import "./styles/index.scss";
import NavBar from "./layout/user/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./layout/user/Footer";
import { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import BreadCrumbs from "./components/BreadCrumbs";
import { getAllCategories } from "./apis/category";
import { useCategoryStore } from "./store/category";
import Loader from "./components/Loader";
import ChatButton from "./layout/user/ChatButton";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Category = lazy(() => import("./pages/Category"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  // const { width } = useWindowSize();
  const path = useLocation().pathname;
  const withoutNavBar = ["/login", "/register", "/404"];
  const withoutBreadcrumb = ["/login", "/register", "/404"];
  const updateCategory = useCategoryStore((state) => state.setCategory);
  const respone = async () => {
    const res = await getAllCategories();
    updateCategory(res.data.data);
  };

  useEffect(() => {
    respone();
  }, []);

  return (
    <NextUIProvider>
      <ToastContainer
        // theme={theme}
        autoClose={2000}
        style={{ padding: "20px" }}
      />
      {path.startsWith("/admin") ? null : withoutNavBar.includes(
          path,
        ) ? null : (
        <NavBar />
      )}
      {withoutBreadcrumb.includes(path) || path === "/" ? null : (
        <BreadCrumbs pathname={path} classNames="mx-auto w-5/6 mt-6 text-lg" />
      )}
      <div className={`app ${withoutNavBar.includes(path) && "fluid"}`}>
        <div className="app_content">
          <Suspense fallback={<Loader />}>
            <div className="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/:category" element={<Category />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </Suspense>
        </div>
      </div>
      {path.startsWith("/admin") ? null : withoutNavBar.includes(
          path,
        ) ? null : (
        <Footer />
      )}

      <ChatButton />
    </NextUIProvider>
  );
}

export default App;
