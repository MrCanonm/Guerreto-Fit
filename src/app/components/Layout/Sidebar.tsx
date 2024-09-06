"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { FaCaretDown, FaCaretUp, FaUserCircle } from "react-icons/fa";

export interface NavItem {
  name: string;
  path: string;
  element?: JSX.Element;
  icon?: JSX.Element;
  children?: NavItem[];
}

interface SidebarProps {
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setIsDropdownOpen(false); // Cerrar el dropdown cuando se contrae la barra lateral
  };

  const handleItemClick = (index: number, hasChildren: boolean) => {
    if (hasChildren) {
      if (!isExpanded) {
        setOpenIndex(openIndex === index ? null : index);
      } else {
        setOpenIndex(openIndex === index ? null : index);
      }
    }
  };

  const renderNavItems = (items: NavItem[], level = 0) => {
    return items.map((item, index) => {
      const isActive = pathname === item.path;
      const hasChildren = !!item.children;

      return (
        <React.Fragment key={index}>
          <li
            className={`p-2 mx-2 cursor-pointer ${
              level > 0 ? "pl-" + (level * 4 + 2) : ""
            } relative`}
            onClick={() => handleItemClick(index, hasChildren)}
          >
            <Link href={item.path}>
              <div
                className={`flex items-center ${
                  !isExpanded ? "justify-center" : ""
                } text-left space-x-2 py-2 px-2 rounded-md ${
                  isActive
                    ? "bg-blue-900 text-white sidebar-arrow"
                    : "text-white hover:bg-blue-100 hover:text-orange-600"
                }`}
              >
                {item.icon}
                {isExpanded && <span>{item.name}</span>}
              </div>
            </Link>
            {hasChildren && isExpanded && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {openIndex === index ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
          </li>
          {hasChildren && openIndex === index && (
            <ul
              className={`${
                isExpanded ? "pl-4" : "pl-0"
              } transition-all duration-300`}
            >
              {renderNavItems(item.children || [], level + 1)}
            </ul>
          )}
        </React.Fragment>
      );
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Lógica de logout
  };

  const user = { name: "Guerrero Fit" };

  return (
    <aside
      className={`bg-orange-900 text-white min-h-screen flex flex-col justify-between transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <div>
        <div
          className="flex justify-center items-center p-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <Image
            src="/images/guerrero_fit-rbg.png"
            alt="Storage Icon"
            width={isExpanded ? 60 : 40}
            height={isExpanded ? 60 : 40}
            className="inline-block"
          />
        </div>
        <ul>{renderNavItems(navItems)}</ul>
      </div>

      <div className="relative flex justify-center flex-col items-center mb-6">
        {isDropdownOpen && isExpanded && (
          <div className="absolute bottom-full mb-2 py-2 w-48 bg-white rounded-md shadow-xl z-50 border border-gray-200">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              Perfil
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              Ajustes
            </a>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              Cerrar Sesion
            </button>
          </div>
        )}
        <button
          onClick={isExpanded ? toggleDropdown : undefined}
          className="flex items-center focus:outline-none"
        >
          {isExpanded && <span className="text-sm pr-2">{user?.name}</span>}
          <FaUserCircle
            className="h-8 w-8 text-white"
            onClick={!isExpanded ? toggleDropdown : undefined}
          />
          {isDropdownOpen && !isExpanded && (
            <div className="absolute bottom-full mb-2 py-2 w-24 bg-white rounded-md shadow-xl z-50 border border-gray-200 transform -translate-x-1/4">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white"
              >
                Perfil
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white"
              >
                Ajustes
              </a>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white"
              >
                Cerrar Sesion
              </button>
            </div>
          )}

          {isExpanded && (isDropdownOpen ? <FaCaretUp /> : <FaCaretDown />)}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
