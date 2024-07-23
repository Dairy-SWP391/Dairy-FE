import { NextUIProvider } from "@nextui-org/react";
import "./styles/index.scss";
import NavBar from "./layout/user/NavBar";
import Footer from "./layout/user/Footer";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreadCrumbs from "./components/BreadCrumbs";
import { getAllCategories } from "./apis/category";
import { useCategoryStore } from "./store/category";
import ChatButton from "./layout/user/ChatButton";
import useLayout from "./hooks/useLayout";
import AppBar from "./layout/admin/AppBar";
import { SidebarProvider } from "./context/sidebarContext";
import Sidebar from "./layout/admin/Sidebar";
import AuthProvider, { useAuth } from "./provider/AuthProvider";
import Routes from "./routes";
import { useLocation } from "react-router-dom";
import { getMe } from "./apis/user";
import { isAxiosError } from "./utils/utils";
import socket from "./utils/socket";
import { convertCart } from "./apis/product";
import { Cart, useCartStore } from "./store/cart";

function App() {
  // const { width } = useWindowSize();
  const path = useLocation();
  const layout = useLayout();
  const updateCategory = useCategoryStore((state) => state.setCategory);
  const { setCart } = useCartStore();
  const { token, clearToken, addToken } = useAuth();
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );

  useEffect(() => {
    const getCategory = async () => {
      const res = await getAllCategories();
      updateCategory(res.data.data);
    };
    getCategory();
  }, []);

  useEffect(() => {
    if (path.pathname === "/oauth") {
      const query = path.search
        .slice(1, path.search.length)
        .split("&")
        .splice(0, 2);
      const token = query.reduce(
        (acc, item) => {
          const [key, value] = item.split("=");
          return { ...acc, [key]: value };
        },
        { access_token: "", refresh_token: "" }
      );
      addToken(token);
      localStorage.setItem("token", JSON.stringify(token));
      window.location.href = "/";
    }
  }, [path, addToken]);

  useEffect(() => {
    const getInitCart = async (): Promise<Cart[]> => {
      const cartLocal = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") as string)
        : [];
      const response = await convertCart(cartLocal);
      if (response) {
        return response.data.result.products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          sale: product.sale_price,
          quantity:
            cartLocal.find(
              (item: { id: number; quantity: number }) => item.id === product.id
            )?.quantity || 0,
          max_quantity: product.quantity,
          image: product.image_url[0]
        }));
      }
      return [];
    };
    getInitCart().then((cart) => setCart(cart));
  }, []);

  useEffect(() => {
    if (user?.id) {
      socket.auth = { _id: user.id };

      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const logOut = () => {
    if (user) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      clearToken();
      window.location.href = "/";
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      if (token.access_token) {
        try {
          const user_info = await getMe();
          localStorage.setItem("user", JSON.stringify(user_info.data.result));
          setUser(user_info.data.result);
        } catch (error) {
          if (
            isAxiosError<{
              message: string;
            }>(error)
          ) {
            console.log(error);
          }
        }
      }
    };

    fetchApi();
  }, [token.access_token]);

  return (
    <NextUIProvider>
      <AuthProvider>
        <SidebarProvider>
          <ToastContainer autoClose={2000} style={{ padding: "20px" }} />

          {layout.includes("navbar") && <NavBar user={user} logout={logOut} />}
          {layout.includes("breadcrumb") && (
            <BreadCrumbs
              pathname={path.pathname}
              classNames="mx-auto w-5/6 mt-6 text-lg"
            />
          )}
          <div className={`app ${layout.includes("none") && "fluid"}`}>
            {layout.includes("admin") && <Sidebar />}
            <div
              className={`app_content ${layout.includes("admin") && "bg-[#f9f9f9]"}`}
            >
              {layout.includes("admin") && <AppBar />}
              <div className="main">
                <Routes />
              </div>
            </div>
          </div>
          {layout.includes("footer") && <Footer />}
          {layout.includes("chat") && <ChatButton />}
        </SidebarProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;
