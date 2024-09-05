"use client";

import { useCustomerService } from "@/services/customer";
import { useEffect, useState } from "react";
import {
  Customer,
  Membership,
} from "../components/Customer/customerInterfaces";
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
import RenewMembershipForm from "../components/Customer/RenewMembershipForm";
import CustomButton from "../components/Common/CustomButton";
import SearchBar from "../components/Common/SearchBar";

const MembershipCustomerPage: React.FC = () => {
  const {
    data: customers,
    getAllMemberships,
    canceledMembership,
    updateMembership,
  } = useCustomerService();

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [renewModalIsOpen, setRenewModalIsOpen] = useState(false);
  const [confirmCancelModalIsOpen, setConfirmCancelModalIsOpen] =
    useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [customerToCancel, setCustomerToCancel] = useState<Customer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    getAllMemberships();
  }, [getAllMemberships]);

  useEffect(() => {
    if (customers) {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers([]);
    }
  }, [customers]);

  useEffect(() => {
    if (searchQuery && customers) {
      const filtered = customers.filter((customer) => {
        const dni = customer.membership?.dni.toLowerCase() || "";
        const name = customer.name.toLowerCase();
        const sureName = customer.sureName.toLowerCase();
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          dni.includes(lowerCaseQuery) ||
          name.includes(lowerCaseQuery) ||
          sureName.includes(lowerCaseQuery) ||
          (name + " " + sureName).includes(lowerCaseQuery)
        );
      });
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers || []);
    }
  }, [searchQuery, customers]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleModalClose = () => {
    setEditModalIsOpen(false);
    setRenewModalIsOpen(false);
    setConfirmCancelModalIsOpen(false);
    setCurrentCustomer(null);
  };

  const onSubmit: SubmitHandler<Membership> = async (formData) => {
    try {
      showLoading("Procesando", { id: "loading" });

      if (renewModalIsOpen && currentCustomer) {
        await updateMembership(currentCustomer.id, formData);
        showSuccess("Éxito!", {
          description: `La membresía del cliente ha sido renovada.`,
        });
        setRenewModalIsOpen(false);
      }

      await getAllMemberships();
      dismiss("loading");
    } catch (error) {
      console.error("Failed to submit form:", error);

      showError("Operación fallida!", {
        description: `Error al tratar de procesar el cliente, intentalo más tarde`,
      });

      dismiss("loading");
    }
  };

  const showCancelConfirmation = (customer: Customer) => {
    setCustomerToCancel(customer);
    setConfirmCancelModalIsOpen(true);
  };

  const handleConfirmCancelMembership = async () => {
    if (!customerToCancel) return;

    try {
      showLoading("Cancelando", { id: "loading" });

      await canceledMembership(customerToCancel.id);

      showSuccess("Éxito!", {
        description: `La membresía del cliente ha sido cancelada.`,
      });

      await getAllMemberships();
      dismiss("loading");
    } catch (error) {
      console.error("Error al cancelar la membresía:", error);

      showError("Operación fallida!", {
        description: `Error al intentar cancelar la membresía, intente de nuevo más tarde.`,
      });

      dismiss("loading");
    } finally {
      setConfirmCancelModalIsOpen(false);
      setCustomerToCancel(null);
    }
  };

  const handleRenewMembership = (customer: Customer) => {
    setCurrentCustomer(customer);
    setRenewModalIsOpen(true);
  };

  const columns: ColumnDef<Customer>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "sureName", header: "Apellido" },
    {
      accessorKey: "Cedula",
      header: "Cedula",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? membership.dni : "N/A";
      },
    },
    {
      accessorKey: "Correo",
      header: "Correo",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? membership.email : "N/A";
      },
    },
    {
      accessorKey: "Telefono",
      header: "Telefono",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? membership.phone : "N/A";
      },
    },
    {
      accessorKey: "Monto",
      header: "Monto",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership
          ? formatter.format(membership.servicePrice.monto)
          : "N/A";
      },
    },
    {
      accessorKey: "Fecha de Inicio",
      header: "Fecha de Inicio",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership
          ? new Date(membership.startDate).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })
          : "N/A";
      },
    },
    {
      accessorKey: "Fecha de Vencimiento",
      header: "Fecha de Vencimiento",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership
          ? new Date(membership.endDate).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })
          : "N/A";
      },
    },
    {
      accessorKey: "Estado",
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
            <DropdownItem onClick={() => showCancelConfirmation(row.original)}>
              Cancelar Membresía
            </DropdownItem>
            <DropdownItem onClick={() => handleRenewMembership(row.original)}>
              Renovar Membresía
            </DropdownItem>
          </DropdownContainer>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">Membresia</h1>
      </div>

      <hr className="my-4" />

      <SearchBar
        placeholder="Buscar clientes por cédula o nombre..."
        variant="rounded"
        color="blue"
        onSearch={handleSearch}
        value={searchQuery}
      />
      <DataTable columns={columns} data={filteredCustomers} />

      <Modal isOpen={editModalIsOpen} onClose={handleModalClose}>
        {currentCustomer && (
          <RenewMembershipForm customer={currentCustomer} onSubmit={onSubmit} />
        )}
      </Modal>

      <Modal isOpen={renewModalIsOpen} onClose={handleModalClose}>
        {currentCustomer && (
          <RenewMembershipForm customer={currentCustomer} onSubmit={onSubmit} />
        )}
      </Modal>

      <Modal isOpen={confirmCancelModalIsOpen} onClose={handleModalClose}>
        <div>
          <p>¿Estas seguro de cancelar la membresía de este cliente?</p>
          <div className="flex justify-end space-x-4 mt-4">
            <CustomButton onClick={handleModalClose} variant="primary">
              No
            </CustomButton>
            <CustomButton
              onClick={handleConfirmCancelMembership}
              variant="secondary"
              color="red"
            >
              Sí, cancelar
            </CustomButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MembershipCustomerPage;
