"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var image_1 = __importDefault(require("next/image"));
var Header = function () {
    var _a = (0, react_1.useState)(false), isDropdownOpen = _a[0], setIsDropdownOpen = _a[1];
    var user = { name: "Roberto Mejía" }; // Reemplaza esto con tu lógica de usuario
    var toggleDropdown = function () {
        setIsDropdownOpen(!isDropdownOpen);
    };
    var handleLogout = function () {
        // Lógica de logout
    };
    return (<header className="bg-white text-gray-800 py-1 px-8 flex justify-between items-center border border-gray-100 rounded-lg shadow-lg z-20">
      <div className="flex-1 flex justify-center flex-col text-center">
        <h1 className="text-5xl font-bold leading-tight flex items-center justify-center">
          <image_1.default src="/images/storage_icon.png" alt="Storage Icon" width={60} height={60} className="inline-block h-12 mr-4"/>
          Facturación
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
            <span className="text-sm pr-2">{user === null || user === void 0 ? void 0 : user.name}</span>
            <fa_1.FaUserCircle className="h-8 w-8 text-gray-800"/>
            {isDropdownOpen ? (<fa_1.FaCaretUp className="ml-2 text-gray-800"/>) : (<fa_1.FaCaretDown className="ml-2 text-gray-800"/>)}
          </button>
          {isDropdownOpen && (<div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50 border border-gray-200">
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
                Settings
              </a>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-500 hover:text-white">
                Log Out
              </button>
            </div>)}
        </div>
      </div>
    </header>);
};
exports.default = Header;
