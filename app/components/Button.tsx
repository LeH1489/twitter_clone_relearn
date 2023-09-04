"use client";

interface ButtonProps {
  label: string;
  secondary?: boolean; //bg-white
  fullWidth?: boolean; //full width
  large?: boolean; // text-xl
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    disabled:opacity-70 
    disabled:cursor-not-allowed 
    rounded-full
    font-semibold
    hover:bg-sky-500/70
    transition
    border-2
    ${fullWidth ? "w-full" : "w-fit"}
    ${secondary ? "border-black" : "border-sky-500"}
    ${secondary ? "text-black" : "text-white"}
     ${secondary ? "bg-neutral-200/20" : "  bg-sky-500"}
       ${secondary ? "hover:bg-neutral-300" : "  hover:bg-sky-500/70"}
    ${large ? "text-xl" : "text-md"}
    ${large ? "px-5" : "px-4"}
    ${large ? "py-3" : "px-2"}
    ${outline ? "bg-transparent" : ""}
    ${outline ? "border-white" : ""}
   ${outline ? "text-black" : ""}
  `}
    >
      {label}
    </button>
  );
};

export default Button;
