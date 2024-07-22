import { useEffect, useState } from "react";
import PageHeader from "../layout/admin/PageHeader";
import {
  Button,
  DatePicker,
  DateValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from "@nextui-org/react";
import {
  addVoucher,
  getAllVouchers,
  updateVoucher,
  VoucherType
} from "../apis/voucher";
import dayjs from "dayjs";
import { getDateFromISOString, numberToVND } from "../utils/converter";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputControl from "../components/InputControl";
import { parseDate } from "@internationalized/date";
import { toast } from "react-toastify";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState<VoucherType[] | null>();
  const [voucherAction, setVoucherAction] = useState<"ADD" | "UPDATE">("ADD");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [statusVoucher, setStatusVoucher] = useState<
    "ACTIVE" | "INACTIVE" | "ALL"
  >("ALL");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<
    Omit<VoucherType, "created_at" | "expired_at"> & { expired_at: DateValue }
  >();

  const handleUpdateVoucher = (voucher: VoucherType) => {
    setVoucherAction("UPDATE");
    setValue("id", voucher.id);
    setValue("code", voucher.code);
    setValue("value", voucher.value);
    setValue("trading_point", voucher.trading_point);
    setValue("expired_at", parseDate(getDateFromISOString(voucher.expired_at)));
    setValue("quantity", voucher.quantity);
    setValue("status", voucher.status);
    onOpen();
  };

  const handleAddVoucher = () => {
    setVoucherAction("ADD");
    setValue("id", 0);
    setValue("code", "");
    setValue("value", 0);
    setValue("trading_point", 0);
    setValue("expired_at", parseDate(dayjs().format("YYYY-MM-DD")));
    setValue("quantity", 0);
    setValue("status", "ACTIVE");
    onOpen();
  };

  useEffect(() => {
    const fetch = async () => {
      const res =
        statusVoucher === "ALL"
          ? await getAllVouchers({ limit: 10, page: page })
          : await getAllVouchers({
              limit: 10,
              page: page,
              status: statusVoucher
            });
      setVouchers(res.data.data.items);
      setTotalPage(res.data.data.total_page);
    };
    fetch();
  }, [page, statusVoucher]);

  const onSubmit: SubmitHandler<
    Omit<VoucherType, "created_at" | "expired_at"> & { expired_at: DateValue }
  > = async (data) => {
    console.log({
      ...data,
      expired_at: data.expired_at.toDate("+07:00").toISOString()
    });
    if (voucherAction === "ADD") {
      try {
        const response = await addVoucher({
          ...data,
          expired_at: data.expired_at.toDate("+07:00").toISOString()
        });
        if (response.status === 200) {
          toast.success("Add voucher successfully");
          const newVouchers = vouchers ? [...vouchers, response.data.data] : [];
          setVouchers(newVouchers);
          onOpenChange();
        }
      } catch (err) {
        console.log(err);
        toast.error("Add voucher failed, please try again later");
      }
    } else {
      try {
        const response = await updateVoucher({
          ...data,
          expired_at: data.expired_at.toDate("+07:00").toISOString()
        });
        if (response.status === 200) {
          toast.success("Update voucher successfully");
          const newVouchers = vouchers?.map((voucher) =>
            voucher.id === data.id ? response.data.data : voucher
          );
          setVouchers(newVouchers);
          onOpenChange();
        }
      } catch (err) {
        console.log(err);
        toast.error("Update voucher failed, please try again later");
      }
    }
  };

  return (
    <>
      <PageHeader title="Vouchers Management" />
      <div className="card no-hover flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <Button size="lg" color="primary" onClick={handleAddVoucher}>
            ADD VOUCHER
          </Button>
          <Select
            label="VOUCHER STATUS"
            variant="bordered"
            placeholder="Select an animal"
            className="max-w-44"
            selectedKeys={[statusVoucher]}
            onChange={(e) =>
              setStatusVoucher(e.target.value as "ACTIVE" | "INACTIVE" | "ALL")
            }
          >
            <SelectItem key="ALL" value="ALL">
              All
            </SelectItem>
            <SelectItem key="ACTIVE" value="ACTIVE">
              Active
            </SelectItem>
            <SelectItem key="INACTIVE" value="INACTIVE">
              Inactive
            </SelectItem>
          </Select>
        </div>

        <Table isHeaderSticky aria-label="Accounts List">
          <TableHeader>
            <TableColumn width={20}>ID</TableColumn>
            <TableColumn width={50}>CODE</TableColumn>
            <TableColumn width={150}>VALUE</TableColumn>
            <TableColumn>TRADING POINT</TableColumn>
            <TableColumn width={100}>QUANTITY</TableColumn>
            <TableColumn width={150}>EXPIRED AT</TableColumn>
            <TableColumn width={100}>STATUS</TableColumn>
            <TableColumn width={100}>ACTIONS</TableColumn>
          </TableHeader>
          {vouchers ? (
            <TableBody>
              {vouchers.map(
                ({
                  id,
                  code,
                  expired_at,
                  created_at,
                  quantity,
                  status,
                  trading_point,
                  value
                }) => (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{code}</TableCell>
                    <TableCell>{numberToVND(value)}</TableCell>
                    <TableCell>{trading_point}</TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>
                      {dayjs(expired_at).format("DD/MM/YYYY").toString()}
                    </TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell className="flex items-center">
                      <button
                        className="btn ps-0 pe-0 !px-3"
                        onClick={() =>
                          handleUpdateVoucher({
                            id,
                            code,
                            expired_at,
                            created_at,
                            quantity,
                            status,
                            trading_point,
                            value
                          })
                        }
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {voucherAction === "ADD" ? "ADD VOUCHER" : "UPDATE VOUCHER"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-5 justify-between">
                    <InputControl
                      label="ID"
                      register={register}
                      name="id"
                      isError={!!errors.id}
                      variant="faded"
                      disabled
                    />
                    <InputControl
                      register={register}
                      label="CODE"
                      name="code"
                      variant="faded"
                      isError={!!errors.code}
                      disabled={voucherAction === "ADD" ? false : true}
                    />
                  </div>
                  <div className="flex gap-5 justify-between mt-5">
                    <InputControl
                      label="VALUE"
                      register={register}
                      name="value"
                      isError={!!errors.value}
                      className="w-[38%]"
                    />
                    <InputControl
                      label="TRADING POINT"
                      register={register}
                      name="trading_point"
                      isError={!!errors.trading_point}
                      className="w-[38%]"
                    />
                    <InputControl
                      label="QUANTITY"
                      register={register}
                      name="quantity"
                      isError={!!errors.quantity}
                      className="w-[24%]"
                    />
                  </div>
                  <div className="flex justify-between gap-5 mt-5">
                    <Controller
                      name="expired_at"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="EXPIRED AT"
                          isInvalid={!!errors.expired_at}
                          variant="bordered"
                          className="w-3/4"
                          // onChange={(date) => setValue("expired_at", date)}
                          {...field}
                        />
                      )}
                    />
                    <Select
                      label="STATUS"
                      isInvalid={!!errors.status}
                      className="w-1/4"
                      variant="bordered"
                      {...register("status")}
                    >
                      <SelectItem key="ACTIVE" value="ACTIVE">
                        ACTIVE
                      </SelectItem>
                      <SelectItem key="INACTIVE" value="INACTIVE">
                        INACTIVE
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="mt-5 flex items-center justify-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit">
                      Update
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Vouchers;
