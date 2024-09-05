"use client";

import { useCustomerService } from "@/services/customer";
import { useEffect, useState } from "react";
import {
  Customer,
  CustomerType,
} from "../components/Customer/customerInterfaces";
import CustomButton from "@/app/components/Common/CustomButton";
import { useNotification } from "../components/Common/Notification";
import { SubmitHandler } from "react-hook-form";
import { DataTable } from "@/app/components/Common/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dropdown,
  DropdownTrigger,
} from "@/app/components/Common/dataTable/Dropdown";
import { FaEllipsisH } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Modal from "../components/Common/Modal";
import CreateCustomerForm from "../components/Customer/CreateCustomerForm";
import { formatter } from "../components/utils/fomartValue";

const CustomerPage: React.FC = () => {
  const {
    data: customers,
    getAllCustomers,
    createCustomer,
    updateCustomer,
  } = useCustomerService();

  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  const handleModalClose = () => {
    setCreateModalIsOpen(false);
    setEditModalIsOpen(false);
    setCurrentCustomer(null);
  };

  const onSubmit: SubmitHandler<Customer> = async (formData) => {
    try {
      showLoading("Procesando", { id: "loading" });

      if (createModalIsOpen) {
        await createCustomer(formData);
        showSuccess("Operación exitosa!", {
          description: `Se ha guardado el cliente ${formData.name}`,
        });
        setCreateModalIsOpen(false);
      }

      if (editModalIsOpen && currentCustomer) {
        await updateCustomer(currentCustomer.id, formData);
        showSuccess("Éxito!", {
          description: `Se ha actualizado el cliente ${formData.name}`,
        });
        setEditModalIsOpen(false);
      }

      getAllCustomers();
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
      accessorKey: "Fecha",
      header: "Fecha",
      cell: ({ row }) => {
        const customerType = row.original.customerType;

        if (customerType === CustomerType.MEMBRESIA) {
          const membership = row.original.membership;
          return membership
            ? new Date(membership.startDate).toLocaleDateString()
            : "N/A";
        } else if (customerType === CustomerType.PASE_DIARIO) {
          const dailyPass = row.original.dailyPass;
          return dailyPass
            ? new Date(dailyPass.accessDate).toLocaleDateString()
            : "N/A";
        } else {
          return "N/A";
        }
      },
    },

    {
      accessorKey: "Monto",
      header: "Monto",
      cell: ({ row }) => {
        const customerType = row.original.customerType;

        if (customerType === CustomerType.MEMBRESIA) {
          const membership = row.original.membership;
          return membership
            ? formatter.format(membership.servicePrice.monto)
            : "N/A";
        } else if (customerType === CustomerType.PASE_DIARIO) {
          const dailyPass = row.original.dailyPass;
          return dailyPass
            ? formatter.format(dailyPass.servicePrice.monto)
            : "N/A";
        } else {
          return "N/A";
        }
      },
    },

    { accessorKey: "customerType", header: "Tipo de Pago" },
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
        <h1 className="text-2xl font-bold text-gray-700">Gestionar Pagos</h1>

        <CustomButton
          variant="primary"
          onClick={() => setCreateModalIsOpen(true)}
        >
          Agregar Pago
        </CustomButton>
      </div>

      <hr className="my-4" />

      <DataTable columns={columns} data={customers || []} />

      <Modal isOpen={createModalIsOpen} onClose={handleModalClose}>
        <CreateCustomerForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
};

export default CustomerPage;
