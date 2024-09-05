"use client";

import { useCustomerService } from "@/services/customer";
import { useEffect } from "react";
import { DataTable } from "@/app/components/Common/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dropdown,
  DropdownTrigger,
} from "@/app/components/Common/dataTable/Dropdown";
import { FaEllipsisH } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Customer } from "../components/Customer/customerInterfaces";
import { formatter } from "../components/utils/fomartValue";

const DailyPassCustomerPage: React.FC = () => {
  const { data: customers, getAllDailyPasses } = useCustomerService();

  useEffect(() => {
    getAllDailyPasses();
  }, []);

  const columns: ColumnDef<Customer>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "sureName", header: "Apellido" },
    {
      accessorKey: "Monto",
      header: "Monto",
      cell: ({ row }) => {
        const dailyPass = row.original.dailyPass;
        return dailyPass
          ? formatter.format(dailyPass.servicePrice.monto)
          : "N/A";
      },
    },

    {
      accessorKey: "Fecha",
      header: "Fecha",
      cell: ({ row }) => {
        const dailyPass = row.original.dailyPass;
        return dailyPass
          ? new Date(dailyPass.accessDate).toLocaleString()
          : "N/A";
      },
    },

    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <Dropdown>
          <DropdownTrigger asChild>
            <Button className="flex w-8 h-8 p-0" variant="ghost">
              <FaEllipsisH className="w-4 h-4" />
              <span className="sr-only">Acciones</span>
            </Button>
          </DropdownTrigger>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Clientes de Pago Diario
        </h1>
      </div>

      <hr className="my-4" />

      <DataTable columns={columns} data={customers || []} />
    </div>
  );
};

export default DailyPassCustomerPage;
