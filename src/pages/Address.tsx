import Spring from "../components/Spring";
import DocumentTitle from "../components/DocumentTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import InputControl from "../components/InputControl";
import { Button } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ProfileBar from "../layout/user/ProfileBar";

type ProfileForm = {
  name: string;
  address: string;
  default_address: boolean;
  phone_number: string;
};

const Address = () => {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileForm>();

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
      <DocumentTitle title="Địa Chỉ" />
      <div className="mx-auto w-5/6 grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <ProfileBar />
        </div>
        <Spring className="card col-span-9">
          <div className="border-b-1 pb-3 border-b-slate-500">
            <h3 className="text-xl">Hồ Sơ Của Tôi</h3>
            <p className="">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <form
            className="grid grid-cols-6 gap-10 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-span-4 pl-3">
              <div className="mt-3">
                <p className="pl-2">Họ Và Tên Người Nhận</p>
                <InputControl
                  register={register}
                  name="name"
                  isError={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              </div>
              <div className="mt-3">
                <p className="pl-2">Số điện thoại</p>
                <InputControl
                  register={register}
                  name="phone_number"
                  isError={!!errors.phone_number}
                  errorMessage={errors.phone_number?.message}
                />
              </div>
              <div className="mt-3">
                <p className="pl-2">Địa Chỉ</p>
              </div>
              <Button className="mt-5 " color="primary" type="submit">
                Lưu
              </Button>
            </div>
            <div className="col-span-2 border flex flex-col items-center justify-center"></div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default Address;
