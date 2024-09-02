"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Modal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, children = _a.children;
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-3 rounded-lg shadow-2xl w-full max-w-2xl mx-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>);
};
exports.default = Modal;
