import { Link } from "@nextui-org/react";
import Spring from "../../components/Spring";
import { useLocation } from "react-router-dom";

const ProfileNav = [
  {
    name: "Tài Khoản Của Tôi",
    href: "/me",
    icon: "fa fa-user-o",
    child: [
      {
        name: "Hồ Sơ",
        href: "/me"
      },
      {
        name: "Địa chỉ",
        href: "/me/address"
      },
      {
        name: "Đổi mật khẩu",
        href: "/me/password"
      }
    ]
  },
  {
    name: "Đơn Hàng",
    href: "/me/orders",
    icon: "fa fa-truck"
  },
  {
    name: "Ưa Thích",
    href: "/me/wishlist",
    icon: "fa fa-heart-o"
  }
];

const ProfileBar = () => {
  const location = useLocation().pathname;

  return (
    <>
      <Spring className="card">
        <div className="flex flex-col">
          {ProfileNav.map(({ href, name, child, icon }, index) => (
            <div key={index} className={`flex flex-col `}>
              <div
                className={`flex items-center mt-3 ${location === href && "font-bold"}`}
              >
                <i className={`${icon} pr-3`} aria-hidden="true"></i>
                <Link href={href} color="foreground">
                  {name}
                </Link>
              </div>
              {child?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  color="foreground"
                  className={`pl-9 mt-2 ${location === item.href && "font-bold"}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </Spring>
    </>
  );
};

export default ProfileBar;
