// components
import Spring from "./Spring";
import ReportItem from "./ReportItem";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

const TotalReport = ({
  report
}: {
  report: {
    total_orders: number;
    successful_orders: number;
    total_expense: number;
  };
}) => {
  const data = [
    {
      dataKey: "totalOrder",
      title: "Total Orders",
      amount: report.total_orders
    },
    {
      dataKey: "successfulOrder",
      title: "Successful Orders",
      amount: report.successful_orders
    },
    { dataKey: "expense", title: "Expense", amount: report.total_expense }
  ];

  return (
    <Spring className="card flex flex-col lg:col-span-3 xl:col-span-1">
      <div>
        <div className="flex items-center justify-between">
          <h4>Total Order</h4>
        </div>
        <p className="mt-1.5 mb-4 text-sm md:text-base">
          All Periods per 01/01/2022 - {dayjs().format("DD/MM/YYYY")}
        </p>
      </div>
      <div className="flex flex-col flex-1 gap-6 mb-6">
        {data.map((item, index) => (
          <ReportItem key={index} data={item} />
        ))}
      </div>
      <NavLink className="btn btn--primary" to="/revenue-by-period">
        More Details
      </NavLink>
    </Spring>
  );
};

export default TotalReport;
