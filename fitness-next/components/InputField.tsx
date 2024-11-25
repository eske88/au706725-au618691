// components/InputField.js
import React from "react";

type InputFieldProps = {
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  ...props
}: InputFieldProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-slate-100 w-full h-12 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      {...props}
    />
  );
};

export default InputField;
