"use client";

import { useCustomerService } from "@/services/customer";
import { useEffect, useState } from "react";
import { Customer } from "../components/Customer/customerInterfaces";
import { useNotification } from "../components/Common/Notification";
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
import Modal from "../components/Common/Modal";
import { formatter } from "../components/utils/fomartValue";

const MembershipCustomerPage: React.FC = () => {
  const {
    data: customers,
    getAllMemberships,
    updateCustomer,
    canceledMembership,
    renewMembership,
  } = useCustomerService();

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    getAllMemberships();
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

      await getAllMemberships(); // Re-cargar clientes después de la actualización
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

  const handleCancelMembership = async (customerId: number) => {
    try {
      showLoading("Cancelando", { id: "loading" });

      await canceledMembership(customerId);

      showSuccess("Éxito!", {
        description: `La membresía del cliente ha sido cancelada.`,
      });

      await getAllMemberships(); // Re-cargar los clientes después de la cancelación
      dismiss("loading");
    } catch (error) {
      console.error("Error al cancelar la membresía:", error);

      showError("Operación fallida!", {
        description: `Error al intentar cancelar la membresía, intente de nuevo más tarde.`,
      });

      dismiss("loading");
    }
  };

  const handleRenewMembership = async (customerId: number) => {
    try {
      showLoading("Renovando", { id: "loading" });

      await renewMembership(customerId);

      showSuccess("Éxito!", {
        description: `La membresía del cliente ha sido renovada.`,
      });

      await getAllMemberships(); // Re-cargar los clientes después de la renovación
      dismiss("loading");
    } catch (error) {
      console.error("Error al renovar la membresía:", error);

      showError("Operación fallida!", {
        description: `Error al intentar renovar la membresía, intente de nuevo más tarde.`,
      });

      dismiss("loading");
    }
  };
  const columns: ColumnDef<Customer>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "sureName", header: "Apellido" },
    {
      header: "Correo",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? membership.email : "N/A";
      },
    },
    {
      header: "Cell/Tel",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? membership.phone : "N/A";
      },
    },

    {
      header: "Monto",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? formatter.format(membership.servicePrice) : "N/A";
      },
    },
    {
      header: "Fecha de Inicio",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership
          ? new Date(membership.startDate).toLocaleString()
          : "N/A";
      },
    },
    {
      header: "Fecha de Vencimiento",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership
          ? new Date(membership.endDate).toLocaleString()
          : "N/A";
      },
    },
    {
      header: "Estado",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? membership.status : "N/A";
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
            <DropdownItem
              onClick={() => handleCancelMembership(row.original.id)}
            >
              Cancelar
            </DropdownItem>
            <DropdownItem
              onClick={() => handleRenewMembership(row.original.id)}
            >
              Renovar
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

export default MembershipCustomerPage;
