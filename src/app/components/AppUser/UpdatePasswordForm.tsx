"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import CustomButton from "../Common/CustomButton";
import { AppUser } from "./app-user-intertace";

interface UpdateAppUserForm {
  appUser: AppUser;
  onSubmit: SubmitHandler<AppUser>;
}

const UpdateAppUserForm: React.FC<UpdateAppUserForm> = ({
  appUser,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppUser>({});

  return (
    <div>
      <h1 className="text-xl font-bold mb-8 text-gray-600">
        Cambiar Contraseña
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label className="block">Usuario</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            value={appUser.accessName}
            readOnly
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
            minLength={8}
            maxLength={100}
            type="password"
          />
          {errors.accessHash && (
            <span className="text-red-600">{errors.accessHash.message}</span>
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

export default UpdateAppUserForm;
