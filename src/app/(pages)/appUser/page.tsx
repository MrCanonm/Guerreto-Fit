"use client";

import { useEffect, useState } from "react";

import CustomButton from "@/app/components/Common/CustomButton";
import { SubmitHandler } from "react-hook-form";
import { DataTable } from "@/app/components/Common/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useNotification } from "@/app/components/Common/Notification";
import Modal from "@/app/components/Common/Modal";
import { useAuth } from "@/hooks/useAuth";
import { useAppUserService } from "@/services/appUser";
import { AppUser } from "@/app/components/AppUser/app-user-intertace";
import { formatPhoneNumber } from "@/app/components/utils/formatCellNumber";
import CreateAppUserForm from "@/app/components/AppUser/CreateAppUserForm";
import StatusBadge from "@/app/components/Common/dataTable/StatusBadge";

const AppUserPage: React.FC = () => {
  const { createAppUser, getAllAppUser, data: appUser } = useAppUserService();

  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const { userRole } = useAuth();

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    getAllAppUser();
  }, []);

  const handleModalClose = () => {
    setCreateModalIsOpen(false);
  };

  const onSubmit: SubmitHandler<AppUser> = async (formData) => {
    try {
      showLoading("Procesando", { id: "loading" });

      if (createModalIsOpen) {
        await createAppUser(formData);
        showSuccess("Operación exitosa!", {
          description: `Se ha guardado el nuevo precio para el servicio`,
        });
        setCreateModalIsOpen(false);
      }

      getAllAppUser();
      dismiss("loading");
    } catch (error) {
      console.error("Failed to submit form:", error);

      showError("Operación fallida!", {
        description: `Error al tratar de registrar el nuevo precio para el servicio, intentalo más tarde`,
      });

      dismiss("loading");
    }
  };

  const columns: ColumnDef<AppUser>[] = [
    {
      accessorKey: "appUser",
      header: "Usuarios",
      cell: ({ row }) => {
        const appUser = row.original;
        const name = row.original.person.name || "N/A";
        const sureName = row.original.person.sureName || "N/A";
        const email = appUser?.person.email || "N/A";

        return (
          <div className="flex flex-col text-gray-700">
            <span className="font-bold text-gray-900">
              {name + " " + sureName}
            </span>
            <span className="text-sm text-gray-500">{email}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "Edad",
      header: "Edad",
      cell: ({ row }) => {
        const appUser = row.original;
        return appUser ? appUser.person.age + " años" : "N/A";
      },
    },
    {
      accessorKey: "Telefono",
      header: "Telefono",
      cell: ({ row }) => {
        const appUser = row.original;
        return appUser ? formatPhoneNumber(appUser?.person?.phone) : "N/A";
      },
    },
    { accessorKey: "role.name", header: "Rol" },
    { accessorKey: "accessName", header: "Nombre de Acceso" },
    {
      accessorKey: "Estado",
      header: "Estado",
      cell: ({ row }) => {
        const appUser = row.original;
        const status = appUser ? appUser.status : null;
        return <StatusBadge status={status} />;
      },
    },
  ];

  if (userRole === "Owner") {
    return (
      <div>
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-blue-900">
            Gestion de Usuarios
          </h1>

          <CustomButton
            variant="primary"
            onClick={() => setCreateModalIsOpen(true)}
          >
            Agregar Usuario
          </CustomButton>
        </div>

        <hr className="my-4" />

        <DataTable columns={columns} data={appUser || []} />

        <Modal isOpen={createModalIsOpen} onClose={handleModalClose}>
          <CreateAppUserForm onSubmit={onSubmit} />
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Acceso Denegado
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            No tienes permiso para acceder a esta función.
          </p>
        </div>
      </div>
    );
  }
};

export default AppUserPage;
