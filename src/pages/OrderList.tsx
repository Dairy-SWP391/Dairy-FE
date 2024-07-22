import {
  Button,
  Input,
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
import PageHeader from "../layout/admin/PageHeader";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  cancelOrder,
  getAllOrder,
  OrderStatus,
  OrderType
} from "../apis/order";
import { numberToVND } from "../utils/converter";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const [cancelReason, setCancelReason] = useState<string>("");
  const [orderId, setOrderId] = useState<number>(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const nav = useNavigate();
  const orderStatus = ["DELIVERING", "SUCCESS", "CANCELLED", "PENDING"];

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAllOrder();
        if (response.status === 200) {
          setOrderList(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  const handleOnclickAction = (item: OrderType) => {
    if (item.status === "SUCCESS") {
      nav(`/admin/orders/${item.id}`);
    }
    if (item.status === "PENDING") {
      setOrderId(item.id);
      onOpen();
    }
    if (item.status === "CANCELLED") {
      nav(`/admin/orders/${item.id}`);
    }
  };

  const handleCancelOrder = async () => {
    const response = await cancelOrder({
      order_id: orderId,
      cancel_reason: cancelReason
    });
    if (response.status === 200) {
      setCancelReason("");
      onOpenChange();
      toast.success("Cancel order successfully");
      const newOrderList = orderList.map((item) => {
        if (item.id === orderId) {
          return { ...item, status: "CANCELLED" as OrderStatus };
        }
        return item;
      });
      setOrderList(newOrderList);
    }
  };

  return (
    <>
      <PageHeader title="Orders List" />
      <div className="card">
        <Tabs aria-label="Options">
          {orderStatus.map((status) => (
            <Tab key={status} title={status}>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn width={20}>ID</TableColumn>
                  <TableColumn width={130}>USER ID</TableColumn>
                  <TableColumn width={200}>RECEIVER NAME</TableColumn>
                  <TableColumn width={100}>PHONE</TableColumn>
                  <TableColumn>ADDRESS</TableColumn>
                  <TableColumn width={150}>TOTAL PRICE</TableColumn>
                  <TableColumn width={200}>DATE</TableColumn>
                  <TableColumn width={130}>STATUS</TableColumn>
                  <TableColumn width={90}>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                  {orderList.length > 0
                    ? orderList
                        .filter((item) => item.status === status)
                        .map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.user_id}</TableCell>
                            <TableCell>{item.receiver_name}</TableCell>
                            <TableCell>{item.phone_number}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{numberToVND(item.end_price)}</TableCell>
                            <TableCell>
                              {dayjs(item.created_at).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>
                              <Button
                                color={
                                  item.status !== "PENDING"
                                    ? "success"
                                    : "danger"
                                }
                                onClick={() => handleOnclickAction(item)}
                              >
                                {item.status !== "PENDING"
                                  ? "VIEW"
                                  : "CANCELLED"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    : []}
                </TableBody>
              </Table>
            </Tab>
          ))}
        </Tabs>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cancel Order
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Reason"
                  placeholder="Reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleCancelOrder}>
                  Cancel Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderList;
