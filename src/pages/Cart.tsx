import Spring from "../components/Spring";
import Navigate from "../assets/navigate.png";
import { useNavigate } from "react-router-dom";
import { numberToVND } from "../utils/converter";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure
} from "@nextui-org/react";
import { useCartStore } from "../store/cart";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { AddressType, getAllAddress } from "../apis/user";
import { useAuth } from "../provider/AuthProvider";
import { getPackageService } from "../apis/ship";
import { getAllVouchers, VoucherType } from "../apis/voucher";
import dayjs from "dayjs";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const [address, setAddress] = useState<AddressType | null>(null);
  const [selectedService, setSelectedService] = useState<number>();
  const [vouchers, setVouchers] = useState<VoucherType[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherType>();
  const [allAddress, setAllAddress] = useState<AddressType[]>([]);
  const [modalContent, setModalContent] = useState<
    "SERVICE" | "ADDRESS" | "VOUCHER"
  >();
  const [service, setService] = useState<
    { service_id: number; short_name: string }[]
  >([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { token } = useAuth();
  const totalPrice = cart.reduce(
    (total, item) =>
      total + (item.sale ? item.sale : item.price) * item.quantity,
    0
  );
  const nav = useNavigate();
  const sale = 0;
  const handleChangeQuantity = ({
    type,
    id
  }: {
    type: "increase" | "decrease";
    id: number;
  }) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        if (type === "increase") {
          if (item.quantity + 1 > item.max_quantity) {
            toast.error("Số lượng sản phẩm vượt quá giới hạn");
            return item;
          }
          return {
            ...item,
            quantity: item.quantity + 1
          };
        } else {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
      }
      return item;
    });
    const finalCart = newCart.filter((item) => item.quantity > 0);
    useCartStore.setState({ cart: finalCart });
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await getAllAddress(token.access_token as string);
        if (response.status === 200) {
          setAllAddress(response.data.result);
          const defaultAddress = response.data.result.find(
            (address) => address.default_address
          );
          if (defaultAddress) {
            setAddress(defaultAddress);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAddress();
  }, []);

  const handleGetService = async () => {
    try {
      const response = await getPackageService(
        address?.district_id.toString() as string
      );
      if (response.status === 200) {
        setModalContent("SERVICE");
        setService(response.data);
        onOpen();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAddress = () => {
    setModalContent("ADDRESS");
    onOpen();
  };

  const handleSelectDiscount = async () => {
    setModalContent("VOUCHER");
    try {
      const response = await getAllVouchers({
        limit: 6,
        page: 1,
        status: "ACTIVE"
      });
      if (response.status === 200) {
        setVouchers(response.data.data.items);
      }
    } catch (err) {
      toast.error("Hệ thống đang bận, vui lòng thử lại sau");
    }
    onOpen();
  };

  const handleSubmit = () => {
    if (selectedService === undefined) {
      toast.error("Vui lòng chọn phương thức vận chuyển");
      return;
    }
    localStorage.setItem("address", JSON.stringify(address));
    nav("/confirm-order", {
      state: {
        service_id: selectedService,
        address,
        voucher: selectedVoucher
      }
    });
  };

  const handleRemoveFromCart = (id: number) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (confirm) {
      const newCart = cart.filter((item) => item.id !== id);
      useCartStore.setState({ cart: newCart });
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
                <p className="text-medium text-slate-500 w-[10%] text-center"></p>
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
                    <p className="text-medium text-slate-500 w-[20%] flex items-center justify-between px-7 text-center">
                      <Button
                        className="text-xl"
                        onClick={() =>
                          handleChangeQuantity({ type: "decrease", id })
                        }
                        size="sm"
                        isIconOnly
                      >
                        -
                      </Button>
                      <p className="text-black">{quantity}</p>
                      <Button
                        className="text-xl"
                        onClick={() =>
                          handleChangeQuantity({ type: "increase", id })
                        }
                        size="sm"
                        isIconOnly
                      >
                        +
                      </Button>
                    </p>
                    <p className="text-medium text-black w-[10%] text-center tracking-tighter">
                      {numberToVND((sale ? sale : price) * quantity)}
                    </p>
                    <p className="text-medium text-slate-500 w-[10%] flex justify-end items-center">
                      <button onClick={() => handleRemoveFromCart(id)}>
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
            className="rounded-lg border-2 border-red-700 mt-2 w-full h-[65%] border-dashed justify-between bg-[url('../assets/map.png')] cursor-pointer"
            onClick={handleSelectAddress}
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
                  <img src={Navigate} alt="Navigate" className="w-6/12" />
                </div>
                <p className="text-base text-red-700 font-medium">
                  Xác định địa chỉ nhận hàng
                </p>
              </div>
            )}
          </button>
        </Spring>
        <Spring className="card row-span-3">
          <h3 className="text-lg text-black">Ưu đãi & mã giảm giá</h3>
          <button
            onClick={handleSelectDiscount}
            className="rounded-lg border-2 border-yellow-500 mt-3 h-[50%] w-full flex items-center justify-between px-6 cursor-pointer"
          >
            <div className="w-1/12">
              <img
                src={
                  "https://cdn1.concung.com/themes/desktop4.1/image/v40/icon/voucher.png"
                }
                alt="Navigate"
              />
            </div>
            <p className="text-base text-orange-500 font-medium tracking-tight">
              Bấm vào để Chọn/Nhập Mã ưu đãi
            </p>
          </button>
        </Spring>
        <Spring className="card row-span-8 text-slate-500">
          <div className="flex items-center justify-between text-base">
            <p>Tính tạm</p>
            <p>{numberToVND(totalPrice)}</p>
          </div>
          <div className="flex items-center justify-between text-base mt-2 pb-2 border-b-1">
            <p className="italic">Giảm giá</p>
            <p className="text-pink-500">
              {numberToVND(selectedVoucher?.value || 0)}
            </p>
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
            isDisabled={cart.length === 0 || !address}
            className="mt-4 bg-zinc-400 font-medium text-white text-lg"
            onClick={handleGetService}
            // onPress={onOpen}
          >
            Mua hàng
          </Button>
        </Spring>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          {modalContent === "SERVICE" && (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Hình Thức Vận Chuyển
                  </ModalHeader>
                  <ModalBody>
                    <RadioGroup
                      label="Vui lòng chọn phương thức vận chuyển"
                      value={selectedService?.toString()}
                      onChange={(e) => setSelectedService(+e.target.value)}
                      isRequired
                    >
                      {service.map(({ service_id, short_name }) => (
                        <Radio value={service_id.toString()} key={service_id}>
                          {short_name}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={handleSubmit}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          )}
          {modalContent === "ADDRESS" && (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Địa Chỉ Nhận Hàng
                  </ModalHeader>
                  <ModalBody>
                    <RadioGroup
                      label="Vui lòng chọn địa chỉ nhận hàng"
                      value={address?.id.toString()}
                      onChange={(e) => setSelectedService(+e.target.value)}
                      isRequired
                    >
                      {allAddress.map((item) => (
                        <Radio value={item.id.toString()} key={item.id}>
                          <Card>
                            <CardBody>
                              <p>
                                {item.name} - {item.phone_number}
                              </p>
                              <p>{item.address}</p>
                            </CardBody>
                          </Card>
                        </Radio>
                      ))}
                    </RadioGroup>
                    <Link href="/me/address">Thêm địa chỉ mới</Link>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={console.log}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          )}
          {modalContent === "VOUCHER" && (
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Mã Giảm Giá
                  </ModalHeader>
                  <ModalBody>
                    {vouchers.length > 0 ? (
                      vouchers.map((voucher) => (
                        <div key={voucher.code} className="flex mx-auto">
                          <div className="bg-pink-100 w-44 h-16 rounded-l-md py-2 flex flex-col items-center justify-around border-r-red-500 border-dashed border-r-2">
                            <h5 className="text-red-500">
                              {numberToVND(voucher.value)}
                            </h5>
                            <p className="text-sm">
                              HSD:{" "}
                              {dayjs(voucher.expired_at).format("DD/MM/YYYY")}
                            </p>
                          </div>
                          <div className="bg-pink-100 w-52 h-16 rounded-r-md px-2">
                            <h5 className="flex flex-col justify-between my-2">
                              <h6 className="text-center text-red-800">
                                Tất cả sản phẩm
                              </h6>
                              <div className="flex justify-between items-center mt-2 px-1">
                                <div>
                                  <p className="text-xs font-normal italic">
                                    {voucher.trading_point} điểm
                                  </p>
                                </div>
                                <button
                                  className="border text-sm px-2 py-[2px] text-white rounded bg-red-400"
                                  onClick={() => {
                                    const user = localStorage.getItem("user")
                                      ? JSON.parse(
                                          localStorage.getItem("user") as string
                                        )
                                      : null;
                                    if (user.point < voucher.trading_point) {
                                      toast.error("Số điểm không đủ để đổi mã");
                                      return;
                                    }
                                    setSelectedVoucher(voucher);
                                    toast.success("Đổi mã thành công");
                                    onClose();
                                  }}
                                >
                                  Đổi mã
                                </button>
                              </div>
                            </h5>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>Không có mã giảm giá nào</div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Cart;
