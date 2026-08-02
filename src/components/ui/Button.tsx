import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "px-6 py-2 rounded-lg font-medium transition duration-200";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "border border-gray-300 hover:bg-gray-50",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;