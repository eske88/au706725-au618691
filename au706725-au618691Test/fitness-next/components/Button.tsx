"use client";
import React from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-genericGradient-100 rounded-md px-6 p-2 text-white"
    >
      {text}
    </button>
  );
};

export default Button;
