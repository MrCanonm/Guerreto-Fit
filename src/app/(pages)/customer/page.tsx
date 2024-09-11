"use client";

import CustomButton from "@/app/components/Common/CustomButton";
import { DataTable } from "@/app/components/Common/dataTable/DataTable";
import Modal from "@/app/components/Common/Modal";
import { useNotification } from "@/app/components/Common/Notification";
import CreateCustomerForm from "@/app/components/Customer/CreateCustomerForm";
import {
  Customer,
  CustomerType,
} from "@/app/components/Customer/customerInterfaces";
import { formatter } from "@/app/components/utils/fomartValue";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerService } from "@/services/customer";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

const CustomerPage: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();

  const {
    data: customers,
    getAllCustomers,
    createCustomer,
  } = useCustomerService();

  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    if (isAuthenticated) {
      getAllCustomers();
    }
  }, [isAuthenticated]);

  const handleModalClose = () => {
    setCreateModalIsOpen(false);
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
            ? formatter.format(membership.servicePrice.ammout)
            : "N/A";
        } else if (customerType === CustomerType.PASE_DIARIO) {
          const dailyPass = row.original.dailyPass;
          return dailyPass
            ? formatter.format(dailyPass.servicePrice.ammout)
            : "N/A";
        } else {
          return "N/A";
        }
      },
    },

    { accessorKey: "customerType", header: "Tipo de Pago" },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-900">Gestionar Pagos</h1>

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
