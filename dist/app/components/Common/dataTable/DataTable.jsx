"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = DataTable;
var react_table_1 = require("@tanstack/react-table");
var DataTableColumnHeader_1 = require("./DataTableColumnHeader");
var DataTablePagination_1 = require("./DataTablePagination");
var DataTableViewOptions_1 = require("./DataTableViewOptions");
function DataTable(_a) {
    var columns = _a.columns, data = _a.data;
    var table = (0, react_table_1.useReactTable)({
        data: data,
        columns: columns,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
    });
    return (<div className="container mx-auto">
      <DataTableViewOptions_1.DataTableViewOptions table={table}/>
      <div className="custom-scrollbar overflow-x-auto my-4 border border-gray-100 rounded-lg shadow-custom hover:hadow-2xl transition-shadow duration-300 p-0 pb-4">
        <table className="min-w-full divide-y divide-gray-200 mb-8">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(function (headerGroup) { return (<tr key={headerGroup.id}>
                {headerGroup.headers.map(function (header) { return (<th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <DataTableColumnHeader_1.DataTableColumnHeader column={header.column} title={header.column.id}/>
                  </th>); })}
              </tr>); })}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(function (row) { return (<tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map(function (cell) { return (<td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof cell.column.columnDef.cell === "function"
                    ? cell.column.columnDef.cell(cell.getContext())
                    : null}
                  </td>); })}
              </tr>); })}
          </tbody>
        </table>
        <DataTablePagination_1.DataTablePagination table={table}/>
      </div>
    </div>);
}
