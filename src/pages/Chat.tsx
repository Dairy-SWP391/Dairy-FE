import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import PageHeader from "../layout/admin/PageHeader";
import { ChatRooms, getAllChatRooms } from "../apis/conversations";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [chatList, setChatList] = useState<ChatRooms[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getAllChatRooms();
        if (response.status === 200) {
          setChatList(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  return (
    <>
      <PageHeader title="Chat List" />
      <div
        className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                 lg:items-center lg:gap-4"
      >
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>USER ID</TableColumn>
            <TableColumn>DATE</TableColumn>
          </TableHeader>
          <TableBody>
            {chatList.length > 0
              ? chatList.map((item) => (
                  <TableRow
                    key={item.id}
                    onClick={() => nav(`/admin/chats/${item.member_id}`)}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.member_id}</TableCell>
                    <TableCell>
                      {dayjs(item.updated_at).format("YYYY-MM-DD HH:mm:ss")}
                    </TableCell>
                  </TableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Chat;
