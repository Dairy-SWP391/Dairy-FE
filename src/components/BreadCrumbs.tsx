import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useCategoryStore } from "../store/category";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type BreadCrumbsProps = {
  pathname: string;
  classNames?: string;
};

const BreadCrumbs = ({ pathname, classNames }: BreadCrumbsProps) => {
  const nav = useNavigate();
  const category = useCategoryStore((state) => state.category);
  const setCategoryPath = useCategoryStore((state) => state.setCategoryPath);
  const categoryPath = category.reduce(
    (acc, cate) => {
      acc.push({ name: cate.name, path: cate.path });
      cate.child_category.forEach((child) => {
        acc.push({ name: child.name, path: child.path });
      });
      return acc;
    },
    [
      { name: "TRANG CHỦ", path: "/" },
      { name: "GIỎ HÀNG", path: "cart" },
      {
        name: "CÁ NHÂN",
        path: "me"
      },
      {
        name: "CONFIRM ORDER",
        path: "confirm-order"
      },
      {
        name: "ALL PRODUCTS",
        path: "all-products"
      }
    ]
  );

  let currentLink = "";

  useEffect(() => {
    setCategoryPath(categoryPath);
  }, [categoryPath, setCategoryPath]);

  const crumbs = pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      const name = categoryPath.find(
        (cate) => cate.path === currentLink.split("/").pop()
      )?.name;
      // if (!name && index < 2) nav("/404");
      return {
        name: name,
        link: currentLink
      };
    });

  return (
    <div className={`${classNames}`}>
      <Breadcrumbs key="main-breadcrumbs">
        {crumbs.length >= 1 && (
          <BreadcrumbItem href="/" key="homepage">
            TRANG CHỦ
          </BreadcrumbItem>
        )}
        {crumbs.map((crumb) => {
          return (
            <BreadcrumbItem key={crumb.name} onClick={() => nav(crumb.link)}>
              {crumb.name}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
