import Spring from "../components/Spring";
import DocumentTitle from "../components/DocumentTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import InputControl from "../components/InputControl";
import { Avatar, Button } from "@nextui-org/react";
import SingleFileUploader from "../components/SingleFileUploader";

type ProfileForm = {
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar_url: string;
};

const Profile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ProfileForm>();

  const handleUploadImage = (url: string) => {
    setValue("avatar_url", url);
  };

  const onSubmit: SubmitHandler<ProfileForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <DocumentTitle title="Thông Tin Cá Nhân" />
      <div className="mx-auto w-5/6 grid grid-cols-10 gap-10">
        <div className="col-span-2">
          <Spring className="card">
            <div></div>
          </Spring>
        </div>
        <Spring className="card col-span-8">
          <div className="border-b-1 pb-3 border-b-slate-500">
            <h3 className="text-xl">Hồ Sơ Của Tôi</h3>
            <p className="">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <form
            className="grid grid-cols-5 gap-10 mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-span-3 pl-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="pl-2">Họ</p>
                  <InputControl
                    register={register}
                    name="first_name"
                    isError={!!errors.first_name}
                    errorMessage={errors.first_name?.message}
                  />
                </div>
                <div>
                  <p className="pl-2">Tên</p>
                  <InputControl
                    register={register}
                    name="last_name"
                    isError={!!errors.last_name}
                    errorMessage={errors.last_name?.message}
                  />
                </div>
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
              <Button className="mt-5" color="primary" type="submit">
                Lưu
              </Button>
            </div>
            <div className="col-span-2 border flex flex-col items-center justify-center">
              <Avatar
                size="lg"
                showFallback
                src={watch("avatar_url") || "/avatar.png"}
              />
              <SingleFileUploader
                placeholder="Chọn Ảnh"
                handleGetUrl={handleUploadImage}
              />
            </div>
          </form>
        </Spring>
      </div>
    </>
  );
};

export default Profile;
