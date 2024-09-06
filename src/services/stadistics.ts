import {
  StatisticsData,
  ServicePriceData,
} from "@/app/components/Dashboard/dashboardinterface";
import { useFetch } from "../hooks/useFetch";

export const useStadisctisService = () => {
  const {
    data: statisticsData,
    error: statsError,
    loading: statsLoading,
    executeFetch: fetchStatistics,
  } = useFetch<StatisticsData>();
  const {
    data: servicePriceData,
    error: priceError,
    loading: priceLoading,
    executeFetch: fetchServicePrices,
  } = useFetch<ServicePriceData>();

  const apiResource = "/api/dashboard";
  const servicePriceResource = "/api/serviceprice";

  const getAllStadistics = async () => {
    await fetchStatistics(
      apiResource,
      "GET",
      undefined,
      "Error fetching statistics"
    );
  };

  const getActualServicePrice = async () => {
    await fetchServicePrices(
      servicePriceResource,
      "GET",
      undefined,
      "Error fetching service prices"
    );
  };

  return {
    statisticsData,
    servicePriceData,
    statsLoading,
    priceLoading,
    statsError,
    priceError,
    getActualServicePrice,
    getAllStadistics,
  };
};
