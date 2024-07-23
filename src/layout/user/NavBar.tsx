import { CartIcon } from "../../components/CartIcon";
import DropdownItem from "../../components/DropdownItem";
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import { Badge, Chip, Image, User } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../store/category";
import { useCartStore } from "../../store/cart";
import { UserType } from "../../store/user";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Product, searchProduct } from "../../apis/product";
import {
  getSalesRatio,
  numberToVND,
  stringToNomalCase
} from "../../utils/converter";

const NavBar = ({
  user,
  logout
}: {
  user: UserType | null;
  logout: () => void;
}) => {
  const nav = useNavigate();
  const categories = useCategoryStore((state) => state.category);
  const cart = useCartStore((state) => state.cart);
  const [query, setQuery] = useState<string>("");
  const [debouncedText] = useDebounce(query, 500);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchApi = async (query: string) => {
      const res = await searchProduct({
        // num_of_items_per_page: 5,
        page: 1,
        query
      });
      setProducts(res.data.data.products);
    };
    if (debouncedText) {
      fetchApi(debouncedText);
    }
  }, [debouncedText]);

  return (
    <>
      <div className="text-base sticky top-0 z-50 w-full bg-white">
        <div className="w-full flex items-center justify-between h-16 px-40 bg-white">
          <Logo />
          <div className="w-1/2 group">
            <Search
              wrapperClass="w-full"
              placeholder="Ba mẹ muốn tìm mua gì hôm nay ?"
              query={query}
              setQuery={setQuery}
            />
            <div
              className={`invisible fixed z-50 pt-3 bg-white gap-3 w-5/12 text-gray-800 shadow-xl group-focus-within:visible max-h-[82vh] overflow-auto`}
            >
              {products
                ? products.map((product) => (
                    <button
                      key={product.id}
                      className="grid grid-cols-6 pb-3 border-b-1 hover:bg-slate-200"
                      onClick={() =>
                        nav(
                          `/${categories.find((cate) => cate.id === product.parent_category_id)?.path}/${categories.find((cate) => cate.id === product.parent_category_id)?.child_category.find((subCate) => (subCate.id = product.category_id))?.path}/${stringToNomalCase({ str: product.name, id: product.id })}`
                        )
                      }
                    >
                      <div className="col-span-1 flex items-center justify-center">
                        <Image src={product?.image_urls[0]} />
                      </div>
                      <div className="col-span-5 text-left ml-5 pt-5">
                        <h6>{product.name}</h6>
                        <div className="mt-3 flex gap-1">
                          <p>
                            {numberToVND(
                              product.sale_price || product.price || 0
                            )}
                          </p>
                          {product.sale_price && (
                            <Chip
                              color="default"
                              variant="bordered"
                              classNames={{
                                content: "font-semibold text-xs text-pink-600",
                                base: "bg-transparent border-pink-600 px-0 ml-3"
                              }}
                              size="sm"
                            >
                              -{" "}
                              {getSalesRatio(
                                product.price,
                                product.sale_price || product.price
                              )}
                              %
                            </Chip>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                : ""}
            </div>
          </div>
          <div className="flex items-center w-3/12">
            {/* <Badge
              color="danger"
              content={5}
              // isInvisible={isInvisible}
              shape="circle"
              classNames={{
                base: "mr-6 ml-12"
              }}
            >
              <NotificationIcon className="fill-current" size={30} />
            </Badge> */}
            <button
              className="flex items-center cursor-pointer "
              onClick={() => nav(`/${user ? "cart" : "login"}`)}
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
              <button onClick={logout}>
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
