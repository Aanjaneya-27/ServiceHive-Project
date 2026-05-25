import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;

  onClick?: () => void;

  type?: "button" | "submit";

  variant?: "primary" | "secondary" | "danger";

  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) => {

  const baseClass =
    "px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-700 text-white",

    secondary:
      "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;