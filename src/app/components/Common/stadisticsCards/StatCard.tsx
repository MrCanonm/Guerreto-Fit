import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  lastWeek?: number | string;
  color?: "gray" | "orange" | "red" | "blue";
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  lastWeek,
  color = "gray",
  className,
}) => {
  const baseClasses = "p-6 rounded-lg shadow-md font-semibold bg-white";

  const colorClasses = {
    gray: "border-t-4 border-gray-500",
    orange: "border-t-4 border-orange-700",
    red: "border-t-4 border-red-500",
    blue: "bg-blue-100 text-blue-900 border border-blue-400",
  };

  const changeColor = change && change > 0 ? "text-green-600" : "text-red-600";

  return (
    <div className={`${baseClasses} ${colorClasses[color]} ${className}`}>
      <h2 className="text-x uppercase text-gray-500 mb-2">{title}</h2>
      <div className="flex items-baseline justify-between">
        <p className="text-4xl font-bold text-gray-900">{value}</p>
        {change !== undefined && (
          <p className={`text-sm ${changeColor}`}>
            {change > 0 ? "▲" : "▼"} {Math.abs(change)}%
            <span className="text-gray-500 ml-1">change</span>
          </p>
        )}
      </div>
      {lastWeek !== undefined && (
        <p className="text-sm text-gray-500 mt-2">{lastWeek} last week</p>
      )}
    </div>
  );
};

export default StatCard;
