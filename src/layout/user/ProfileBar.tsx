import { Link } from "@nextui-org/react";
import Spring from "../../components/Spring";

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
    name: "Thông Báo",
    href: "/me/reviews",
    icon: "fa fa-bell-o"
  },
  {
    name: "Ưa Thích",
    href: "/me/favorites",
    icon: "fa fa-heart-o"
  },
  {
    name: "Ví Voucher",
    href: "/me/vouchers",
    icon: "fa fa-ticket"
  }
];

const ProfileBar = () => {
  return (
    <>
      <Spring className="card">
        <div className="flex flex-col">
          {ProfileNav.map(({ href, name, child, icon }, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center mt-3">
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
                  className="pl-9 mt-2"
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
