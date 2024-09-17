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
import AccessDenied from "@/app/components/Common/AccessDenied";
import {
  Dropdown,
  DropdownContainer,
  DropdownItem,
  DropdownTrigger,
} from "@/app/components/Common/dataTable/Dropdown";
import { Button } from "@/components/ui/button";
import { FaEllipsisH } from "react-icons/fa";
import UpdateAppUserForm from "@/app/components/AppUser/UpdatePasswordForm";

const AppUserPage: React.FC = () => {
  const {
    createAppUser,
    getAllAppUser,
    updateStatus,
    updatePassword,
    data: appUser,
  } = useAppUserService();

  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [currentAppUser, setCurrentAppUser] = useState<AppUser | null>(null);
  const [updateAppUserModalIsOpen, setAppUserModalIsOpen] = useState(false);

  const { userRole } = useAuth();

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    getAllAppUser();
  }, []);

  const handleModalClose = () => {
    setAppUserModalIsOpen(false);
    setCreateModalIsOpen(false);
  };

  const handleInhaability = async (appUserId: string) => {
    try {
      showLoading("Deshabilitando usuario", { id: "loading" });

      await updateStatus(appUserId);

      showSuccess("Éxito!", {
        description: `El usuario ha sido deshabilitado.`,
      });

      // Refrescar los datos
      getAllAppUser();
      dismiss("loading");
    } catch (error) {
      console.error("Error al deshabilitar el usuario:", error);

      showError("Operación fallida!", {
        description: `Error al intentar deshabilitar el usuario, intente de nuevo más tarde.`,
      });

      dismiss("loading");
    }
  };
  const handleUpdatePassword = (appUser: AppUser) => {
    setCurrentAppUser(appUser);
    setAppUserModalIsOpen(true);
  };

  const onSubmit: SubmitHandler<AppUser> = async (formData) => {
    try {
      showLoading("Procesando", { id: "loading" });

      if (createModalIsOpen) {
        await createAppUser(formData);
        showSuccess("Operación exitosa!", {
          description: `Se ha creado el nuevo usuario.`,
        });
        setCreateModalIsOpen(false);
      }

      if (updateAppUserModalIsOpen && currentAppUser) {
        await updatePassword(currentAppUser.id, formData);
        showSuccess("Éxito!", {
          description: `La se ha actializado la contraseña.`,
        });
        setAppUserModalIsOpen(false);
      }

      getAllAppUser();
      dismiss("loading");
    } catch (error) {
      console.error("Failed to submit form:", error);

      showError("Operación fallida!", {
        description: `Error al tratar de registrar el nuevo usuario, intentalo más tarde`,
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
            <DropdownItem onClick={() => handleUpdatePassword(row.original)}>
              Restablecer Contraseña
            </DropdownItem>
            <DropdownItem onClick={() => handleInhaability(row.original.id)}>
              Deshabilitar Usuario
            </DropdownItem>
          </DropdownContainer>
        </Dropdown>
      ),
    },
  ];

  return userRole === "Owner" || userRole === "Admin" ? (
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

      <Modal isOpen={updateAppUserModalIsOpen} onClose={handleModalClose}>
        {currentAppUser && (
          <UpdateAppUserForm appUser={currentAppUser} onSubmit={onSubmit} />
        )}
      </Modal>
    </div>
  ) : userRole === "Employes" ? (
    <AccessDenied />
  ) : null;
};

export default AppUserPage;
