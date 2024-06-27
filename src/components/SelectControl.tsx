import { Select, SelectProps } from "@nextui-org/react";
import { Path, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectControlProps<T extends FieldValues> extends SelectProps {
  name: Path<T>;
  register: UseFormRegister<T>;
  label: string;
  placeholder: string;
  //   isError: boolean;
  //   errorMessage?: string;
}

export type ItemsSelectType = {
  id: number;
  name: string;
};

const SelectControl = <T extends FieldValues>({
  register,
  //   isError,
  name,
  //   errorMessage,
  label,
  placeholder,
  children,
  ...rest
}: SelectControlProps<T>) => {
  return (
    <Select
      {...register(name)}
      label={label}
      placeholder={placeholder}
      {...rest}
    >
      {children}
    </Select>
  );
};

export default SelectControl;
