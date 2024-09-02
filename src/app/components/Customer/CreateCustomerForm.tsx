"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Customer, CustomerType, MembershipStatus } from "./customerInterfaces";
import Dropdown from "../Common/Dropdown";
import CustomButton from "../Common/CustomButton";

const CreateCustomerForm: React.FC<{ onSubmit: SubmitHandler<Customer> }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Customer>();

  const [selectedCustomerType, setSelectedCustomerType] =
    useState<CustomerType | null>(null);

  const handleCancel = () => {
    reset();
    setSelectedCustomerType(null);
  };

  const handleCustomerTypeChange = (type: CustomerType) => {
    setSelectedCustomerType(type);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-8 text-gray-600">Nuevo cliente</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label className="block">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("name", {
              required: "Este campo es requerido",
            })}
          />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label className="block">Apellido</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("sureName")}
            type="text"
          />
        </div>

        <div>
          <label className="block">Tipo de Pago</label>
          <Controller
            control={control}
            name="customerType"
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Dropdown
                options={[CustomerType.MEMBRESIA, CustomerType.PASE_DIARIO]}
                onSelect={(type) => {
                  field.onChange(type as CustomerType);
                  handleCustomerTypeChange(type as CustomerType);
                }}
                placeholder="Select Payment Type"
              />
            )}
          />
          {errors.customerType && (
            <span className="text-red-600">{errors.customerType.message}</span>
          )}
        </div>

        {/* Renderiza el formulario adicional basado en el tipo de cliente seleccionado */}
        {selectedCustomerType === CustomerType.MEMBRESIA && (
          <>
            <div>
              <label className="block">Estado</label>
              <Controller
                control={control}
                name="membership.status"
                rules={{ required: "Este campo es requerido" }}
                render={({ field }) => (
                  <Dropdown
                    options={[
                      MembershipStatus.ACTIVO,
                      MembershipStatus.CANCELADO,
                      MembershipStatus.PENDIENTE,
                    ]}
                    onSelect={(type) => {
                      field.onChange(type as MembershipStatus);
                    }}
                    placeholder="Select Payment Type"
                  />
                )}
              />
              {errors.membership?.status && (
                <span className="text-red-600">
                  {errors.membership.status.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Correo</label>
              <input
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("membership.email", {})}
                type="text"
              />
              {errors.membership?.email && (
                <span className="text-red-600">
                  {errors.membership?.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Telefono</label>
              <input
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("membership.phone", {})}
                type="text"
              />
              {errors.membership?.phone && (
                <span className="text-red-600">
                  {errors.membership?.phone.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Fecha de Inicio</label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("membership.startDate", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.membership?.startDate && (
                <span className="text-red-600">
                  {errors.membership.startDate.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Fecha de Fin</label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("membership.endDate", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.membership?.endDate && (
                <span className="text-red-600">
                  {errors.membership.endDate.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Precio</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("membership.price", {
                  required: "Este campo es requerido",
                  min: { value: 0, message: "Debe ser un valor positivo" },
                })}
              />
              {errors.membership?.price && (
                <span className="text-red-600">
                  {errors.membership.price.message}
                </span>
              )}
            </div>
          </>
        )}

        {selectedCustomerType === CustomerType.PASE_DIARIO && (
          <>
            <div>
              <label className="block">Fecha</label>
              <input
                type="datetime-local"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("dailyPass.accessDate", {
                  required: "Este campo es requerido",
                })}
              />
              {errors.dailyPass?.accessDate && (
                <span className="text-red-600">
                  {errors.dailyPass.accessDate.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Precio del Pase Diario</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("dailyPass.price", {
                  required: "Este campo es requerido",
                  min: { value: 0, message: "Debe ser un valor positivo" },
                })}
              />
              {errors.dailyPass?.price && (
                <span className="text-red-600">
                  {errors.dailyPass.price.message}
                </span>
              )}
            </div>
          </>
        )}

        <div className="col-span-2 flex justify-end space-x-4">
          <CustomButton onClick={handleCancel} variant="secondary" color="red">
            Cancelar
          </CustomButton>

          <CustomButton onClick={handleSubmit(onSubmit)} variant="primary">
            Enviar
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerForm;
