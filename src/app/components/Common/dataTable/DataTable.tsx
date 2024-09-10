import React from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 9,
      },
    },
  });

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <div className="mb-1">
        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                  >
                    <DataTableColumnHeader
                      column={header.column}
                      title={header.column.id}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50 transition-colors duration-200 ease-in-out`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {typeof cell.column.columnDef.cell === "function"
                      ? (
                          cell.column.columnDef.cell as (
                            context: CellContext<TData, unknown>
                          ) => React.ReactNode
                        )(cell.getContext())
                      : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
