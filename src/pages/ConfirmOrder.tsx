import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartItem, getFeeShip } from "../apis/ship";
import { useCartStore } from "../store/cart";
import Spring from "../components/Spring";
import { numberToVND } from "../utils/converter";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { checkOut } from "../apis/user";

const ConfirmOrder = () => {
  const location = useLocation();
  const { service_id, address, voucher } = location.state;
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [fee, setFee] = useState<{
    service_fee: number;
    insurance_fee: number;
    total_product_price: number;
  }>({ service_fee: 0, insurance_fee: 0, total_product_price: 0 });
  const cart = useCartStore((state) => state.cart);
  useEffect(() => {
    const getFee = async () => {
      try {
        const cart_list = cart.reduce(
          (acc: { product_id: number; quantity: number }[], cur) => {
            acc.push({ product_id: cur.id, quantity: cur.quantity });
            return acc;
          },
          []
        );
        const response = await getFeeShip({
          voucher_code: voucher?.code,
          cart_list,
          receiver_name: address.name,
          phone_number: address.phone_number,
          address: address.address,
          service_id: service_id.toString(),
          to_district_id: address.district_id.toString(),
          to_ward_code: address.ward_code.toString()
        });
        setCartList(response.data.cart_list);
        setFee({
          service_fee: response.data.fee.service_fee,
          insurance_fee: response.data.fee.insurance_fee,
          total_product_price: response.data.totalMoney
        });
        setTotalPrice(
          response.data.totalMoney +
            response.data.fee.service_fee +
            response.data.fee.insurance_fee
        );
      } catch (err) {
        console.log(err);
      }
    };
    getFee();
  }, []);

  const handleCheckout = async () => {
    try {
      const cart_list = cartList.reduce(
        (acc: { product_id: number; quantity: number }[], cur) => {
          acc.push({ product_id: cur.id, quantity: cur.quantity });
          return acc;
        },
        []
      );
      const response = await checkOut({
        address: address.address,
        cart_list,
        phone_number: address.phone_number,
        receiver_name: address.name,
        service_id,
        to_district_id: address.district_id,
        to_ward_code: address.ward_code
      });
      if (response.status === 200) {
        window.location.href = response.data.vnpayURL;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-auto w-5/6 text-lg flex justify-between">
      <div className="w-[68%]">
        <Spring className="card min-h-[70vh]">
          {cart.length > 0 ? (
            <div>
              <div className="flex justify-between items-center pb-5 border-slate-500 ">
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
              </div>
              {cart.map(({ id, image, name, price, quantity, sale }) => {
                return (
                  <div
                    className="flex justify-between items-center border-t-1 py-5 border-slate-500 mt-3"
                    key={id}
                  >
                    <div className="w-[12%] border rounded">
                      <img src={image} alt="Product" />
                    </div>
                    <p className="text-sm w-[38%] px-2 -translate-y-7">
                      {name}
                    </p>
                    <div>
                      {sale && (
                        <p
                          className={`text-medium text-black w-[10%] text-center`}
                        >
                          {numberToVND(sale)}
                        </p>
                      )}
                      <p
                        className={`text-medium text-black w-[10%] text-center ${sale && "line-through text-sm"}`}
                      >
                        {numberToVND(price)}
                      </p>
                    </div>
                    <p className="text-medium text-slate-500 w-[20%] flex items-center justify-center px-7 text-center">
                      {quantity}
                    </p>
                    <p className="text-medium text-black w-[10%] text-center tracking-tighter">
                      {numberToVND((sale ? sale : price) * quantity)}
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
            className="rounded-lg border-2 border-red-700 mt-2 w-full h-[65%] border-dashed justify-between bg-[url('../assets/map.png')] cursor-pointer"
            // onClick={() => nav("/dia-chi-khach-hang")}
          >
            {address ? (
              <Card className="w-full bg-transparent h-full">
                <CardBody className="overflow-hidden">
                  <p className="text-base">
                    {address.name} - {address.phone_number}
                  </p>
                  <p className="text-base">{address.address}</p>
                </CardBody>
                <Divider />
              </Card>
            ) : (
              <div className="flex items-center px-7 justify-between w-full">
                <div className="w-2/12">
                  {/* <img src={Navigate} alt="Navigate" className="w-6/12" /> */}
                </div>
                <p className="text-base text-red-700 font-medium">
                  Xác định địa chỉ nhận hàng
                </p>
              </div>
            )}
          </button>
        </Spring>
        <Spring className="card row-span-8 text-slate-500">
          <div className="flex items-center justify-between text-base">
            <p>Tiền Hàng</p>
            <p className="text-black-500">
              {numberToVND(fee.total_product_price)}
            </p>
          </div>
          <div className="flex items-center justify-between text-base mt-2 ">
            <p>Chi Phí Vận Chuyển</p>
            <p className="">
              {numberToVND(fee.service_fee + fee.insurance_fee)}
            </p>
          </div>
          <div className="flex items-center justify-between text-base ">
            <p className="ml-2 text-sm italic">Phí Dịch Vụ</p>
            <p className="text-black-500 text-sm italic">
              {numberToVND(fee.service_fee)}
            </p>
          </div>
          <div className="flex items-center justify-between text-base">
            <p className="ml-2 text-sm italic">Phí Bảo Hiểm</p>
            <p className="text-black-500 text-sm italic">
              {numberToVND(fee.insurance_fee)}
            </p>
          </div>
          <div className="flex items-center justify-between text-base">
            <p className="italic ">Voucher Giảm Giá</p>
            <p className="italic">{numberToVND(voucher?.value || 0)}</p>
          </div>
          <div className="flex items-center justify-between text-base mt-2 pb-2 border-b-1">
            <p className="italic text-pink-500">Điểm Tích Lũy</p>
            <p className="text-pink-500 italic">
              {numberToVND(totalPrice * 0.01)}
            </p>
          </div>
          <div className="flex items-start justify-between text-base mt-2 font-semibold">
            <p>Tổng tiền</p>
            <div className="text-right">
              <p>{numberToVND(totalPrice)}</p>
              <p className="font-normal italic">(Đã bao gồm VAT)</p>
            </div>
          </div>
          <Button
            fullWidth
            isDisabled={cart.length === 0 || !address}
            className="mt-4 bg-zinc-400 font-medium text-white text-lg"
            onClick={handleCheckout}
          >
            Mua hàng
          </Button>
        </Spring>
      </div>
    </div>
  );
};

export default ConfirmOrder;
