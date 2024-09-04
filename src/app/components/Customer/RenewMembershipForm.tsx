"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { Customer, CustomerType, ServicePrice } from "./customerInterfaces";
import Dropdown from "../Common/Dropdown";
import CustomButton from "../Common/CustomButton";
import { useCustomerService } from "@/services/customer";

interface RenewMembershipForm {
  customer: Customer;
  onSubmit: SubmitHandler<Customer>;
}

const RenewMembershipForm: React.FC<RenewMembershipForm> = ({
  customer,
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
      ...customer,
      monthsToPay: 1, // Valor inicial para meses a pagar
    },
  });

  const { getServicePrice } = useCustomerService();

  const monthsToPay = useWatch({ control, name: "monthsToPay" });
  const membershipPrice = customer.membership?.servicePrice.monto || 0;

  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (customer.customerType === CustomerType.MEMBRESIA && monthsToPay) {
      setTotalAmount(Number(monthsToPay) * Number(membershipPrice));
    }
  }, [monthsToPay, membershipPrice, customer.customerType]);

  const handleCancel = () => {
    reset();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-8 text-gray-600">
        Renovar Membresía
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <label className="block">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.name}
            readOnly
          />
        </div>

        <div>
          <label className="block">Apellido</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.sureName}
            readOnly
          />
        </div>

        <div>
          <label className="block">Cedula</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.dni}
            readOnly
          />
        </div>

        <div>
          <label className="block">Correo</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.email}
            readOnly
          />
        </div>

        <div>
          <label className="block">Telefono</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.phone}
            readOnly
          />
        </div>

        <div>
          <label className="block">Fecha de Inicio</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.startDate.toLocaleString()}
            readOnly
          />
        </div>

        <div>
          <label className="block">Meses a Pagar</label>
          <select
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("monthsToPay", { required: true })}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          {errors.monthsToPay && (
            <span className="text-red-600">{errors.monthsToPay.message}</span>
          )}
        </div>

        <div>
          <label className="block">Precio de la Membresia</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={membershipPrice}
            readOnly
          />
        </div>

        <div>
          <label className="block">Monto Total</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={totalAmount}
            readOnly
          />
        </div>

        <div className="col-span-2 flex justify-end space-x-4">
          <CustomButton onClick={handleCancel} variant="secondary" color="red">
            Cancelar
          </CustomButton>

          <CustomButton onClick={handleSubmit(onSubmit)} variant="primary">
            Renovar
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default RenewMembershipForm;
