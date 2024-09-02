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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var fa_1 = require("react-icons/fa");
var Dropdown = function (_a) {
    var options = _a.options, onSelect = _a.onSelect, _b = _a.placeholder, placeholder = _b === void 0 ? "Select an option" : _b;
    var _c = (0, react_1.useState)(""), filter = _c[0], setFilter = _c[1];
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = (0, react_1.useState)(null), selectedOption = _e[0], setSelectedOption = _e[1];
    var _f = (0, react_1.useState)(-1), highlightedIndex = _f[0], setHighlightedIndex = _f[1];
    var dropdownRef = (0, react_1.useRef)(null);
    var filteredOptions = options.filter(function (option) {
        return option.toLowerCase().includes(filter.toLowerCase());
    });
    var handleSelect = function (option) {
        onSelect(option);
        setSelectedOption(option);
        setFilter("");
        setIsOpen(false);
        setHighlightedIndex(-1);
    };
    var handleClickOutside = function (event) {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    var handleKeyDown = function (event) {
        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setHighlightedIndex(function (prevIndex) {
                    return prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0;
                });
                break;
            case "ArrowUp":
                event.preventDefault();
                setHighlightedIndex(function (prevIndex) {
                    return prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1;
                });
                break;
            case "Enter":
                if (highlightedIndex >= 0 &&
                    highlightedIndex < filteredOptions.length) {
                    handleSelect(filteredOptions[highlightedIndex]);
                }
                break;
            case "Escape":
                setIsOpen(false);
                break;
            default:
                break;
        }
    };
    (0, react_1.useEffect)(function () {
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    (0, react_1.useEffect)(function () {
        if (isOpen &&
            highlightedIndex >= 0 &&
            highlightedIndex < filteredOptions.length) {
            var element = document.getElementById("dropdown-option-".concat(highlightedIndex));
            if (element) {
                element.scrollIntoView({ block: "nearest" });
            }
        }
    }, [highlightedIndex, isOpen, filteredOptions]);
    return (<div className="relative w-64 my-2" ref={dropdownRef}>
      <div className="flex items-center">
        <input type="text" value={isOpen ? filter : selectedOption || ""} onChange={function (e) { return setFilter(e.target.value); }} onFocus={function () { return setIsOpen(true); }} placeholder={placeholder} onKeyDown={handleKeyDown} className={"w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 \n              ".concat(!selectedOption && !filter ? "text-gray-500" : "text-black", "\n            ")}/>
        <button type="button" onClick={function () { return setIsOpen(!isOpen); }} className="absolute right-2">
          {isOpen ? (<span className="pr-2 m-5">
              <fa_1.FaChevronUp />
            </span>) : (<span className="pr-2 m-5">
              <fa_1.FaChevronDown />
            </span>)}
        </button>
      </div>
      {isOpen && (<ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredOptions.length > 0 ? (filteredOptions.map(function (option, index) { return (<li id={"dropdown-option-".concat(index)} key={index} onClick={function () { return handleSelect(option); }} className={"px-4 py-2 cursor-pointer hover:bg-gray-200 \n                  ".concat(highlightedIndex === index ? "bg-gray-200" : "", "\n                ")}>
                {option}
              </li>); })) : (<li className="px-4 py-2 text-gray-500">No options found</li>)}
        </ul>)}
    </div>);
};
exports.default = Dropdown;
