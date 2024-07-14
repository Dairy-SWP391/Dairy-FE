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
import { useLocation, useNavigate } from "react-router-dom";
import { getMe } from "./apis/user";
import { isAxiosError } from "./utils/utils";
import socket from "./utils/socket";

function App() {
  // const { width } = useWindowSize();
  const path = useLocation().pathname;
  const nav = useNavigate();
  const layout = useLayout();
  const updateCategory = useCategoryStore((state) => state.setCategory);
  const { token, clearToken } = useAuth();
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
      clearToken();
      nav("/");
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      if (token.access_token) {
        try {
          const user_info = await getMe();
          console.log(user_info);
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
