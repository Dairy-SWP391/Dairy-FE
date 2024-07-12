import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import PageHeader from "../layout/admin/PageHeader";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getAllOrder, OrderType } from "../apis/order";

const OrderList = () => {
  const [orderList, setOrderList] = useState<OrderType[]>([]);
  const nav = useNavigate();

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

  return (
    <>
      <PageHeader title="Orders List" />
      <div
        className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
      >
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>USER ID</TableColumn>
            <TableColumn>DISCOUNT</TableColumn>
            <TableColumn>TOTAL PRICE</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            {orderList.length > 0
              ? orderList.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => nav(`/admin/orders/${item.id}`)}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.user_id}</TableCell>
                    <TableCell>{item.discount}</TableCell>
                    <TableCell>{item.end_price}</TableCell>
                    <TableCell>
                      {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default OrderList;
