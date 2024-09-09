"use client";

import CustomButton from "@/app/components/Common/CustomButton";
import { DataTable } from "@/app/components/Common/dataTable/DataTable";
import {
  Dropdown,
  DropdownContainer,
  DropdownItem,
  DropdownTrigger,
} from "@/app/components/Common/dataTable/Dropdown";
import StatusBadge from "@/app/components/Common/dataTable/StatusBadge";
import Modal from "@/app/components/Common/Modal";
import { useNotification } from "@/app/components/Common/Notification";
import SearchBar from "@/app/components/Common/SearchBar";
import {
  Customer,
  Membership,
} from "@/app/components/Customer/customerInterfaces";
import RenewMembershipForm from "@/app/components/Customer/RenewMembershipForm";
import { formatter } from "@/app/components/utils/fomartValue";
import { formatPhoneNumber } from "@/app/components/utils/formatCellNumber";
import { formatDNI } from "@/app/components/utils/formatDNI ";
import { generatePDF } from "@/app/components/utils/generatePDF";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCustomerService } from "@/services/customer";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { FaEllipsisH } from "react-icons/fa";

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
  useAuth();

  useEffect(() => {
    getAllMemberships();
  }, []);

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
  const handleSubmitReceipt: SubmitHandler<Customer> = async (data) => {
    generatePDF(data);
  };

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "customer",
      header: "Cliente",
      cell: ({ row }) => {
        const membership = row.original.membership;
        const name = row.original.name || "N/A";
        const sureName = row.original.sureName || "N/A";
        const email = membership?.email || "N/A";

        return (
          <div>
            <span className="block font-bold text-gray-500">
              {" "}
              {name + " " + sureName}
            </span>
            <span className="block text-sm text-gray-500">{email}</span>
          </div>
        );
      },
    },

    {
      accessorKey: "Cedula",
      header: "Cedula",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? formatDNI(membership.dni) : "N/A";
      },
    },

    {
      accessorKey: "Telefono",
      header: "Telefono",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? formatPhoneNumber(membership?.phone) : "N/A";
      },
    },
    {
      accessorKey: "Monto",
      header: "Monto",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? formatter.format(membership.totalAmout) : "N/A";
      },
    },
    {
      accessorKey: "fechas",
      header: "Periodo de Membresía",
      cell: ({ row }) => {
        const membership = row.original.membership;
        return membership ? (
          <div className="flex flex-col">
            <span>
              <strong>Inicio:</strong>{" "}
              {new Date(membership.startDate).toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>
              <strong>Vencimiento:</strong>{" "}
              {new Date(membership.endDate).toLocaleString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        ) : (
          "N/A"
        );
      },
    },
    {
      accessorKey: "Estado",
      header: "Estado",
      cell: ({ row }) => {
        const membership = row.original.membership;
        const status = membership ? membership.status : null;
        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "actions",
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
            <DropdownItem onClick={() => handleSubmitReceipt(row.original)}>
              Genera Recibo
            </DropdownItem>
          </DropdownContainer>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-900">Membresias</h1>
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
