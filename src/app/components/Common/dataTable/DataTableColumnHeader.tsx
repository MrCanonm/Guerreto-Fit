import { HTMLAttributes } from "react";
import { FaChevronUp, FaChevronDown, FaSort, FaEyeSlash } from "react-icons/fa";
import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

import {
  Dropdown,
  DropdownContainer,
  DropdownItem,
  DropdownTrigger,
  DropdownSeparator,
} from "./Dropdown"; // Asegúrate de ajustar la ruta según la estructura de tu proyecto

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({ column, className }: DataTableColumnHeaderProps<TData, TValue>) {
  const title = column.columnDef.header as string;

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Dropdown>
        <DropdownTrigger asChild>
          <button className="-ml-3 h-8 flex items-center gap-1" aria-label="Sort">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <FaChevronDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <FaChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <FaSort className="m-2 h-4 w-4" />
            )}
          </button>
        </DropdownTrigger>
        <DropdownContainer>
          <DropdownItem onClick={() => column.toggleSorting(false)}>
            <FaChevronUp className="mr-2 h-3.5 w-3.5" />
            Ascendente
          </DropdownItem>
          <DropdownItem onClick={() => column.toggleSorting(true)}>
            <FaChevronDown className="mr-2 h-3.5 w-3.5" />
            Descendente
          </DropdownItem>
          <DropdownItem onClick={() => column.clearSorting()}>
            <FaSort className="mr-2 h-3.5 w-3.5" />
            Quitar orden
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem onClick={() => column.toggleVisibility(false)}>
            <FaEyeSlash className="mr-2 h-3.5 w-3.5" />
            Ocultar
          </DropdownItem>
        </DropdownContainer>
      </Dropdown>
    </div>
  );
}
