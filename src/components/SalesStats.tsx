// components
import Spring from "./Spring";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// hooks
import useWindowSize from "../hooks/useWindowSize";
import { numFormatter } from "../utils/converter";
import { useEffect, useState } from "react";
import { getExpensePerMonth } from "../apis/order";

const SalesStats = () => {
  const { width } = useWindowSize();
  const [data, setData] = useState([
    { name: "Jan", expense: 0, month: 1 },
    { name: "Feb", expense: 0, month: 2 },
    { name: "Mar", expense: 0, month: 3 },
    { name: "Apr", expense: 0, month: 4 },
    { name: "May", expense: 0, month: 5 },
    { name: "Jun", expense: 0, month: 6 },
    { name: "Jul", expense: 0, month: 7 },
    { name: "Aug", expense: 0, month: 8 },
    { name: "Sep", expense: 0, month: 9 },
    { name: "Oct", expense: 0, month: 10 },
    { name: "Nov", expense: 0, month: 11 },
    { name: "Dec", expense: 0, month: 12 }
  ]);
  const revenueColor = "var(--header)";
  const expenseColor = "var(--input-border)";

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await getExpensePerMonth();
        const { result } = response.data;
        const newData = data.map((item) => ({
          ...item,
          expense: result[item.month]
        }));
        setData(newData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  });

  return (
    <Spring className="card flex flex-col h-[300px] md:h-[494px] lg:col-span-3 xl:col-span-1">
      <div className="flex flex-col gap-2.5 mb-5 md:flex-row md:justify-between md:items-center">
        <h4>Sales Statistic 2022</h4>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: revenueColor }}
            />
            <span className="font-heading font-semibold text-sm text-header">
              Revenue
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-4 rounded-full"
              style={{ background: expenseColor }}
            />
            <span className="font-heading font-semibold text-sm text-header">
              Expense
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--input-border)"
              strokeOpacity={0.6}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              dy={9}
              hide={width < 768}
              tick={{
                fontSize: 14,
                fontFamily: "var(--heading-font)",
                fontWeight: 700,
                fill: "var(--header)"
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                numFormatter({ num: value, fractionDigits: 0, prefix: "$" }) ||
                ""
              }
              tick={{
                fill: "var(--header)"
              }}
              hide={width < 768}
            />
            {/* <Tooltip cursor={false} content={<CustomTooltip />} /> */}
            <Bar
              dataKey="expense"
              fill={revenueColor}
              strokeWidth={4}
              maxBarSize={25}
              radius={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Spring>
  );
};

export default SalesStats;
