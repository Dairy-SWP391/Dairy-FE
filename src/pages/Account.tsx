import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import PageHeader from "../layout/admin/PageHeader";
import { useState } from "react";
import { useAsyncList } from "@react-stately/data";

type AccountType = {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  point: number;
  role: "MEMBER" | "STAFF" | "ADMIN";
  status: "UNVERIFIED" | "VERIFIED";
};

const Account = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState<AccountType[] | null>([
    {
      id: "staff001",
      first_name: "Phạm Quốc",
      last_name: "Quyền",
      phone_number: "0868515009",
      email: "gobyysamaaaaaa@gmail.com",
      point: 100,
      role: "MEMBER",
      status: "UNVERIFIED"
    }
  ]);

  const list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        setPage((prev) => prev + 1);
      }

      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(
        cursor || "https://swapi.py4e.com/api/people/?search=",
        { signal }
      );

      const json = await res.json();

      if (!cursor) {
        setIsLoading(false);
      }

      return {
        items: json.results,
        cursor: json.next
      };
    }
  });

  const hasMore = page < 9;

  return (
    <>
      <PageHeader title="Accounts Management" />
      <div
        className="card no-hover flex flex-col gap-5 !p-5 mb-5 md:mb-[26px] md:!p-[26px] lg:!py-5 lg:flex-row
                   lg:items-center lg:gap-4"
      >
        <Table
          isHeaderSticky
          aria-label="Example static collection table"
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button
                  isDisabled={list.isLoading}
                  variant="flat"
                  onPress={list.loadMore}
                >
                  {list.isLoading && <Spinner color="white" size="sm" />}
                  Load More
                </Button>
              </div>
            ) : null
          }
          selectionMode="multiple"
        >
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
                  {
                    id,
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    role,
                    status,
                    point
                  },
                  index
                ) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{id}</TableCell>
                    <TableCell>{`${first_name} ${last_name}`}</TableCell>
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
                      <button className="btn">
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
      </div>
    </>
  );
};

export default Account;
