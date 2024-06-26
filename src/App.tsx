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
import { getMe, renewToken } from "./apis/user";
import { isAxiosError } from "./utils/utils";

function App() {
  // const { width } = useWindowSize();
  const path = useLocation().pathname;
  const layout = useLayout();
  const updateCategory = useCategoryStore((state) => state.setCategory);
  const { token, addToken } = useAuth();
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
    (async () => {
      if (token.access_token) {
        try {
          const user_info = (await getMe(token.access_token)).data.result;
          localStorage.setItem("user", JSON.stringify(user_info));
          setUser(user_info);
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
                console.log(token.refresh_token);
                const res = await renewToken({
                  refresh_token: token.refresh_token as string
                });
                addToken(res.data.result);
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      }
    })();
  }, [token]);

  return (
    <NextUIProvider>
      <AuthProvider>
        <SidebarProvider>
          <ToastContainer autoClose={2000} style={{ padding: "20px" }} />

          {layout.includes("navbar") && <NavBar user={user} />}
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
          {layout.includes("chat") && <ChatButton user={user} />}
        </SidebarProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}

export default App;
