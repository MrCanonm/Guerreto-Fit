"use client";

import { useCustomerService } from "@/services/customer";
import { useEffect, useState } from "react";
import { Customer } from "../components/Customer/customerInterfaces";
import CustomButton from "@/app/components/Common/CustomButton";
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
import CreateCustomerForm from "../components/Customer/CreateCustomerForm";
import EditCustomerForm from "../components/Customer/EditCustomerForm";

const CustomerPage: React.FC = () => {
  const {
    data: customers,
    loading,
    error,
    getAllCustomers,
    createCustomer,
    updateCustomer,
  } = useCustomerService();

  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
  } = useNotification();

  useEffect(() => {
    getAllCustomers();
  }, []);

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
    { accessorKey: "email", header: "Correo" },
    { accessorKey: "phone", header: "Cell/Tel" },
    { accessorKey: "customerType", header: "Membresia" },
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
        <h1 className="text-2xl font-bold text-gray-700">Gestionar Clientes</h1>

        <CustomButton
          variant="primary"
          onClick={() => setCreateModalIsOpen(true)}
        >
          Agregar Cliente
        </CustomButton>
      </div>

      <hr className="my-4" />

      <DataTable columns={columns} data={customers || []} />

      <Modal isOpen={createModalIsOpen} onClose={handleModalClose}>
        <CreateCustomerForm onSubmit={onSubmit} />
      </Modal>

      <Modal isOpen={editModalIsOpen} onClose={handleModalClose}>
        <EditCustomerForm initialData={currentCustomer} onSubmit={onSubmit} />
      </Modal>
    </div>
  );
};

export default CustomerPage;
