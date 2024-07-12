import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useLayout = () => {
  const path = useLocation().pathname;
  const [layout, setLayout] = useState<string[]>([]);
  useEffect(() => {
    if (path.startsWith("/admin")) {
      setLayout(["admin"]);
    } else if (["/login", "/register", "/404"].includes(path)) {
      setLayout(["none"]);
    } else {
      setLayout(["navbar", "footer", "chat"]);
      path !== "/" &&
        !path.startsWith("/me") &&
        !path.startsWith("/order-success") &&
        !path.startsWith("/blog") &&
        setLayout((prev) => [...prev, "breadcrumb"]);
    }
  }, [path]);
  return layout;
};

export default useLayout;
