"use client";

import { useEffect, useState } from "react";
import Sidebar, { NavItem } from "./components/Layout/Sidebar";
import {
  FaCashRegister,
  FaHome,
  FaLandmark,
  FaMoneyBillAlt,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import "./globals.css";
import { Toaster } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import Login from "./(pages)/login/page";
import LoadingSpinner from "./components/Common/Loading";
import { PermissionsDict } from "./config/permissionsDict";

const allNavItems: NavItem[] = [
  {
    name: "Home",
    path: "/home",
    icon: <FaHome />,
    permissions: [PermissionsDict.VIEW_DASBOARD],
  },
  {
    name: "Gestion de Pagos",
    path: "",
    icon: <FaCashRegister />,
    permissions: [PermissionsDict.VIEW_ALLBILLS],
    children: [
      {
        name: "Todos Los Pagos",
        path: "/customer",
        icon: <FaLandmark />,
        permissions: [PermissionsDict.VIEW_ALLBILLS],
      },
      {
        name: "Membresia",
        path: "/membresia",
        icon: <FaMoneyCheckAlt />,
        permissions: [PermissionsDict.VIEW_MEMBERSHIPS],
      },
      {
        name: "Pago Diario",
        path: "/dailypass",
        icon: <FaMoneyBillAlt />,
        permissions: [PermissionsDict.VIEW_DAILYPASSES],
      },
    ],
  },
  {
    name: "Gestion de Precios",
    path: "/serviceprice",
    icon: <FaHome />,
    permissions: [PermissionsDict.VIEW_SERVICEPRICES],
  },
  {
    name: "Gestion de Usuarios",
    path: "/appUser",
    icon: <FaHome />,
    permissions: [PermissionsDict.VIEW_APPUSERS],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isAuthenticated, userRole, userPermission } = useAuth();
  const [navItems, setNavItems] = useState<NavItem[]>([]);

  useEffect(() => {
    if (userPermission) {
      const filteredNavItems = allNavItems.filter((item) => {
        // Verifica si el usuario tiene algun permiso requerido por el NavItem
        const hasPermission = item.permissions?.some((requiredPermission) =>
          userPermission.some(
            (perm: any) =>
              perm.permission.name === requiredPermission && perm.allowed
          )
        );

        // Si el NavItem tiene hijos, también filtra los hijos basados en permisos
        if (hasPermission && item.children) {
          item.children = item.children.filter((child) =>
            child.permissions?.some((requiredPermission) =>
              userPermission.some(
                (perm: any) =>
                  perm.permission.name === requiredPermission && perm.allowed
              )
            )
          );
        }

        return hasPermission;
      });
      setNavItems(filteredNavItems);
    }
  }, [userRole]);

  if (isLoading) {
    return (
      <html lang="en">
        <body>
          <LoadingSpinner />
        </body>
      </html>
    );
  }

  if (!isAuthenticated) {
    return (
      <html lang="en">
        <body>
          <div>
            <Login />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Toaster
          richColors
          closeButton
          position="bottom-right"
          expand={true}
          duration={5000}
        />
        <div className="flex h-screen overflow-hidden">
          <Sidebar navItems={navItems} />
          <div className="flex-1 overflow-auto">
            <div className="min-h-[96vh] bg-white border border-gray-100 shadow-custom rounded-md p-4 m-4">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
