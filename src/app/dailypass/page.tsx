"use client";

import { useCustomerService } from "@/services/customer";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { DataTable } from "@/app/components/Common/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dropdown,
  DropdownContainer,
  DropdownItem,
  DropdownTrigger,
} from "@/app/components/Common/dataTable/Dropdown";
import { FaEllipsisH } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Customer } from "../components/Customer/customerInterfaces";
import { useNotification } from "../components/Common/Notification";
import Modal from "../components/Common/Modal";
import { formatter } from "../components/utils/fomartValue";

const DailyPassCustomerPage: React.FC = () => {
  const {
    data: customers,
    loading,
    error,
    getAllDailyPasses,
    updateCustomer,
  } = useCustomerService();

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    getAllDailyPasses();
  }, []);

  const handleModalClose = () => {
    setEditModalIsOpen(false);
    setCurrentCustomer(null);
  };

  const onSubmit: SubmitHandler<Customer> = async (formData) => {
    try {
      showLoading("Procesando", { id: "loading" });

      if (editModalIsOpen && currentCustomer) {
        await updateCustomer(currentCustomer.id, formData);
        showSuccess("Éxito!", {
          description: `Se ha actualizado el cliente ${formData.name}`,
        });
        setEditModalIsOpen(false);
      }

      await getAllDailyPasses(); // Re-cargar clientes después de la actualización
      dismiss("loading");
    } catch (error) {
      console.error("Failed to submit form:", error);

      showError("Operación fallida!", {
        description: `Error al tratar de procesar el cliente ${formData.name}, intentalo más tarde`,
      });

      dismiss("loading");
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setCurrentCustomer(customer);
    setEditModalIsOpen(true);
  };

  const columns: ColumnDef<Customer>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "sureName", header: "Apellido" },
    {
      header: "Monto",
      cell: ({ row }) => {
        const dailyPass = row.original.dailyPass;
        return dailyPass
          ? formatter.format(dailyPass.servicePrice.monto)
          : "N/A";
      },
    },

    {
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
          <DropdownContainer>
            <DropdownItem onClick={() => handleEditCustomer(row.original)}>
              Editar
            </DropdownItem>
          </DropdownContainer>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Clientes con Membresía
        </h1>
      </div>

      <hr className="my-4" />

      <DataTable columns={columns} data={customers || []} />
    </div>
  );
};

export default DailyPassCustomerPage;
