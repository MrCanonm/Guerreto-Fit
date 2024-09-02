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
  });

  return (
    <div className="container mx-auto">
      <DataTableViewOptions table={table} />
      <div className="custom-scrollbar overflow-x-auto my-4 border border-gray-100 rounded-lg shadow-custom hover:hadow-2xl transition-shadow duration-300 p-0 pb-4">
        <table className="min-w-full divide-y divide-gray-200 mb-8">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
