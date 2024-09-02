import React from "react";
import Sidebar, { NavItem } from "./components/Layout/Sidebar";
import { FaBoxOpen, FaHome, FaTags, FaUser } from "react-icons/fa";
import "./globals.css";
import { Toaster } from "sonner";

const navItems: NavItem[] = [
  { name: "Home", path: "/", icon: <FaHome /> },
  {
    name: "Clientes",
    path: "",
    icon: <FaBoxOpen />,
    children: [
      { name: "Todos Los Clientes", path: "/customer", icon: <FaBoxOpen /> },
      { name: "Membresia", path: "/membresia", icon: <FaTags /> },
      { name: "Pago Diario", path: "/dailypass", icon: <FaTags /> },
    ],
  },
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
        <div className="flex flex-col  scrollbar-thin scrollbar-webkit">
          <div className="flex flex-1 overflow-hidden">
            <Sidebar navItems={navItems} />
            {/* <div className="flex-1 overflow-auto mx-auto"> */}
            <div className="flex-1  min-h-[80vh] bg-white border border-gray-100 shadow-custom rounded-md p-4 ml-4">
              <div className="">{children}</div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </body>
    </html>
  );
};

export default RootLayout;
