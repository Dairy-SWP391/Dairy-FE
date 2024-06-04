// hooks
import { useState, useEffect, MouseEvent } from "react";

// utils
import classNames from "classnames";
import { FieldError, RefCallBack } from "react-hook-form";
import EyeSlashFilledIcon from "./icons/EyeSlashFilledIcon";
import EyeFilledIcon from "./icons/EyeFilledIcon";

interface PasswordInputProps {
  innerRef: RefCallBack;
  id: string;
  label?: string;
  isInvalid: FieldError | undefined;
  value?: string;
  placeholder?: string;
  error?: FieldError | undefined;
  onChange?: () => void;
}

const PasswordInput = ({
  innerRef,
  id,
  label = "Password",
  isInvalid,
  ...props
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    props.value === "" && setIsPasswordVisible(false);
  }, [props.value]);

  return (
    <div className="field-wrapper">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className={classNames("field-input !pr-10", {
            "field-input--error": isInvalid,
          })}
          id={id}
          type={isPasswordVisible ? "text" : "password"}
          ref={innerRef}
          {...props}
        />
        <button
          className="focus:outline-none mb4 fixed right-3 translate-y-1/2"
          type="button"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
