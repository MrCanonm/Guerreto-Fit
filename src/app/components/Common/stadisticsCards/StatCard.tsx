"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  color?: "blue" | "green" | "red" | "gray";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  color = "blue",
  className,
}) => {
  const baseClasses =
    "p-4 rounded-lg shadow-md text-center font-semibold transition-transform duration-300 transform hover:shadow-lg hover:translate-y-1";

  // Definir las clases para cada color de la carta
  const blueClasses = "bg-blue-100 text-blue-900 border border-blue-400";
  const greenClasses = "bg-green-100 text-green-900 border border-green-400";
  const redClasses = "bg-red-100 text-red-900 border border-red-400";
  const grayClasses = "bg-gray-100 text-gray-900 border border-gray-400";

  // Determinar las clases basadas en el color
  const colorClasses =
    color === "blue"
      ? blueClasses
      : color === "green"
      ? greenClasses
      : color === "red"
      ? redClasses
      : color === "gray"
      ? grayClasses
      : "";

  return (
    <div className={`${baseClasses} ${colorClasses} ${className}`}>
      <h2 className="text-lg">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatCard;
