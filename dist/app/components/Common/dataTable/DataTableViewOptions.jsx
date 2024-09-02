"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableViewOptions = DataTableViewOptions;
var fa_1 = require("react-icons/fa");
var button_1 = require("@/components/ui/button");
var DropdownMenu_1 = require("@/app/components/Common/dataTable/DropdownMenu");
function DataTableViewOptions(_a) {
    var table = _a.table;
    return (<DropdownMenu_1.DropdownMenu>
      <DropdownMenu_1.DropdownMenuTrigger asChild>
        <button_1.Button variant="secondary" size="sm" className="ml-auto hidden h-8 lg:flex border border-gray-100 rounded-lg shadow-lg hover:hadow-2xl transition-shadow duration-300 p-4">
          <fa_1.FaSlidersH className="mr-2 h-4 w-4"/>
          View
        </button_1.Button>
      </DropdownMenu_1.DropdownMenuTrigger>
      <DropdownMenu_1.DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenu_1.DropdownMenuLabel>Select columns</DropdownMenu_1.DropdownMenuLabel>
        <DropdownMenu_1.DropdownMenuSeparator />
        {table
            .getAllColumns()
            .filter(function (column) {
            return typeof column.accessorFn !== "undefined" && column.getCanHide();
        })
            .map(function (column) {
            return (<DropdownMenu_1.DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={function (value) { return column.toggleVisibility(!!value); }}>
                {column.columnDef.header}
              </DropdownMenu_1.DropdownMenuCheckboxItem>);
        })}
      </DropdownMenu_1.DropdownMenuContent>
    </DropdownMenu_1.DropdownMenu>);
}
