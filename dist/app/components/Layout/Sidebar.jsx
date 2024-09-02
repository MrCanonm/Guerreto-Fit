"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var link_1 = __importDefault(require("next/link"));
var navigation_1 = require("next/navigation");
var fa_1 = require("react-icons/fa");
var image_1 = __importDefault(require("next/image"));
var fa_2 = require("react-icons/fa");
var Sidebar = function (_a) {
    var navItems = _a.navItems;
    var _b = (0, react_1.useState)(null), openIndex = _b[0], setOpenIndex = _b[1];
    var _c = (0, react_1.useState)(true), isExpanded = _c[0], setIsExpanded = _c[1];
    var _d = (0, react_1.useState)(false), isDropdownOpen = _d[0], setIsDropdownOpen = _d[1];
    var pathname = (0, navigation_1.usePathname)();
    var toggleSidebar = function () {
        setIsExpanded(!isExpanded);
        setIsDropdownOpen(false); // Cerrar el dropdown cuando se contrae la barra lateral
    };
    var handleItemClick = function (index, hasChildren) {
        if (hasChildren) {
            if (!isExpanded) {
                setOpenIndex(openIndex === index ? null : index);
            }
            else {
                setOpenIndex(openIndex === index ? null : index);
            }
        }
    };
    var renderNavItems = function (items, level) {
        if (level === void 0) { level = 0; }
        return items.map(function (item, index) {
            var isActive = pathname === item.path;
            var hasChildren = !!item.children;
            return (<react_1.default.Fragment key={index}>
          <li className={"p-2 mx-2 cursor-pointer ".concat(level > 0 ? "pl-" + (level * 4 + 2) : "", " relative")} onClick={function () { return handleItemClick(index, hasChildren); }}>
            <link_1.default href={item.path}>
              <div className={"flex items-center ".concat(!isExpanded ? "justify-center" : "", " text-left space-x-2 py-2 px-2 rounded-md ").concat(isActive
                    ? "bg-blue-100 text-blue-600 sidebar-arrow"
                    : "text-white hover:bg-blue-100 hover:text-blue-600")}>
                {item.icon}
                {isExpanded && <span>{item.name}</span>}
              </div>
            </link_1.default>
            {hasChildren && isExpanded && (<span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {openIndex === index ? <fa_1.FaChevronDown /> : <fa_1.FaChevronRight />}
              </span>)}
          </li>
          {hasChildren && openIndex === index && (<ul className={"".concat(isExpanded ? "pl-4" : "pl-0", " transition-all duration-300")}>
              {renderNavItems(item.children, level + 1)}
            </ul>)}
        </react_1.default.Fragment>);
        });
    };
    var toggleDropdown = function () {
        setIsDropdownOpen(!isDropdownOpen);
    };
    var handleLogout = function () {
        // Lógica de logout
    };
    var user = { name: "Roberto Mejía" };
    return (<aside className={"bg-blue-900 text-white min-h-screen flex flex-col justify-between transition-all duration-300 ".concat(isExpanded ? "w-64" : "w-20")}>
      <div>
        <div className="flex justify-center items-center p-4 cursor-pointer" onClick={toggleSidebar}>
          <image_1.default src="/images/storage_icon.png" alt="Storage Icon" width={isExpanded ? 60 : 40} height={isExpanded ? 60 : 40} className="inline-block"/>
        </div>
        <ul>{renderNavItems(navItems)}</ul>
      </div>

      <div className="relative flex justify-center flex-col items-center mb-6">
        {isDropdownOpen && isExpanded && (<div className="absolute bottom-full mb-2 py-2 w-48 bg-white rounded-md shadow-xl z-50 border border-gray-200">
            <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
              Perfil
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
              Ajustes
            </a>
            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
              Cerrar Sesion
            </button>
          </div>)}
        <button onClick={isExpanded ? toggleDropdown : undefined} className="flex items-center focus:outline-none">
          {isExpanded && <span className="text-sm pr-2">{user === null || user === void 0 ? void 0 : user.name}</span>}
          <fa_2.FaUserCircle className="h-8 w-8 text-white" onClick={!isExpanded ? toggleDropdown : undefined}/>
          {isDropdownOpen && !isExpanded && (<div className="absolute bottom-full mb-2 py-2 w-24 bg-white rounded-md shadow-xl z-50 border border-gray-200 transform -translate-x-1/4">
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
                Perfil
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
                Ajustes
              </a>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
                Cerrar Sesion
              </button>
            </div>)}

          {isExpanded && (isDropdownOpen ? <fa_2.FaCaretUp /> : <fa_2.FaCaretDown />)}
        </button>
      </div>
    </aside>);
};
exports.default = Sidebar;
