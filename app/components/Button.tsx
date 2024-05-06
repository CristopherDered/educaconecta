"use client";

import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex
    justify-center
    rounded-full
    px-3
    py-5
    text-sm
    font-semibold
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2`,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? "text-gray-900 " : "  ",
        danger && "border-rose-500 border-2  hover:text-white  hover:bg-rose-600 focus-visible:outline-rose-600  ",
        !secondary && !danger && " border-[#7A4EFF] border-2 hover:text-white  hover:bg-[#7A4EFF] focus-visible:bg-[#7A4EFF] "
      )}
    >
      {children}
    </button>
  );
};

export default Button;
