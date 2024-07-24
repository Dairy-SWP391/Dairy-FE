import { useEffect, useState } from "react";
import DocumentTitle from "../components/DocumentTitle";
import Spring from "../components/Spring";
import ProfileBar from "../layout/user/ProfileBar";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  useDisclosure
} from "@nextui-org/react";
import { numberToVND } from "../utils/converter";
import {
  getAllOrder,
  getOrderDetail,
  GetOrderDetailResponse,
  OrderType
} from "../apis/order";
import dayjs from "dayjs";

const Order = () => {
  const [order, setOrder] = useState<OrderType[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const orderStatus = ["DELIVERING", "SUCCESS", "CANCELLED", "PENDING", "ALL"];
  const [detail, setDetail] = useState<Pick<
    GetOrderDetailResponse,
    "data"
  > | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAllOrder();
        if (response.status === 200) {
          setOrder(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  const handleOpenOrderDetail = async (id: number) => {
    const response = await getOrderDetail(id);
    if (response.status === 200) {
      setDetail(response.data);
    }
    onOpen();
  };

  return (
    <>
      <DocumentTitle title="Thông Tin Cá Nhân" />
      <div className="mx-auto w-5/6 grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <ProfileBar />
        </div>
        <Spring className="card col-span-9">
          <div className="border-b-1 pb-3 border-b-slate-500">
            <h3 className="text-xl">Lịch Sử Đơn Hàng</h3>
          </div>
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options" className="mt-5">
              {orderStatus.map((status) => (
                <Tab key={status} title={status}>
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn width={20}>No.</TableColumn>
                      <TableColumn width={150}>NGƯỜI NHẬN</TableColumn>
                      <TableColumn>SĐT</TableColumn>
                      <TableColumn width={200}>ĐỊA CHỈ</TableColumn>
                      <TableColumn width={100}>TỔNG TIỀN</TableColumn>
                      <TableColumn width={100}>THỜI GIAN</TableColumn>
                      <TableColumn width={100}>TRẠNG THÁI</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {order.length > 0
                        ? order
                            .filter((item) =>
                              status === "ALL" ? true : item.status === status
                            )
                            ?.map((item, index) => (
                              <TableRow
                                key={item.id}
                                onClick={() => handleOpenOrderDetail(item.id)}
                                className="hover:bg-gray-100 cursor-pointer"
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.receiver_name}</TableCell>
                                <TableCell>{item.phone_number}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>
                                  {numberToVND(item.end_price)}
                                </TableCell>
                                <TableCell>
                                  {dayjs(item.created_at)
                                    .format("DD/MM/YYYY")
                                    .toString()}
                                </TableCell>
                                <TableCell>{item.status}</TableCell>
                              </TableRow>
                            ))
                        : []}
                    </TableBody>
                  </Table>
                </Tab>
              ))}
            </Tabs>
          </div>
        </Spring>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Chi Tiết Đơn Hàng
                </ModalHeader>
                <ModalBody>
                  <p className="text-3xl text-center font-bold">
                    THÔNG TIN ĐƠN HÀNG
                  </p>
                  <div className="flex justify-between">
                    <div className="text-lg">
                      <p>Người nhận: {detail?.data.receiver_name}</p>
                      <p>SĐT: {detail?.data.phone_number}</p>
                      <p>Địa chỉ: {detail?.data.address}</p>
                    </div>
                    <div className="text-lg">
                      <p>Mã đơn hàng: {detail?.data.id}</p>
                      <p>
                        Mã tra cứu thông tin giao hàng:{" "}
                        {detail?.data.order_ghn_code}
                      </p>
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
                              <TableCell>
                                {numberToVND(item.price as number)}
                              </TableCell>
                              <TableCell>
                                {numberToVND(item.sale_price as number)}
                              </TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                {numberToVND(
                                  (item.sale_price * item.quantity) as number
                                )}
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
                            ? numberToVND(
                                (detail.data.end_price -
                                  detail.data.discount) as number
                              )
                            : "Đang tải..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Order;
