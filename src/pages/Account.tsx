import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import PageHeader from "../layout/admin/PageHeader";
import { useCallback, useEffect, useState } from "react";
import { AccountType, deleteUser, getAllUser } from "../apis/user";
import { toast } from "react-toastify";

const Account = () => {
  const [accounts, setAccounts] = useState<AccountType[] | null>();
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const deleteAccount = useCallback(
    async (id: string) => {
      const result = confirm("Are you sure you want to delete this account?");
      if (!result) return;
      const res = await deleteUser({
        user_id: id
      });
      if (res.status === 200) {
        const newAccounts = accounts?.filter((account) => account.id !== id);
        setAccounts(newAccounts);
        toast.success("Delete account successfully");
      }
    },
    [accounts]
  );

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllUser(page);
      setAccounts(res.data.result.users);
      setTotalPage(res.data.result.total_page);
    };
    fetch();
  }, [page]);

  return (
    <>
      <PageHeader title="Accounts Management" />
      <div className="card no-hover flex flex-col gap-5 ">
        <Table isHeaderSticky aria-label="Accounts List">
          <TableHeader>
            <TableColumn>No.</TableColumn>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PHONE NUMBER</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>POINT</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>

          {accounts ? (
            <TableBody>
              {accounts.map(
                (
                  { id, name, email, phone_number, role, status, point },
                  index
                ) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{phone_number}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{point}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell className="flex items-center">
                      <button className="btn">
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </button>
                      <button className="btn" onClick={() => deleteAccount(id)}>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          ) : (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          )}
        </Table>
        <Pagination
          showControls
          total={totalPage}
          initialPage={page}
          onChange={setPage}
        />
      </div>
    </>
  );
};

export default Account;
