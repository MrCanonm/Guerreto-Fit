"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  selectedOption?: string;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select an option",
}) => {
  const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setFilter("");
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
        );
        break;
      case "Enter":
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      isOpen &&
      highlightedIndex >= 0 &&
      highlightedIndex < filteredOptions.length
    ) {
      const element = document.getElementById(
        `dropdown-option-${highlightedIndex}`
      );
      if (element) {
        element.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen, filteredOptions]);

  return (
    <div className="relative w-64 my-2" ref={dropdownRef}>
      <div className="flex items-center">
        <input
          type="text"
          value={isOpen ? filter : selectedOption || ""}
          onChange={(e) => setFilter(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className={`w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 
              ${!selectedOption && !filter ? "text-gray-500" : "text-black"}
            `}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2"
        >
          {isOpen ? (
            <span className="pr-2 m-5">
              <FaChevronUp />
            </span>
          ) : (
            <span className="pr-2 m-5">
              <FaChevronDown />
            </span>
          )}
        </button>
      </div>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                id={`dropdown-option-${index}`}
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 
                  ${highlightedIndex === index ? "bg-gray-200" : ""}
                `}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
