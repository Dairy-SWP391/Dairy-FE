import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Spring from "../components/Spring";
import DocumentTitle from "../components/DocumentTitle";

const Profile = () => {
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
          <Tabs aria-label="Options" className="flex justify-center">
            <Tab key="info" title="Thông Tin Cá Nhân">
              <div className="grid grid-cols-5 gap-10 border-t-1 pt-6">
                <div className="col-span-3 pl-3">
                  <p className="">
                    Vui lòng nhập đầy đủ thông tin bên dưới để nhận ưu đãi đặc
                    biệt
                  </p>
                </div>
                <div className="col-span-2 border flex items-center justify-center">
                  Avatar
                </div>
              </div>
            </Tab>
            <Tab key="address" title="Sổ Địa Chỉ">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </Spring>
      </div>
    </>
  );
};

export default Profile;
