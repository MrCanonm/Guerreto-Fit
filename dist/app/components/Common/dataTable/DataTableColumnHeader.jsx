"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableColumnHeader = DataTableColumnHeader;
var fa_1 = require("react-icons/fa");
var utils_1 = require("@/lib/utils");
var Dropdown_1 = require("./Dropdown"); // Asegúrate de ajustar la ruta según la estructura de tu proyecto
function DataTableColumnHeader(_a) {
    var column = _a.column, className = _a.className;
    var title = column.columnDef.header;
    if (!column.getCanSort()) {
        return <div className={(0, utils_1.cn)(className)}>{title}</div>;
    }
    return (<div className={(0, utils_1.cn)("flex items-center space-x-2", className)}>
      <Dropdown_1.Dropdown>
        <Dropdown_1.DropdownTrigger asChild>
          <button className="-ml-3 h-8 flex items-center gap-1" aria-label="Sort">
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (<fa_1.FaChevronDown className="ml-2 h-4 w-4"/>) : column.getIsSorted() === "asc" ? (<fa_1.FaChevronUp className="ml-2 h-4 w-4"/>) : (<fa_1.FaSort className="m-2 h-4 w-4"/>)}
          </button>
        </Dropdown_1.DropdownTrigger>
        <Dropdown_1.DropdownContainer>
          <Dropdown_1.DropdownItem onClick={function () { return column.toggleSorting(false); }}>
            <fa_1.FaChevronUp className="mr-2 h-3.5 w-3.5"/>
            Ascendente
          </Dropdown_1.DropdownItem>
          <Dropdown_1.DropdownItem onClick={function () { return column.toggleSorting(true); }}>
            <fa_1.FaChevronDown className="mr-2 h-3.5 w-3.5"/>
            Descendente
          </Dropdown_1.DropdownItem>
          <Dropdown_1.DropdownItem onClick={function () { return column.clearSorting(); }}>
            <fa_1.FaSort className="mr-2 h-3.5 w-3.5"/>
            Quitar orden
          </Dropdown_1.DropdownItem>
          <Dropdown_1.DropdownSeparator />
          <Dropdown_1.DropdownItem onClick={function () { return column.toggleVisibility(false); }}>
            <fa_1.FaEyeSlash className="mr-2 h-3.5 w-3.5"/>
            Ocultar
          </Dropdown_1.DropdownItem>
        </Dropdown_1.DropdownContainer>
      </Dropdown_1.Dropdown>
    </div>);
}
