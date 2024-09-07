import { ServicePrice } from "@/app/components/ServicePrices/servicepriceinterface";
import { useFetch } from "../hooks/useFetch";

export const usePriceService = () => {
  const { data, error, loading, executeFetch } = useFetch<ServicePrice[]>();

  const apiResource = "/api/serviceprice";
  const servicePricesResource = "/api/serviceprices";
  const serviceResource = "/api/service";

  const createServicePrice = async (createServicePrice: ServicePrice) => {
    const dataToSend = {
      ...createServicePrice,
    };

    await executeFetch(
      apiResource,
      "POST",
      dataToSend,
      "Error creating customer",
      "Customer created successfully"
    );
  };
  const getAllServicePrices = async () => {
    await executeFetch(
      servicePricesResource,
      "GET",
      undefined,
      "Error fetching service prices"
    );
  };

  const getAlllService = async () => {
    const result = await executeFetch(
      serviceResource,
      "GET",
      undefined,
      "Error fetching service prices"
    );

    return result;
  };

  return {
    data,
    error,
    loading,
    executeFetch,
    createServicePrice,
    getAllServicePrices,
    getAlllService,
  };
};
