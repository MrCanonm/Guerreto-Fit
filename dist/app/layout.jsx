"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Sidebar_1 = __importDefault(require("./components/Layout/Sidebar"));
var fa_1 = require("react-icons/fa");
require("./globals.css");
var sonner_1 = require("sonner");
var navItems = [
    { name: "Home", path: "/", icon: <fa_1.FaHome /> },
    {
        name: "Clientes",
        path: "",
        icon: <fa_1.FaBoxOpen />,
        children: [
            { name: "Todos Los Clientes", path: "/customer", icon: <fa_1.FaBoxOpen /> },
            { name: "Membresia", path: "/membresia", icon: <fa_1.FaTags /> },
            { name: "Pago Diario", path: "/dailypass", icon: <fa_1.FaTags /> },
        ],
    },
];
var RootLayout = function (_a) {
    var children = _a.children;
    return (<html lang="en">
      <body>
        <sonner_1.Toaster richColors closeButton position="top-right" expand={true} duration={5000}/>
        <div className="flex flex-col  scrollbar-thin scrollbar-webkit">
          <div className="flex flex-1 overflow-hidden">
            <Sidebar_1.default navItems={navItems}/>
            {/* <div className="flex-1 overflow-auto mx-auto"> */}
            <div className="flex-1  min-h-[80vh] bg-white border border-gray-100 shadow-custom rounded-md p-4 ml-4">
              <div className="">{children}</div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </body>
    </html>);
};
exports.default = RootLayout;
