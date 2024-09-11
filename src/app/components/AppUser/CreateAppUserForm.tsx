"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Dropdown from "../Common/Dropdown";
import CustomButton from "../Common/CustomButton";
import { AppUser } from "./app-user-intertace";
import { useAppUserService } from "@/services/appUser";
import { useEffect, useState } from "react";

const CreateAppUserForm: React.FC<{ onSubmit: SubmitHandler<AppUser> }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppUser>({});

  const { getAllRoles } = useAppUserService();
  const [selectedRole, setSelectedRole] = useState<string[]>([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const data = await getAllRoles();
      if (Array.isArray(data)) {
        const names = data.map((role) => role.name);
        console.log(names);
        setSelectedRole(names);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to load roles:", error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-8 text-gray-600">Nuevo Pago</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label className="block">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("person.name", {
              required: "Este campo es requerido",
            })}
          />
          {errors.person?.name && (
            <span className="text-red-600">{errors.person.name.message}</span>
          )}
        </div>

        <div>
          <label className="block">Apellido</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("person.sureName", {
              required: "Este campo es requerido",
            })}
          />
        </div>

        <div>
          <label className="block">Edad</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("person.age", {
              required: "Este campo es requerido",
            })}
          />
        </div>

        <div>
          <label className="block">Correo</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("person.email")}
            type="text"
          />
          {errors.accessName && (
            <span className="text-red-600">{errors.accessName.message}</span>
          )}
        </div>

        <div>
          <label className="block">Telefono</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("person.phone", {
              minLength: 10,
              maxLength: 10,
              required: "Este campo es requerido",
            })}
            type="text"
          />
          {errors.person?.phone && (
            <span className="text-red-600">{errors.person?.phone.message}</span>
          )}
        </div>

        <div>
          <label className="block">Usuario</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("accessName")}
            type="text"
          />
          {errors.accessName && (
            <span className="text-red-600">{errors.accessName.message}</span>
          )}
        </div>

        <div>
          <label className="block">Contraseña</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("accessHash", {
              required: "Este campo es requerido",
            })}
            type="password"
          />
          {errors.person?.phone && (
            <span className="text-red-600">{errors.person?.phone.message}</span>
          )}
        </div>

        <div>
          <label className="block">Rol</label>
          <Controller
            control={control}
            name="role.name"
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Dropdown
                options={selectedRole}
                onSelect={field.onChange}
                placeholder="Select Payment Type"
              />
            )}
          />
          {errors.role?.name && (
            <span className="text-red-600">{errors.role?.name.message}</span>
          )}
        </div>

        <div className="col-span-2 flex justify-end space-x-4">
          {/* <CustomButton onClick={handleCancel} variant="secondary" color="red">
            Cancelar
          </CustomButton> */}

          <CustomButton onClick={handleSubmit(onSubmit)} variant="primary">
            Enviar
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateAppUserForm;
