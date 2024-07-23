import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from "@nextui-org/react";
import PageHeader from "../layout/admin/PageHeader";
import { useEffect, useState } from "react";
import { AccountType, banUser, getAllUser } from "../apis/user";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const Account = () => {
  const [accounts, setAccounts] = useState<AccountType[] | null>();
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      const res = await getAllUser(page);
      setAccounts(res.data.result.users);
      setTotalPage(res.data.result.total_page);
    };
    fetch();
  }, [page]);

  const handleInputBanReason = (id: string) => {
    setReason("");
    setSelectedAccountId(id);
    onOpen();
  };

  const handleBanUser = async () => {
    console.log(selectedAccountId, reason);
    try {
      let response;
      if (reason === "") {
        response = await banUser({
          user_id: selectedAccountId,
          status: "verified"
        });
      } else {
        response = await banUser({ user_id: selectedAccountId, reason });
      }
      if (response.status === 200) {
        toast.success(`${reason ? "Ban" : "Unban"} user successfully`);
        const res = await getAllUser(page);
        setAccounts(res.data.result.users);
        setTotalPage(res.data.result.total_page);
        setReason("");
        onOpenChange();
      }
    } catch (err) {
      console.log(err);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  // const handleUpdateAccount = async (account: AccountType) => {
  //   onOpen();
  //   try {
  //     const response = await updateUser(account);
  //     if (response.status === 200) {
  //       toast.success("Update account successfully");
  //       const res = await getAllUser(page);
  //       setAccounts(res.data.result.users);
  //       setTotalPage(res.data.result.total_page);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <PageHeader title="Accounts Management" />
      <div className="card no-hover flex flex-col gap-5 ">
        <Table isHeaderSticky aria-label="Accounts List">
          <TableHeader>
            <TableColumn width={120}>ID</TableColumn>
            <TableColumn width={150}>NAME</TableColumn>
            <TableColumn width={100}>PHONE NUMBER</TableColumn>
            <TableColumn width={150}>EMAIL</TableColumn>
            <TableColumn width={80}>POINT</TableColumn>
            <TableColumn width={100}>ROLE</TableColumn>
            <TableColumn width={100}>STATUS</TableColumn>
            <TableColumn>BAN REASON</TableColumn>
            <TableColumn width={50}>ACTIONS</TableColumn>
          </TableHeader>

          {accounts ? (
            <TableBody>
              {accounts.map(
                ({
                  id,
                  name,
                  email,
                  phone_number,
                  role,
                  ban_reason,
                  status,
                  point
                }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{phone_number}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{point}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>
                      {status !== "BANNED" ? "ACTIVE" : "BANNED"}
                    </TableCell>
                    <TableCell>{ban_reason}</TableCell>
                    <TableCell className="flex items-center">
                      <Button
                        onClick={() => handleInputBanReason(id)}
                        color={status === "BANNED" ? "success" : "danger"}
                      >
                        {/* <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i> */}
                        {status !== "BANNED" ? "BAN" : "UNBAN"}
                      </Button>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {accounts?.find((item) => item.id === selectedAccountId)
                  ?.status === "BANNED"
                  ? "UNBAN USER"
                  : "BAN USER"}
              </ModalHeader>
              {accounts?.find((item) => item.id === selectedAccountId)
                ?.status !== "BANNED" && (
                <ModalBody>
                  <Input
                    label="Reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </ModalBody>
              )}
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleBanUser}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Account;
