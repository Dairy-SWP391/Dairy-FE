import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import {
  Account,
  Address,
  AdminDashboard,
  Blog,
  BlogEditor,
  Cart,
  Category,
  Chat,
  ChatDetail,
  ConfirmOrder,
  Home,
  Login,
  Order,
  OrderDetail,
  OrderList,
  PageNotFound,
  PaymentSuccess,
  ProductDetail,
  ProductEditor,
  ProductManagement,
  Profile,
  Register,
  Vouchers,
  Wishlist
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
    path: "/tin-tuc",
    element: <Blog />
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
    path: "/all-products",
    element: <Category />
  },
  {
    path: "/:category/:category/:id",
    element: <ProductDetail />
  },
  {
    path: "/tin-tuc/:id",
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
  },
  {
    path: "/order-success",
    element: <PaymentSuccess />
  },
  {
    path: "/me/wishlist",
    element: <Wishlist />
  },
  {
    path: "/me/orders",
    element: <Order />
  }
];

const adminRoutes: RouteType[] = [
  { path: "/admin", element: <AdminDashboard /> },
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
  },
  {
    path: "/admin/vouchers",
    element: <Vouchers />
  },
  {
    path: "/admin/orders",
    element: <OrderList />
  },
  {
    path: "/admin/orders/:order_id",
    element: <OrderDetail />
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
