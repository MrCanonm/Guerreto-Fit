"use client";

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
import { useAuth } from "@/hooks/useAuth";

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
  { name: "Gestion de Usuarios", path: "/appUser", icon: <FaHome /> },
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  useAuth();

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
        {pathname !== "/login" && pathname !== "/" ? (
          <div className="flex h-screen overflow-hidden">
            <Sidebar navItems={navItems} />
            <div className="flex-1 overflow-auto ">
              <div className="min-h-[96vh] bg-white border border-gray-100 shadow-custom rounded-md p-4 m-4">
                {children}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1">{children}</div>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
