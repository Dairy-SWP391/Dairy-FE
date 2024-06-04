// components
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

// hooks
import { useState } from "react";

// utils
import { numFormatter, commaFormatter } from "../utils/converter";

interface CounterProps {
  num: number;
  className?: string;
  isFormatted?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const Counter = ({ num, className, isFormatted, ...props }: CounterProps) => {
  const [countFinished, setCountFinished] = useState(false);

  return (
    <CountUp
      start={countFinished ? num : 0}
      end={num}
      duration={2}
      onEnd={() => setCountFinished(true)}
      formattingFn={
        isFormatted
          ? (value: number) =>
              numFormatter({
                num: value,
                fractionDigits: 0,
                prefix: props.prefix,
              }) || ""
          : undefined
      }
      {...props}
    >
      {({ countUpRef, start }) => (
        <VisibilitySensor onChange={start} active={!countFinished} delayedCall>
          <span className={`relative ${className || ""}`}>
            <span className="opacity-0">
              {props.prefix}
              {isFormatted
                ? numFormatter({
                    num,
                    fractionDigits: props.decimals || 0,
                    prefix: props.prefix,
                  })
                : commaFormatter(num)}
              {props.suffix}
            </span>
            <span className="absolute left-0" ref={countUpRef} />
          </span>
        </VisibilitySensor>
      )}
    </CountUp>
  );
};

export default Counter;
