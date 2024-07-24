import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Spring from "../components/Spring";
import { getOrderDetail, GetOrderDetailResponse } from "../apis/order";
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { numberToVND } from "../utils/converter";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useCartStore } from "../store/cart";

const PaymentSuccess = () => {
  const location = useLocation();
  const { setCart } = useCartStore();
  const [detail, setDetail] = useState<Pick<
    GetOrderDetailResponse,
    "data"
  > | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const order_id = parseInt(searchParams.get("order_id") as string);
    const fetchOrderDetail = async () => {
      const response = await getOrderDetail(order_id);
      if (response.status === 200) {
        setDetail(response.data);
      }
    };

    fetchOrderDetail();
    setCart([]);
    localStorage.removeItem("cart");
    toast.success("Thanh toán thành công!");
  }, [location.search]);

  return (
    <Spring className="card w-4/6 mx-auto h-[65vh]">
      <p className="text-3xl text-center font-bold">THÔNG TIN ĐƠN HÀNG</p>
      <div className="flex justify-between">
        <div className="text-lg">
          <p>Người nhận: {detail?.data.receiver_name}</p>
          <p>SĐT: {detail?.data.phone_number}</p>
          <p>Địa chỉ: {detail?.data.address}</p>
        </div>
        <div className="text-lg">
          <p>Mã đơn hàng: {detail?.data.id}</p>
          <p>Mã tra cứu thông tin giao hàng: {detail?.data.order_ghn_code}</p>
          <p>
            Thời gian giao hàng dự kiến:{" "}
            {dayjs(detail?.data.expected_delivery_time)
              .format("DD/MM/YYYY")
              .toString()}
          </p>
        </div>
      </div>
      <Table className="mt-3">
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>TÊN</TableColumn>
          <TableColumn>GIÁ GỐC</TableColumn>
          <TableColumn>GIÁ MUA</TableColumn>
          <TableColumn>SỐ LƯỢNG</TableColumn>
          <TableColumn>THÀNH TIỀN</TableColumn>
        </TableHeader>
        <TableBody>
          {detail && detail.data
            ? detail?.data.order_detail.map((item, index) => (
                <TableRow key={item.product_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{numberToVND(item.price as number)}</TableCell>
                  <TableCell>
                    {numberToVND(item.sale_price as number)}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {numberToVND((item.sale_price * item.quantity) as number)}
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
      <div className="mt-3 flex flex-col items-end mr-5">
        <div className="flex justify-between w-60">
          <div>
            <p className="">Tổng cộng:</p>
          </div>
          <div>
            <p className="">
              {detail
                ? numberToVND(detail.data.estimate_price as number)
                : "Đang tải..."}
            </p>
          </div>
        </div>
        <div className="flex justify-between w-60">
          <div>
            <p className="">Phí vận chuyển:</p>
          </div>
          <div>
            <p className="">
              {detail
                ? numberToVND(detail.data.ship_fee as number)
                : "Đang tải..."}
            </p>
          </div>
        </div>
        <div className="flex justify-between w-60">
          <div>
            <p className="">Giảm giá:</p>
          </div>
          <div>
            <p className="">
              {detail
                ? numberToVND(detail.data.discount as number)
                : "Đang tải..."}
            </p>
          </div>
        </div>
        <div className="flex justify-between w-60">
          <div>
            <p className="">Thành tiền:</p>
          </div>
          <div>
            <p className="">
              {detail
                ? numberToVND(detail.data.end_price as number)
                : "Đang tải..."}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Link className="mt-5 text-xl" href="/">
          Về Trang Chủ
        </Link>
      </div>
    </Spring>
  );
};

export default PaymentSuccess;
