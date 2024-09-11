import React from "react";
import { MembershipStatus } from "../../Customer/customerInterfaces";
import { AppUserStatus } from "../../AppUser/app-user-intertace";

interface StatusBadgeProps {
  status: MembershipStatus | AppUserStatus | null;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";

  const renderBadge = () => {
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
      case AppUserStatus.ACTIVO:
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            Activo
          </span>
        );
      case AppUserStatus.INACTIVO:
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            Inactivo
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            N/A
          </span>
        );
    }
  };

  return renderBadge();
};

export default StatusBadge;
