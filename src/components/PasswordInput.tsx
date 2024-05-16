// hooks
import { useState, useEffect, MouseEvent } from "react";

// utils
import classNames from "classnames";
import { FieldError, RefCallBack } from "react-hook-form";

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
          className="field-btn"
          onClick={togglePasswordVisibility}
          aria-label="Toggle password visibility"
        >
          <i
            className={`icon icon-eye${isPasswordVisible ? "-slash-regular" : "-regular"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
