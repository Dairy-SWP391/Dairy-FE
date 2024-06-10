/* eslint-disable import/no-duplicates */
// styled components
import { BasicSelect, MinimalSelect } from "./styles";

// hooks
import { useState } from "react";

// utils
import { components } from "react-select";
import { memo } from "react";

type SelectProps = {
  options: { color: string; icon: string; label: string; value: string }[];
  value: { color: string; icon: string; label: string; value: string };
  onChange: (value: {
    color: string;
    icon: string;
    label: string;
    value: string;
  }) => void;
  variant: "basic" | "minimal";
  children: React.ReactNode;
  isInvalid?: boolean;
  id?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  innerRef?: React.RefObject<HTMLDivElement>;
  defaultValue?: { color: string; icon: string; label: string; value: string };
};

const Select = ({
  options,
  value,
  onChange,
  variant = "basic",
  ...props
}: SelectProps) => {
  const [uniqueId] = useState(
    () => "select_" + Math.random().toFixed(5).slice(2)
  );

  // custom dropdown indicator
  const Control = ({ children, ...props }) => {
    return (
      <components.Control
        className={`${variant === "basic" ? "field-input" : ""}`}
        {...props}
      >
        {children}
        <i className="icon icon-caret-down-solid" />
      </components.Control>
    );
  };

  // select props
  const selectProps = {
    classNamePrefix: `select`,
    className: `${props.isInvalid ? "is-invalid" : ""}`,
    id: props.id || uniqueId,
    isSearchable: props.isSearchable || false,
    isDisabled: props.isDisabled || false,
    options,
    value,
    onChange,
    placeholder: props.placeholder,
    openMenuOnFocus: true,
    blurInputOnSelect: true,
    ref: props.innerRef,
    defaultValue: props.defaultValue,
    onMenuClose: () => {
      const menuEl = document.querySelector(
        `#${props.id || uniqueId} .select__menu`
      );
      const containerEl = menuEl?.parentElement;
      const clonedMenuEl = menuEl?.cloneNode(true);

      if (!clonedMenuEl) return;

      clonedMenuEl.classList.add("close");
      clonedMenuEl.addEventListener("animationend", () => {
        containerEl?.removeChild(clonedMenuEl);
      });

      containerEl?.appendChild(clonedMenuEl);
    },
    components: {
      Control
    }
  };

  return variant === "basic" ? (
    <BasicSelect {...selectProps} />
  ) : (
    <MinimalSelect {...selectProps} />
  );
};

export default memo(Select);
