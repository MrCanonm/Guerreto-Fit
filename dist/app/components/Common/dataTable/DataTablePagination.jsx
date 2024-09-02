"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTablePagination = DataTablePagination;
var fa_1 = require("react-icons/fa");
var button_1 = require("@/components/ui/button");
var select_1 = require("@/components/ui/select");
function DataTablePagination(_a) {
    var table = _a.table;
    return (<div className="flex items-center justify-between px-2 ">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getPaginationRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} total data.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Data per page</p>
          <select_1.Select value={String(table.getState().pagination.pageSize)} onValueChange={function (value) { return table.setPageSize(Number(value)); }}>
            <select_1.SelectTrigger className="h-8 w-[70px]">
              <select_1.SelectValue placeholder={String(table.getState().pagination.pageSize)}/>
            </select_1.SelectTrigger>
            <select_1.SelectContent side="top">
              {[1, 10, 20, 30, 40, 50].map(function (pageSize) { return (<select_1.SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </select_1.SelectItem>); })}
            </select_1.SelectContent>
          </select_1.Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <button_1.Button variant="secondary" className="hidden h-8 w-8 p-0 lg:flex" onClick={function () { return table.setPageIndex(0); }} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to first page</span>
            <fa_1.FaAngleDoubleLeft className="h-4 w-4"/>
          </button_1.Button>
          <button_1.Button variant="secondary" className="h-8 w-8 p-0" onClick={function () { return table.previousPage(); }} disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            <fa_1.FaChevronLeft className="h-4 w-4"/>
          </button_1.Button>
          <button_1.Button variant="secondary" className="h-8 w-8 p-0" onClick={function () { return table.nextPage(); }} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            <fa_1.FaChevronRight className="h-4 w-4"/>
          </button_1.Button>
          <button_1.Button variant="secondary" className="hidden h-8 w-8 p-0 lg:flex" onClick={function () { return table.setPageIndex(table.getPageCount() - 1); }} disabled={!table.getCanNextPage()}>
            <span className="sr-only">Ir a la ultima pagina</span>
            <fa_1.FaAngleDoubleRight className="h-4 w-4"/>
          </button_1.Button>
        </div>
      </div>
    </div>);
}
