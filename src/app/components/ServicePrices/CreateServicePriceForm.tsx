"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Dropdown from "../Common/Dropdown";
import CustomButton from "../Common/CustomButton";
import { ServicePrice } from "./servicepriceinterface";
import { usePriceService } from "@/services/serviceprice";
import { useNotification } from "../Common/Notification";
import { Service } from "../Customer/customerInterfaces";

const CreateServicePriceForm: React.FC<{
  onSubmit: SubmitHandler<ServicePrice>;
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<ServicePrice>({});

  const { getAlllService } = usePriceService();

  const { showSuccess, showError } = useNotification();
  const [service, setCategories] = useState<Service[]>([]);
  const [serviceNames, setServiceNames] = useState<string[]>([]);

  useEffect(() => {
    const loadService = async () => {
      try {
        const data: Service[] = await getAlllService();
        setCategories(data);

        const names = data.map((service) => service.serviceName);
        setServiceNames(names);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    loadService();
  }, []);

  const handleCancel = () => {
    reset();
  };

  const handleCategorySelect = (selectedName: string) => {
    const selectedService = service.find(
      (service) => service.serviceName === selectedName
    );
    if (selectedService) {
      setValue("serviceId", selectedService.id);
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
          <label className="block">Category</label>
          <Controller
            control={control}
            name="serviceId"
            rules={{ required: "Este campo es requerido" }}
            render={({ field }) => (
              <Dropdown
                options={serviceNames}
                onSelect={handleCategorySelect}
                selectedOption={
                  service.find((service) => service.id === field.value)
                    ?.serviceName || ""
                }
                placeholder="Seleccione una categoría"
              />
            )}
          />
          {errors.serviceId && (
            <span className="text-red-600">{errors.serviceId.message}</span>
          )}
        </div>

        <div>
          <label className="block">Nuevo Precio</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            {...register("ammout")}
          />
          {errors.ammout && (
            <span className="text-red-600">{errors.ammout.message}</span>
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

export default CreateServicePriceForm;
