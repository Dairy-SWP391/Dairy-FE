import { CartIcon } from "@components/CartIcon";
import DropdownItem from "@components/DropdownItem";
import Logo from "@components/Logo";
import { NotificationIcon } from "@components/NotificationIcon";
import Search from "@components/Search";
import { Badge, User } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const nav = useNavigate();
  const Categories = [
    {
      id: 1,
      title: "SỮA BỘT CAO CẤP",
      subCategories: [
        {
          id: 1,
          title: "Sữa Mỹ",
        },
        {
          id: 2,
          title: "Sữa Nhật",
        },
        {
          id: 3,
          title: "Sữa Úc",
        },
        {
          id: 4,
          title: "Châu Âu",
        },
        {
          id: 5,
          title: "Sữa Khác",
        },
      ],
    },
    {
      id: 2,
      title: "SỮA TƯƠI CÁC LOẠI",
      subCategories: [
        {
          id: 1,
          title: "Sữa bột dành cho trẻ em",
        },
        {
          id: 2,
          title: "Sữa bột dành cho người lớn",
        },
      ],
    },
    {
      id: 3,
      title: "VITAMIN & SỨC KHỎE",
      subCategories: [
        {
          id: 1,
          title: "Sữa bột dành cho trẻ em",
        },
        {
          id: 2,
          title: "Sữa bột dành cho người lớn",
        },
      ],
    },
    {
      id: 6,
      title: "ĐỒ DÙNG MẸ VÀ BÉ",
      subCategories: [
        {
          id: 1,
          title: "Bình sữa, phụ kiện",
        },
        {
          id: 2,
          title: "Dụng cụ vệ sinh",
        },
        {
          id: 3,
          title: "Dụng cụ bé ăn",
        },
        {
          id: 4,
          title: "Sức khỏe, an toàn",
        },
      ],
    },
    {
      id: 4,
      title: "TIN TỨC",
    },
    {
      id: 5,
      title: "ABOUT US",
    },
  ];
  // const [isInvisible, setIsInvisible] = useState<boolean>(false);
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
                base: "mr-6 ml-12",
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
                content={0}
                // isInvisible={isInvisible}
                shape="circle"
                classNames={{
                  base: "mx-6",
                }}
              >
                <CartIcon size={30} />
              </Badge>
            </button>

            <User
              name="Sign In"
              avatarProps={{
                src: "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg",
              }}
              className="ml-6 w-36 cursor-pointer"
              onClick={() => nav("/login")}
            />
          </div>
        </div>
        <div className="flex items-center justify-between border h-12 bg-pink-400 w-full text-white text-base font-medium px-44 list-none">
          {Categories.map((category) => (
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
