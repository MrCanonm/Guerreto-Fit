"use client";

import { useEffect, useState } from "react";

import CustomButton from "@/app/components/Common/CustomButton";
import { useNotification } from "../components/Common/Notification";
import { SubmitHandler } from "react-hook-form";
import { DataTable } from "@/app/components/Common/dataTable/DataTable";
import { ColumnDef } from "@tanstack/react-table";

import { usePriceService } from "@/services/serviceprice";
import { ServicePrice } from "../components/ServicePrices/servicepriceinterface";
import { formatter } from "../components/utils/fomartValue";
import CreateServicePriceForm from "../components/ServicePrices/CreateServicePriceForm";
import Modal from "../components/Common/Modal";

const ServicePricePage: React.FC = () => {
  const {
    data: servicePrice,
    getAllServicePrices,
    createServicePrice,
  } = usePriceService();

  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const { showSuccess, showError, showLoading, dismiss } = useNotification();

  useEffect(() => {
    getAllServicePrices();
  }, []);

  const handleModalClose = () => {
    setCreateModalIsOpen(false);
  };

  const onSubmit: SubmitHandler<ServicePrice> = async (formData) => {
    try {
      showLoading("Procesando", { id: "loading" });

      if (createModalIsOpen) {
        await createServicePrice(formData);
        showSuccess("Operación exitosa!", {
          description: `Se ha guardado el nuevo precio para el servicio`,
        });
        setCreateModalIsOpen(false);
      }

      getAllServicePrices();
      dismiss("loading");
    } catch (error) {
      console.error("Failed to submit form:", error);

      showError("Operación fallida!", {
        description: `Error al tratar de registrar el nuevo precio para el servicio, intentalo más tarde`,
      });

      dismiss("loading");
    }
  };

  const columns: ColumnDef<ServicePrice>[] = [
    { accessorKey: "service.serviceName", header: "Nombre del Servicio" },
    {
      accessorKey: "Precio",
      header: "Precio",
      cell: ({ row }) => {
        const servicePrice = row.original;
        return servicePrice ? formatter.format(servicePrice.monto) : "N/A";
      },
    },

    {
      accessorKey: "fecha",
      header: "Fecha de Actualización",
      cell: ({ row }) => {
        const servicePrice = row.original;
        return servicePrice ? (
          <div className="flex flex-col">
            {new Date(servicePrice.fecha).toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        ) : (
          "N/A"
        );
      },
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-900">
          Historial de Precios de Servicios
        </h1>

        <CustomButton
          variant="primary"
          onClick={() => setCreateModalIsOpen(true)}
        >
          Actualizar Precio
        </CustomButton>
      </div>

      <hr className="my-4" />

      <DataTable columns={columns} data={servicePrice || []} />

      <Modal isOpen={createModalIsOpen} onClose={handleModalClose}>
        <CreateServicePriceForm onSubmit={onSubmit} />
      </Modal>
    </div>
  );
};

export default ServicePricePage;
