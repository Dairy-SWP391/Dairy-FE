// components
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import { ReactElement, ReactNode } from "react";

interface CustomTooltipProps {
  children?: ReactElement;
  withArrow?: boolean;
  tooltipClass?: string;
  title?: ReactNode;
}

const CustomTooltip = ({
  children,
  withArrow = true,
  title = "",
  ...props
}: CustomTooltipProps) => {
  return (
    <Tooltip
      TransitionComponent={Fade}
      arrow={withArrow}
      classes={{
        popper: "p-[15px]",
        tooltip: `!bg-widget shadow !rounded-md !p-0 !font-body !text-body-text`,
        arrow: "!text-widget",
      }}
      title={title}
      enterTouchDelay={0}
      leaveTouchDelay={5000}
      {...props}
    >
      {children ? children : <></>}
    </Tooltip>
  );
};

export default CustomTooltip;
