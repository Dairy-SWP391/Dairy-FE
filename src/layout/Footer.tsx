import { Link } from "@nextui-org/react";
import ApplePay from "@assets/payment/applepay.svg";
import BitPay from "@assets/payment/bitpay.svg";
import GooglePay from "@assets/payment/googlepay.svg";
import mc from "@assets/payment/mc.svg";
import Paypal from "@assets/payment/paypal.svg";
import Visa from "@assets/payment/visa.svg";

const Footer = () => {
  return (
    <div className="w-full bg-slate-100 min-h-[30vh] py-5 px-10 mt-5 grid grid-cols-9 gap-10">
      <div className="col-span-3">
        <h3 className="text-lg">Công Ty Cổ Phần Con Cưng </h3>
        <p className="text-lg">Thành viên của Tập đoàn CCI Group</p>
        <p>Email: cskh@concung.com</p>
        <p>Điện thoại: 028 7300 6609</p>
        <p>ĐKKD: 66 Nguyễn Du, phường Bến Nghé, Quận 1, Tp. Hồ Chí Minh </p>
        <p>
          Văn phòng: Tầng 14 Tòa nhà Phú Mỹ Hưng Tower, 08 Hoàng Văn Thái, P.Tân
          Phú, Q.7, HCM
        </p>
      </div>
      <div className="flex flex-col col-span-2">
        <h3 className="text-lg">Về Dairy</h3>
        <Link color="foreground">Giới thiệu về Dairy</Link>
        <Link color="foreground">Tuyển dụng Khối Văn Phòng</Link>
        <Link color="foreground">Tuyển dụng Khối Siêu Thị</Link>
        <Link color="foreground">Chính sách bảo mật</Link>
        <Link color="foreground">Điều khoản chung</Link>
      </div>
      <div className="col-span-2 flex flex-col">
        <h3 className="text-lg">Hỗ trợ khách hàng</h3>
        <Link color="foreground">Tra cứu hoá đơn</Link>
        <Link color="foreground">Mua & giao nhận Online</Link>
        <Link color="foreground">Qui định & hình thức thanh toán</Link>
        <Link color="foreground">Bảo hành & Bảo trì</Link>
        <Link color="foreground">Đổi trả & Hoàn tiền</Link>
      </div>
      <div className="col-span-2">
        <h3 className="text-lg">Chấp Nhận Thanh Toán</h3>
        <div className="grid grid-rows-2 gap-2 mt-2">
          <div className="flex items-center justify-between h-fit pr-4">
            <div className="h-16 w-16">
              <img src={ApplePay.toString()} alt="ApplePay" />
            </div>
            <div className="h-16 w-16">
              <img src={BitPay.toString()} alt="ApplePay" />
            </div>
            <div className="h-16 w-16">
              <img src={GooglePay.toString()} alt="ApplePay" />
            </div>
          </div>
          <div className="flex items-center justify-between h-fit pr-4 -translate-y-4">
            <div className="h-16 w-16">
              <img src={mc.toString()} alt="ApplePay" />
            </div>
            <div className="h-16 w-16">
              <img src={Paypal.toString()} alt="ApplePay" />
            </div>
            <div className="h-16 w-16">
              <img src={Visa.toString()} alt="ApplePay" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
