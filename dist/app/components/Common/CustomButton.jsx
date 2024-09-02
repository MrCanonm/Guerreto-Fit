"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CustomButton = function (_a) {
    var children = _a.children, variant = _a.variant, color = _a.color, onClick = _a.onClick, className = _a.className;
    var baseClasses = "px-4 py-2 mb-2 rounded-md font-semibold transition-transform duration-300 transform shadow-custom hover:shadow-2xl hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    // Definir las clases para cada tipo de botón en constantes
    var primaryClasses = "bg-blue-900 text-white hover:bg-blue-700";
    var secondaryRedClasses = "bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white";
    var secondaryGrayClasses = "bg-white border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white";
    var specialClasses = "bg-purple-600 text-white hover:bg-purple-800";
    // Determinar las clases basadas en el tipo de botón y color
    var variantClasses = variant === "primary"
        ? primaryClasses
        : variant === "secondary" && color === "red"
            ? secondaryRedClasses
            : variant === "secondary" && color === "gray"
                ? secondaryGrayClasses
                : variant === "special"
                    ? specialClasses
                    : "";
    return (<button className={"".concat(baseClasses, " ").concat(variantClasses, " ").concat(className)} onClick={onClick}>
      {children}
    </button>);
};
exports.default = CustomButton;
