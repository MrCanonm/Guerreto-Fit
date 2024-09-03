"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Customer, CustomerType, ServicePrice } from "./customerInterfaces";
import Dropdown from "../Common/Dropdown";
import CustomButton from "../Common/CustomButton";
import { useCustomerService } from "@/services/customer";

const CreateCustomerForm: React.FC<{ onSubmit: SubmitHandler<Customer> }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Customer & ServicePrice>({});

  const { getServicePrice } = useCustomerService();

  const [selectedCustomerType, setSelectedCustomerType] =
    useState<CustomerType | null>(null);
  const [dailyPassPrice, setDailyPassPrice] = useState<number | null>(null);

  const handleCancel = () => {
    reset();
    setSelectedCustomerType(null);
  };

  const handleCustomerTypeChange = async (type: CustomerType) => {
    setSelectedCustomerType(type);

    if (type === CustomerType.PASE_DIARIO) {
      try {
        const priceData = await getServicePrice("PASEDIARIO");
        setDailyPassPrice(priceData.monto);
      } catch (error) {
        console.error("Error fetching daily pass price", error);
      }
    } else if (type === CustomerType.MEMBRESIA) {
      const priceData = await getServicePrice("MEMBRESIA");
      setDailyPassPrice(priceData.monto);
    } else {
      setDailyPassPrice(null);
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
              <label className="block">Cedula</label>
              <input
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("membership.dni", {})}
                type="text"
              />
              {errors.membership?.dni && (
                <span className="text-red-600">
                  {errors.membership?.dni.message}
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
              <label className="block">Precio de la Membresia</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                value={dailyPassPrice ?? ""}
                readOnly
              />
              {errors.monto && (
                <span className="text-red-600">{errors.monto.message}</span>
              )}
            </div>
          </>
        )}

        {selectedCustomerType === CustomerType.PASE_DIARIO && (
          <div>
            <label className="block">Precio del Pase Diario</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
              {...register("dailyPass.servicePriceId")}
              value={dailyPassPrice ?? ""}
              readOnly
            />
            {errors.monto && (
              <span className="text-red-600">{errors.monto.message}</span>
            )}
          </div>
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
