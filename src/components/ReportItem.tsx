// components
import Trend from "./Trend";

// utils
import { commaFormatter } from "../utils/converter";

// assets
import coins from "../assets/coins.webp";
import credit from "../assets/credit-card.webp";
import wallet from "../assets/wallet.webp";

const icons = [
  { dataKey: "revenue", icon: coins },
  { dataKey: "expense", icon: credit },
  { dataKey: "profit", icon: wallet },
];

interface ReportItemProps {
  data: {
    dataKey: string;
    title: string;
    amount: number;
    trend: number;
  };
}

const ReportItem = ({ data }: ReportItemProps) => {
  const iconItem = icons.find((icon) => icon.dataKey === data.dataKey);
  const iconSrc = iconItem ? iconItem.icon : wallet;

  return (
    <div className="flex items-center justify-between rounded-md bg-body border p-[13px] md:py-0 md:px-[26px] md:h-[80px]">
      <div className="flex items-center gap-3 w-[100px] md:w-[150px] 2xl:w-[100px] 4xl:w-[150px]">
        <div className="hidden md:flex 2xl:hidden 4xl:flex w-[52px] h-[52px] items-center">
          <img src={iconSrc} alt={data.title} />
        </div>
        <h6>{data.title}</h6>
      </div>
      <span className="h6 !text-sm">${commaFormatter(data.amount)}</span>
      <Trend wrapperClass="hidden w-[90px] xs:flex" value={data.trend} />
    </div>
  );
};

export default ReportItem;
