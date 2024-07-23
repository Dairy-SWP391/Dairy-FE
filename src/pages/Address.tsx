import Spring from "../components/Spring";
import DocumentTitle from "../components/DocumentTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import InputControl from "../components/InputControl";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
  SelectItem
} from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileBar from "../layout/user/ProfileBar";
import {
  DistrictType,
  ProvinceType,
  WardType,
  getDistrict,
  getProvince,
  getWard
} from "../apis/ship";
import {
  AddressType,
  addNewAddress,
  getAllAddress,
  updateAddress
} from "../apis/user";
import { useAuth } from "../provider/AuthProvider";
import SelectControl from "../components/SelectControl";
import { toast } from "react-toastify";

export type AddressForm = {
  name: string;
  phone_number: string;
  district_id: number;
  province_id: number;
  ward_code: number;
  address: string;
  default_address: boolean;
};

const Address = () => {
  const location = useLocation();
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [wards, setWards] = useState<WardType[]>([]);
  const [allAddress, setAllAddress] = useState<AddressType[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>();
  const [defaultAddress, setDefaultAddress] = useState<AddressType | null>(
    null
  );
  // const [address, setAddress] = useState<AddressType | null>(null);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<AddressForm>();

  const watchProvince = watch("province_id");
  const watchDistrict = watch("district_id");
  const watchWards = watch("ward_code");

  const onSubmit: SubmitHandler<AddressForm> = async (data) => {
    if (selectedAddressId) {
      //update
      try {
        const response = await updateAddress({
          id: selectedAddressId,
          ...data
        });
        if (response) {
          setAllAddress((prev) =>
            prev.map((address) =>
              address.id === selectedAddressId
                ? { id: selectedAddressId, ...data, user_id: user.id }
                : address
            )
          );
          setSelectedAddressId(null);
          if (data.default_address) {
            setDefaultAddress({
              id: selectedAddressId,
              ...data,
              user_id: user.id
            });
          }
          toast.success("Cập nhật địa chỉ thành công");
        }
      } catch (err) {
        console.log(err);
        toast.error("Cập nhật địa chỉ thất bại");
      }
    } else {
      // add new
      try {
        const response = await addNewAddress({
          access_token: token.access_token as string,
          address: { ...data, user_id: user.id }
        });
        if (response.status === 200) {
          if (data.default_address) {
            setDefaultAddress(response.data.result);
          }
          setAllAddress((prev) => [...prev, response.data.result]);
          toast.success("Thêm mới địa chỉ thành công");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await getProvince();
        if (response.status === 200) {
          setProvinces(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProvince();
    const fetchAllAddress = async () => {
      try {
        const response = await getAllAddress(token.access_token as string);
        if (response.status === 200) {
          setAllAddress(response.data.result);
          const defaultAddress = response.data.result.find(
            (address) => address.default_address
          );
          if (defaultAddress) {
            setDefaultAddress(defaultAddress);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAddress();
  }, [location]);

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const response = await getDistrict(watchProvince.toString());
        if (response.status === 200) {
          setDistricts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDistrict();
  }, [watchProvince]);

  useEffect(() => {
    const fetchWard = async () => {
      try {
        const response = await getWard(watchDistrict.toString());
        if (response.status === 200) {
          setWards(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchWard();
  }, [watchDistrict]);

  const handleClickUpdateAddress = (address: AddressType) => {
    setSelectedAddressId(address.id);
    setValue("name", address.name);
    setValue("phone_number", address.phone_number);
    setValue("address", address.address);
    setValue("default_address", address.default_address);
    setValue("province_id", address.province_id);
    setValue("district_id", address.district_id);
    setValue("ward_code", address.ward_code);
  };

  const handleCancelUpdateAddress = () => {
    setSelectedAddressId(null);
    setValue("name", "");
    setValue("phone_number", "");
    setValue("address", "");
    setValue("default_address", false);
    setValue("province_id", 0);
    setValue("district_id", 0);
    setValue("ward_code", 0);
  };

  return (
    <>
      <DocumentTitle title="Địa Chỉ" />
      <div className="mx-auto w-5/6 grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <ProfileBar />
        </div>
        <Spring className="card col-span-9 grid grid-cols-8 gap-10 mt-5">
          <div className="col-span-5">
            <div className="pb-3">
              <h3 className="text-xl">Thêm Mới Địa Chỉ Nhận Hàng</h3>
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="pl-3">
                <p className="">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <div className="mt-3">
                  <p className="pl-2 text-sm">Họ Và Tên Người Nhận</p>
                  <InputControl
                    register={register}
                    name="name"
                    isError={!!errors.name}
                    errorMessage={errors.name?.message}
                    value={watch("name")}
                  />
                </div>
                <div className="mt-3">
                  <p className="pl-2 text-xm">Số điện thoại</p>
                  <InputControl
                    register={register}
                    name="phone_number"
                    value={watch("phone_number")}
                    isError={!!errors.phone_number}
                    errorMessage={errors.phone_number?.message}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <SelectControl
                    register={register}
                    name="province_id"
                    label="Tỉnh Thành"
                    selectedKeys={[watchProvince]}
                    placeholder="Select province"
                  >
                    {provinces.map(({ ProvinceID, ProvinceName }) => (
                      <SelectItem key={ProvinceID}>{ProvinceName}</SelectItem>
                    ))}
                  </SelectControl>
                  <SelectControl
                    register={register}
                    name="district_id"
                    selectedKeys={[watchDistrict]}
                    label="Quận Huyện"
                    placeholder="Select district"
                  >
                    {districts.map(({ DistrictID, DistrictName }) => (
                      <SelectItem key={DistrictID}>{DistrictName}</SelectItem>
                    ))}
                  </SelectControl>
                  <SelectControl
                    register={register}
                    name="ward_code"
                    label="Phường Xã"
                    selectedKeys={[watchWards]}
                    placeholder="Select ward"
                  >
                    {wards.map(({ WardCode, WardName }) => (
                      <SelectItem className="z-0" key={WardCode}>
                        {WardName}
                      </SelectItem>
                    ))}
                  </SelectControl>
                </div>
                <div className="mt-3">
                  <InputControl
                    register={register}
                    name="address"
                    isError={!!errors.address}
                    errorMessage={errors.address?.message}
                    placeholder="Số nhà, tên đường, tên khu vực..."
                    value={watch("address")}
                  />
                </div>
                <div className="mt-3">
                  <Checkbox
                    {...register("default_address")}
                    isSelected={watch("default_address")}
                  >
                    Đặt làm địa chỉ mặc định
                  </Checkbox>
                </div>
                <Button className="mt-5" color="primary" type="submit">
                  {selectedAddressId ? "Cập nhật" : "Thêm mới"}
                </Button>
                {selectedAddressId && (
                  <Button
                    className="ml-5"
                    color="danger"
                    onClick={handleCancelUpdateAddress}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
          <div className="col-span-3 border flex flex-col justify-start px-3 max-h-[60vh] overflow-scroll overflow-x-hidden">
            {defaultAddress && (
              <Card className="max-w-[400px] min-h-44">
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <p className="text-md">{defaultAddress.name}</p>
                      <button
                        className="text-blue-500"
                        onClick={() => handleClickUpdateAddress(defaultAddress)}
                      >
                        Thay đổi
                      </button>
                    </div>
                    {defaultAddress.default_address && (
                      <p className="text-blue-500 italic">Địa chỉ mặc định</p>
                    )}
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-default-500">
                    {defaultAddress.phone_number}
                  </p>
                  <p>{defaultAddress.address}</p>
                </CardBody>
                <Divider />
              </Card>
            )}
            {allAddress.map((address, key) =>
              address.default_address ? null : (
                <Card key={key} className="max-w-[400px] mt-3 min-h-40">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between">
                        <p className="text-md">{address.name}</p>
                        <button
                          className="text-blue-500"
                          onClick={() => handleClickUpdateAddress(address)}
                        >
                          Thay đổi
                        </button>
                      </div>
                      {address.default_address && (
                        <p className="text-blue-500 italic">Địa chỉ mặc định</p>
                      )}
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p className="text-default-500">{address.phone_number}</p>
                    <p>{address.address}</p>
                  </CardBody>
                  <Divider />
                </Card>
              )
            )}
          </div>
        </Spring>
      </div>
    </>
  );
};

export default Address;
