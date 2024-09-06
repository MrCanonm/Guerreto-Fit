import React from "react";

interface SearchBarProps {
  placeholder?: string;
  variant?: "default" | "rounded";
  color?: "blue" | "gray";
  onSearch: (query: string) => void;
  value: string; // Agrega esta línea
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  variant = "default",
  color = "gray",
  onSearch,
  value, // Agrega esta línea
  className,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Llama a onSearch en lugar de usar estado interno
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value); // Usa la prop value
    }
  };

  const baseClasses =
    "w-80 px-4 py-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Clases personalizadas para el color
  const blueClasses =
    "border border-orange-900 text-gray-900 focus:ring-orange-500";
  const grayClasses =
    "border border-orange-400 text-gray-700 focus:ring-gray-500";

  // Clases personalizadas para la variante
  const defaultClasses = "rounded-md";
  const roundedClasses = "rounded-md";

  // Determina las clases en función de las opciones proporcionadas
  const colorClasses = color === "blue" ? blueClasses : grayClasses;
  const variantClasses =
    variant === "rounded" ? roundedClasses : defaultClasses;

  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="text"
        className={`${baseClasses} ${colorClasses} ${variantClasses}`}
        placeholder={placeholder}
        value={value} // Usa la prop value
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
