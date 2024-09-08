"use client";

import React from "react";
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
import { usePathname } from "next/navigation";

const navItems: NavItem[] = [
  { name: "Home", path: "/home", icon: <FaHome /> },
  {
    name: "Gestion de Pagos",
    path: "",
    icon: <FaCashRegister />,
    children: [
      {
        name: "Todos Los Pagos",
        path: "/customer",
        icon: <FaLandmark />,
      },
      {
        name: "Membresia",
        path: "/membresia",
        icon: <FaMoneyCheckAlt />,
      },
      {
        name: "Pago Diario",
        path: "/dailypass",
        icon: <FaMoneyBillAlt />,
      },
    ],
  },
  { name: "Gestion de Precios", path: "/serviceprice", icon: <FaHome /> },
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <Toaster
          richColors
          closeButton
          position="top-right"
          expand={true}
          duration={5000}
        />
        {pathname !== "/loging" && pathname !== "/" && (
          <div className="flex flex-col  scrollbar-thin scrollbar-webkit">
            <div className="flex flex-1 overflow-hidden">
              <Sidebar navItems={navItems} />
              <div className="flex-1  min-h-[80vh] bg-white border border-gray-100 shadow-custom rounded-md p-4 ml-4">
                <div className="">{children}</div>
              </div>
            </div>
          </div>
        )}
        {pathname === "/loging" && <div className="">{children}</div>}
        {pathname === "/" && <div className="">{children}</div>}
      </body>
    </html>
  );
};

export default RootLayout;
