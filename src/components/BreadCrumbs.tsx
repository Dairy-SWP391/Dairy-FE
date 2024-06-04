import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useCategoryStore } from "../store/category";
import { useEffect } from "react";

type BreadCrumbsProps = {
  pathname: string;
  classNames?: string;
};

const BreadCrumbs = ({ pathname, classNames }: BreadCrumbsProps) => {
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
    ],
  );

  let currentLink = "";

  useEffect(() => {
    setCategoryPath(categoryPath);
    console.log(categoryPath);
  }, []);

  const crumbs = pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return {
        name: categoryPath.find(
          (cate) => cate.path === currentLink.split("/").pop(),
        )?.name,
        link: currentLink,
      };
    });

  return (
    <div className={`${classNames}`}>
      <Breadcrumbs>
        {crumbs.length >= 1 && (
          <BreadcrumbItem href="/">TRANG CHỦ</BreadcrumbItem>
        )}
        {crumbs.map((crumb) => {
          return (
            <BreadcrumbItem key={crumb.name} href={crumb.link}>
              {crumb.name}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
