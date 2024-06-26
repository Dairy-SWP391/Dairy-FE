import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import {
  Account,
  Address,
  AdminDashboard,
  Cart,
  Category,
  Chat,
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
    path: "/admin/chats",
    element: <Chat />
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

  const router = [
    ...publicRoutes,
    ...(token.access_token ? authenticatedRoutes : unAuthenticatedRoutes),
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
