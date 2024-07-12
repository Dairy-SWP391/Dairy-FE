// components
import Spring from "./Spring";
import Counter from "./Counter";

// assets
import Logo from "../assets/logo-no-background.png";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { RiBarcodeBoxLine } from "react-icons/ri";
import { TbReceiptTax } from "react-icons/tb";
import { useEffect, useState } from "react";
import { getAllOrder } from "../apis/order";
import { getAllUser } from "../apis/user";

const MainProfileInfo = ({ income }: { income: number }) => {
  // const [income, setIncome] = useState<number>(15412);
  const [totalOrders, setTotalOrders] = useState<number>(5412);
  const [totalUser, setTotalUser] = useState<number>(15412);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [order, users] = await Promise.all([
          getAllOrder(),
          getAllUser(1)
        ]);
        setTotalOrders(order.data.data.length);
        // setIncome(expense.data.result);
        setTotalUser(users.data.result.total_account);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  return (
    <Spring className="card flex flex-col gap-4 md:flex-row md:gap-[26px] lg:col-span-3 xl:col-span-2 2xl:col-span-1">
      <div
        className="h-[230px] rounded-md bg-body border border-input-border p-5 flex flex-col items-center
                 justify-center gap-6 shrink-0 md:w-[190px]"
      >
        <img className="h-50 w-auto ml-2.5" src={Logo} alt="Dairy" />
        <span className="font-heading font-bold -translate-y-4 text-xl leading-[1.1] text-header">
          Dairy
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3>Dairy - Maternity and Baby Milk Store</h3>
          <p>
            Aliquam erat volutpat. Duis molestie ultrices tempus. Mauris sem
            orci, euismod sit amet.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <h5>Average Rate 2024</h5>
          </div>
          <div className="flex-1 grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex justify-between xl:max-w-[670px]">
            <div className="flex gap-5">
              <div className="badge-icon bg-green-500">
                <FaMoneyCheckAlt />
              </div>
              <div>
                <Counter
                  className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                  num={income || 0}
                  // suffix="VND"
                />
                <span className="block label-text mb-2">Expense</span>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="badge-icon bg-yellow-500">
                <RiBarcodeBoxLine />
              </div>
              <div>
                <Counter
                  className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                  num={totalOrders}
                />
                <span className="block label-text mb-2">New Orders</span>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="badge-icon bg-red-500">
                <TbReceiptTax />
              </div>
              <div>
                <Counter
                  className="block -mt-1 font-heading font-semibold leading-[1.1] text-header text-[26px] md:text-[32px]"
                  num={totalUser}
                />
                <span className="block label-text mb-2">New Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spring>
  );
};

export default MainProfileInfo;
