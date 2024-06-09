// components
import Spring from "./Spring";
import ReportItem from "./ReportItem";
import { NavLink } from "react-router-dom";

const data = [
  { dataKey: "revenue", title: "Revenue", amount: 176120, trend: 45 },
  { dataKey: "expense", title: "Expense", amount: 310452, trend: -12 },
  { dataKey: "profit", title: "Profit", amount: 342558, trend: 14.56 }
];

const TotalReport = () => {
  return (
    <Spring className="card flex flex-col lg:col-span-3 xl:col-span-1">
      <div>
        <div className="flex items-center justify-between">
          <h4>Total Report</h4>
        </div>
        <p className="mt-1.5 mb-4 text-sm md:text-base">
          All Periods per 01/01/2022 - 08/28/2023
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
