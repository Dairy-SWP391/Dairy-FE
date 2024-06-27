import { CartIcon } from "../../components/CartIcon";
import DropdownItem from "../../components/DropdownItem";
import Logo from "../../components/Logo";
import { NotificationIcon } from "../../components/NotificationIcon";
import Search from "../../components/Search";
import { Badge, User } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../store/category";
import { useCartStore } from "../../store/cart";
import { UserType } from "../../store/user";
import { useAuth } from "../../provider/AuthProvider";

const NavBar = ({ user }: { user: UserType | null }) => {
  const nav = useNavigate();
  const { clearToken } = useAuth();
  const categories = useCategoryStore((state) => state.category);
  const cart = useCartStore((state) => state.cart);

  return (
    <>
      <div className="text-base sticky top-0 z-10 w-full">
        <div className="w-full flex items-center justify-between h-16 px-40 bg-white">
          <Logo />
          <div className="flex items-center w-8/12">
            <Search
              wrapperClass="w-full"
              placeholder="Ba mẹ muốn tìm mua gì hôm nay ?"
            />
            <Badge
              color="danger"
              content={5}
              // isInvisible={isInvisible}
              shape="circle"
              classNames={{
                base: "mr-6 ml-12"
              }}
            >
              <NotificationIcon className="fill-current" size={30} />
            </Badge>
            <button
              className="flex items-center cursor-pointer"
              onClick={() => nav("/cart")}
            >
              <Badge
                color="danger"
                content={cart.length}
                // isInvisible={isInvisible}
                shape="circle"
                classNames={{
                  base: "mx-6"
                }}
              >
                <CartIcon size={30} />
              </Badge>
            </button>
            <div className="flex ml-4 items-center justify-end">
              <User
                name={""}
                avatarProps={{
                  src: user?.avatar_url
                }}
                className="cursor-pointer"
                onClick={() => {
                  if (user) nav("/me");
                  else window.location.href = "/login";
                }}
              />
              <button
                onClick={() => {
                  if (user) {
                    localStorage.removeItem("user");
                    clearToken();
                    nav("/");
                  } else {
                    window.location.href = "/login";
                  }
                }}
              >
                <p className="text-base font-medium text-gray-600 ml-6">
                  {user ? "Đăng xuất" : "Đăng nhập"}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border h-12 bg-pink-400 w-full text-white text-base font-medium px-44 list-none">
          <button
            className={`menu-hover h-full`}
            onClick={() => {
              nav(`/all-products`);
            }}
          >
            <p>SHOP NOW</p>
          </button>
          {categories.map((category) => (
            <DropdownItem
              key={category.id}
              className="flex items-center"
              category={category}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NavBar;
