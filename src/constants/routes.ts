const ROUTES = [
  {
    name: "Dashboard",
    icon: "fa-area-chart",
    path: "/admin"
    // links: [
    //   { name: "Sales Analytics", path: "/" },
    //   { name: "Sellers List", path: "/sellers-list" },
    //   { name: "Sellers Table", path: "/sellers-table" },
    //   { name: "Sellers Grid", path: "/sellers-grid" },
    //   { name: "Seller Profile", path: "/seller-profile" },
    //   { name: "Revenue by Period", path: "/revenue-by-period" },
    // ],
  },
  {
    name: "Products",
    icon: "fa-archive",
    links: [
      { name: "Products Grid", path: "/admin/products-grid" },
      { name: "Products Management", path: "/admin/products-management" },
      { name: "Product Editor", path: "/admin/product-editor" }
    ]
  },
  {
    name: "Orders",
    icon: "fa-shopping-cart",
    path: "/admin/orders"
  },
  {
    name: "Chats",
    icon: "fa-comments-o",
    path: "/admin/chats"
  },
  {
    name: "Accounts",
    icon: "fa-users",
    path: "/admin/accounts"
  },
  // {
  //   name: "Reviews",
  //   icon: "fa-star-half-o",
  //   path: "/admin/reviews"
  // },
  {
    name: "Blog",
    icon: "fa-clipboard",
    links: [
      { name: "Blog Editor", path: "/admin/blog-editor" },
      { name: "Blog Management", path: "/admin/blog-management" }
    ]
  },
  // {
  //   name: "Transactions",
  //   icon: "fa-credit-card-alt",
  //   path: "/transactions",
  //   qty: 279
  // },
  {
    name: "Settings",
    icon: "fa-cog",
    links: [
      { name: "General Settings", path: "/general-settings" },
      { name: "Connected Apps", path: "/connected-apps" }
    ]
  }
];

export default ROUTES;
