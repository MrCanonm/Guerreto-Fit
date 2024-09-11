"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { Customer, CustomerType, ServicePrice } from "./customerInterfaces";
import Dropdown from "../Common/Dropdown";
import CustomButton from "../Common/CustomButton";
import { useCustomerService } from "@/services/customer";
import { generatePDF } from "../utils/generatePDF";

const CreateCustomerForm: React.FC<{ onSubmit: SubmitHandler<Customer> }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<Customer & ServicePrice>({
    defaultValues: {
      membership: { monthsToPay: 1 },
    },
  });

  const { getServicePrice, data } = useCustomerService();

  const [selectedCustomerType, setSelectedCustomerType] =
    useState<CustomerType | null>(null);
  const [servicePrice, setServicePrice] = useState<number | null>(null);

  const monthsToPay = useWatch({ control, name: "membership.monthsToPay" });
  const membershipPrice = useWatch({
    control,
    name: "membership.servicePrice.ammout",
  });

  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (
      selectedCustomerType === CustomerType.MEMBRESIA &&
      monthsToPay &&
      membershipPrice
    ) {
      const total = Number(monthsToPay) * Number(membershipPrice);
      setTotalAmount(total);
      setValue("membership.totalAmout", total); // Corregido
      console.log(membershipPrice);
      console.log(total);
    } else if (
      selectedCustomerType === CustomerType.PASE_DIARIO &&
      servicePrice
    ) {
      setTotalAmount(servicePrice);
    } else {
      setTotalAmount(0);
    }
  }, [selectedCustomerType, monthsToPay, membershipPrice, servicePrice]);

  const handleCancel = () => {
    reset();
    setSelectedCustomerType(null);
  };

  const handleCustomerTypeChange = async (type: CustomerType) => {
    setSelectedCustomerType(type);

    if (type === CustomerType.PASE_DIARIO) {
      try {
        const priceData = await getServicePrice("PASEDIARIO");
        setServicePrice(priceData.ammout);
      } catch (error) {
        console.error("Error fetching daily pass price", error);
      }
    } else if (type === CustomerType.MEMBRESIA) {
      const priceData = await getServicePrice("MEMBRESIA");
      setServicePrice(priceData.ammout);
      setValue("membership.servicePrice.ammout", priceData.ammout);
    } else {
      setServicePrice(null);
      setValue("membership.servicePrice.ammout", 0);
    }
  };

  const handleSubmitReceipt: SubmitHandler<Customer> = async (data) => {
    await onSubmit(data);
    if (data.customerType === CustomerType.MEMBRESIA) {
      generatePDF(data);
      console.log("Generando PDF", data.membership?.endDate);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-8 text-gray-600">Nuevo Pago</h1>

      <form
        onSubmit={handleSubmit(handleSubmitReceipt)}
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
            type="text"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("sureName", { required: "Este campo es requerido" })}
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
                {...register("membership.dni", {
                  minLength: 11,
                  maxLength: 11,
                  required: "Este campo es requerido",
                })}
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
                {...register("membership.email")}
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
                {...register("membership.phone", {
                  minLength: 10,
                  maxLength: 10,
                  required: "Este campo es requerido",
                })}
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
              <label className="block">Meses a Pagar</label>
              <select
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                {...register("membership.monthsToPay", {
                  required: true,
                  setValueAs: (value) => parseInt(value, 10), // Convertir a número
                })}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.membership?.monthsToPay && (
                <span className="text-red-600">
                  {errors.membership?.monthsToPay.message}
                </span>
              )}
            </div>

            <div>
              <label className="block">Precio de la Membresia</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                value={servicePrice ?? ""}
                readOnly
              />
              {errors.ammout && (
                <span className="text-red-600">{errors.ammout.message}</span>
              )}
            </div>

            <div>
              <label className="block">Monto Total</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                value={totalAmount}
                readOnly
              />
              {errors.ammout && (
                <span className="text-red-600">{errors.ammout.message}</span>
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
              value={servicePrice ?? ""}
              readOnly
            />
            {errors.ammout && (
              <span className="text-red-600">{errors.ammout.message}</span>
            )}
          </div>
        )}

        <div className="col-span-2 flex justify-end space-x-4">
          {/* <CustomButton onClick={handleCancel} variant="secondary" color="red">
            Cancelar
          </CustomButton> */}

          <CustomButton
            onClick={handleSubmit(handleSubmitReceipt)}
            variant="primary"
          >
            Enviar
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerForm;
