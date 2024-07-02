import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import {
  Account,
  Address,
  AdminDashboard,
  BlogEditor,
  Cart,
  Category,
  Chat,
  ChatDetail,
  ConfirmOrder,
  Home,
  Login,
  PageNotFound,
  ProductDetail,
  ProductEditor,
  ProductManagement,
  ProductsGrid,
  Profile,
  Register
} from "../pages";
import BlogDetail from "../pages/BlogDetail";

type RouteType = {
  path: string;
  element: JSX.Element;
};

const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/:category",
    element: <Category />
  },
  {
    path: "/:category/:category",
    element: <Category />
  },
  {
    path: "/:category/:category/:id",
    element: <ProductDetail />
  },
  {
    path: "/blog/blog-detail",
    element: <BlogDetail />
  },
  {
    path: "/404",
    element: <PageNotFound />
  }
];

const authenticatedRoutes: RouteType[] = [
  {
    path: "/me",
    element: <Profile />
  },
  {
    path: "/me/address",
    element: <Address />
  },
  {
    path: "/confirm-order",
    element: <ConfirmOrder />
  }
];

const adminRoutes: RouteType[] = [
  { path: "/admin", element: <AdminDashboard /> },
  {
    path: "/admin/products-grid",
    element: <ProductsGrid />
  },
  {
    path: "/admin/products-management",
    element: <ProductManagement />
  },
  {
    path: "/admin/product-editor",
    element: <ProductEditor />
  },
  {
    path: "/admin/blog-editor",
    element: <BlogEditor />
  },
  {
    path: "/admin/chats",
    element: <Chat />
  },
  {
    path: "/admin/chats/:user_id",
    element: <ChatDetail />
  },
  {
    path: "/admin/accounts",
    element: <Account />
  }
];

const unAuthenticatedRoutes: RouteType[] = [
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
];

const Router = () => {
  const { token } = useAuth();
  const user = JSON.parse((localStorage.getItem("user") as string) || "{}");

  const router = [
    ...publicRoutes,
    ...(token.access_token ? authenticatedRoutes : unAuthenticatedRoutes),
    ...(["ADMIN", "STAFF"].includes(user.role) ? adminRoutes : []),
    {
      path: "*",
      element: <Navigate to="/404" />
    }
  ];

  return (
    <Routes>
      {router.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
