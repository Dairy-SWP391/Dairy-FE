import Spring from "@components/Spring";
import Navigate from "@assets/navigate.png";
import { useNavigate } from "react-router-dom";
import { numberToVND } from "@utils/converter";
import { Button } from "@nextui-org/react";
// import { getLocalStorage } from "@utils/helpers";
interface CartProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   const cart = getLocalStorage("cart");
  const cart: CartProps[] = [
    {
      id: 1,
      name: "Thực phẩm bổ sung phô mai Con Bò Cười vuông Belcube vị truyền thống 78g",
      price: 49000,
      quantity: 1,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 2,
      name: "Váng sữa Mixxi - Vanila Plus 75g - Lốc 4",
      price: 64000,
      quantity: 1,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 3,
      name: "Sữa chua trái cây Hoff Organic Vị Chuối 6x55g",
      price: 49000,
      quantity: 1,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 4,
      name: "Sữa GrowPLUS+ Sữa non Vàng 800g trên 1 tuổi",
      price: 49000,
      quantity: 1,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
    {
      id: 5,
      name: "Thực phẩm bổ sung phô mai Con Bò Cười vuông Belcube vị truyền thống 78g",
      price: 49000,
      quantity: 1,
      image:
        "https://cdn1.concung.com/2022/03/46889-83329-large_mobile/thuc-pham-bo-sung-pho-mai-con-bo-cuoi-vuong-le-cube-vi-truyen-thong-78g.jpg",
    },
  ];

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const sale = 0;

  const nav = useNavigate();
  return (
    <div className="mx-auto w-5/6 mt-6 text-lg flex justify-between">
      <div className="w-[66%]">
        <Spring className="card min-h-[70vh]">
          {cart ? (
            <div>
              <div className="flex justify-between items-center border-b-1 pb-5 border-slate-500 ">
                <p className="text-lg font-bold w-[12%]">Giỏ Hàng</p>
                <p className="text-lg font-bold w-[38%]"></p>
                <p className="text-medium text-slate-500 w-[10%] text-center">
                  Đơn giá
                </p>
                <p className="text-medium text-slate-500 w-[20%] text-center">
                  Số lượng
                </p>
                <p className="text-medium text-slate-500 w-[10%] text-center">
                  Thành tiền
                </p>
                <p className="text-medium text-slate-500 w-[10%] text-center"></p>
              </div>
              {cart.map(({ id, image, name, price, quantity }) => {
                return (
                  <div
                    className="flex justify-between items-center border-b-1 pb-5 border-slate-500 mt-3"
                    key={id}
                  >
                    <div className="w-[12%] border rounded">
                      <img src={image} alt="Product" />
                    </div>
                    <p className="text-sm w-[38%] px-2 -translate-y-7">
                      {name}
                    </p>
                    <p className="text-medium text-black w-[10%] text-center">
                      {numberToVND(price)}
                    </p>
                    <p className="text-medium text-slate-500 w-[20%] flex items-center justify-between px-7 text-center">
                      <Button
                        className="text-xl"
                        // onClick={() => handleChangeQuantity("decrease")}
                        size="sm"
                        isIconOnly
                      >
                        -
                      </Button>
                      <p className="text-black">{quantity}</p>
                      <Button
                        className="text-xl"
                        // onClick={() => handleChangeQuantity("increase")}
                        size="sm"
                        isIconOnly
                      >
                        +
                      </Button>
                    </p>
                    <p className="text-medium text-black w-[10%] text-center">
                      {numberToVND(price)}
                    </p>
                    <p className="text-medium text-slate-500 w-[10%] flex justify-end items-center">
                      <button>
                        <i
                          className="fa fa-heart-o text-slate-500 text-xl hover:cursor-pointer mr-2"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <button>
                        <i
                          className="fa fa-trash-o text-slate-500 text-xl hover:cursor-pointer ml-1"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <div className="w-2/4">
                <img
                  src="https://cdn1.concung.com/themes/desktop4.1/image/v40/bg/cart-empty.png"
                  alt="No Cart"
                />
              </div>
              <p className="text-base mt-3 font-bold">
                Hiện chưa có sản phẩm nào trong giỏ hàng
              </p>
            </div>
          )}
        </Spring>
      </div>
      <div className="w-[30%] grid grid-rows-15 gap-5 sticky top-32 h-fit">
        <Spring className="card row-span-4">
          <h3 className="text-lg text-slate-500">Địa Chỉ Nhận Hàng</h3>
          <button
            className="rounded-lg border-2 border-red-700 mt-2 w-full h-[65%] flex items-center border-dashed justify-between px-14 bg-[url('../assets/map.png')] cursor-pointer"
            onClick={() => nav("/dia-chi-khach-hang")}
          >
            <div className="w-2/12">
              <img src={Navigate} alt="Navigate" className="w-6/12" />
            </div>
            <p className="text-base text-red-700 font-medium">
              Xác định địa chỉ nhận hàng
            </p>
          </button>
        </Spring>
        <Spring className="card row-span-3">
          <h3 className="text-lg text-black">Ưu đãi & mã giảm giá</h3>
          <button className="rounded-lg border-2 border-yellow-500 mt-3 h-[50%] w-full flex items-center justify-between px-4 cursor-pointer">
            <div className="w-1/12">
              <img
                src={
                  "https://cdn1.concung.com/themes/desktop4.1/image/v40/icon/voucher.png"
                }
                alt="Navigate"
              />
            </div>
            <p className="text-base text-orange-500 font-medium tracking-tight">
              Bấm vào để Chọn hoặc Nhập Mã ưu đãi
            </p>
          </button>
        </Spring>
        <Spring className="card row-span-8 text-slate-500">
          <div className="flex items-center justify-between text-base">
            <p>Tính tạm</p>
            <p>{numberToVND(totalPrice)}</p>
          </div>
          <div className="flex items-center justify-between text-base mt-2 pb-2 border-b-1">
            <p>Giảm giá</p>
            <p className="text-pink-500">{numberToVND(0)}</p>
          </div>
          <div className="flex items-start justify-between text-base mt-2 font-semibold">
            <p>Tổng tiền</p>
            <div className="text-right">
              <p>{numberToVND(totalPrice - sale)}</p>
              <p className="font-normal italic">(Đã bao gồm VAT)</p>
            </div>
          </div>
          <Button
            fullWidth
            className="mt-4 bg-zinc-400 font-medium text-white text-lg"
          >
            Mua hàng
          </Button>
        </Spring>
      </div>
    </div>
  );
};

export default Cart;
