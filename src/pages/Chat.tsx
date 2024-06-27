import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import PageHeader from "../layout/admin/PageHeader";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const nav = useNavigate();
  return (
    <>
      <PageHeader title="Chat List" />
      <div
        className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                 lg:items-center lg:gap-4"
      >
        <Table
          aria-label="Example static collection table"
          onRowAction={(key) => nav(`/admin/chats/${key}`)}
        >
          <TableHeader>
            <TableColumn>NO.</TableColumn>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="US240702162">
              <TableCell>1</TableCell>
              <TableCell>US240702162</TableCell>
              <TableCell>Phạm Quốc Quyền</TableCell>
              <TableCell>SEEN</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Chat;
