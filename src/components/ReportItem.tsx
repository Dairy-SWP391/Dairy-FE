// components

// utils
import { commaFormatter, numberToVND } from "../utils/converter";

interface ReportItemProps {
  data: {
    dataKey: string;
    title: string;
    amount: number;
  };
}

const ReportItem = ({ data }: ReportItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-body border p-[13px] md:py-0 md:px-[26px] md:h-[80px]">
      <div className="flex items-center gap-3">
        <h6>{data.title}</h6>
      </div>
      <span className="h6 !text-sm">
        {data.dataKey === "expense"
          ? numberToVND(data.amount)
          : commaFormatter(data.amount)}
      </span>
    </div>
  );
};

export default ReportItem;
