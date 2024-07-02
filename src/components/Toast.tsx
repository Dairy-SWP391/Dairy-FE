import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type ToastProps = {
  timeout: number;
};

const Toast = ({ timeout }: ToastProps) => {
  const [value, setValue] = useState<number>(100);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => prev - 2);
    }, 50);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <p>Content</p>
      <button onClick={() => toast.success("ahihi")}>Toast</button>
      <Progress aria-label="Loading..." value={100} className="max-w-md" />
    </div>
  );
};

export default Toast;
