import { useFetch } from "../hooks/useFetch";

export const useStadisctisService = () => {
  const { data, error, loading, executeFetch } = useFetch<StatisticsData>();
  const apiResource = "/api/dashboard";

  const getAllStadistics = async () => {
    await executeFetch(
      apiResource,
      "GET",
      undefined,
      "Error fetching customers"
    );
  };

  return {
    data,
    loading,
    error,

    getAllStadistics,
  };
};
