"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "special";
  color?: "red" | "gray";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant,
  color,
  onClick,
  className,
  disabled = false,
}) => {
  const baseClasses =
    "px-4 py-2 mb-2 rounded-md font-semibold transition-transform duration-300 transform shadow-custom hover:shadow-2xl hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  // Definir las clases para cada tipo de botón en constantes
  const primaryClasses = "bg-orange-900 text-white hover:bg-orange-600";
  const secondaryRedClasses =
    "bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white";
  const secondaryGrayClasses =
    "bg-white border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white";
  const specialClasses = "bg-purple-600 text-white hover:bg-purple-800";

  // Determinar las clases basadas en el tipo de botón y color
  const variantClasses =
    variant === "primary"
      ? primaryClasses
      : variant === "secondary" && color === "red"
      ? secondaryRedClasses
      : variant === "secondary" && color === "gray"
      ? secondaryGrayClasses
      : variant === "special"
      ? specialClasses
      : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
