"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { Customer, CustomerType, Membership } from "./customerInterfaces";
import CustomButton from "../Common/CustomButton";
import { useStadisctisService } from "@/services/stadistics";

interface RenewMembershipForm {
  customer: Customer;
  onSubmit: SubmitHandler<Customer & Membership>;
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
    formState: { errors },
  } = useForm<Customer & Membership>({
    defaultValues: {
      ...customer,
      monthsToPay: 1,
    },
  });
  const { getActualServicePrice, servicePriceData } = useStadisctisService();

  const monthsToPay = useWatch({ control, name: "monthsToPay" });

  const [totalAmount, setTotalAmount] = useState<number>(0);
  //const [membershipPrice, setMembershipPrice] = useState<number>(0);
  const membershipPrice = servicePriceData?.membershipPrice?.monto || 0;

  useEffect(() => {
    getActualServicePrice();
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
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block">Apellido</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.sureName}
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block">Cedula</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.dni}
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block">Correo</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.email}
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block">Telefono</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.phone}
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block">Fecha de Inicio</label>
          <input
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={customer.membership?.startDate.toLocaleString()}
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block">Meses a Renovar</label>
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
            disabled
            readOnly
          />
        </div>

        <div>
          <label className="block">Monto Total</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            value={totalAmount}
            disabled
            readOnly
          />
        </div>

        <div className="col-span-2 flex justify-end space-x-4">
          {/* <CustomButton onClick={handleCancel} variant="secondary" color="red">
            Cancelar
          </CustomButton> */}

          <CustomButton onClick={handleSubmit(onSubmit)} variant="primary">
            Renovar
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default RenewMembershipForm;
