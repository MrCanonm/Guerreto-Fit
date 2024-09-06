import React from "react";
import { MembershipStatus } from "../../Customer/customerInterfaces";

interface StatusBadgeProps {
  status: MembershipStatus | null;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";

  switch (status) {
    case MembershipStatus.ACTIVO:
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          Activa
        </span>
      );

    case MembershipStatus.VENCIDA:
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          Vencida
        </span>
      );
    default:
      return (
        <span className={`${baseClasses} bg-gray-100 text-gray-800`}>N/A</span>
      );
  }
};

export default StatusBadge;
