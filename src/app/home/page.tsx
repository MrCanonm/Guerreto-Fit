"use client";
import { useStadisctisService } from "@/services/stadistics";
import { useEffect, useState } from "react";
import StatCard from "../components/Common/stadisticsCards/StatCard";
import { apiRequest } from "../components/utils/api";
import { useRouter } from "next/navigation";

const HomeDasboard = () => {
  const {
    statisticsData,
    servicePriceData,
    statsLoading,
    priceLoading,
    statsError,
    priceError,
    getAllStadistics,
    getActualServicePrice,
  } = useStadisctisService();

  const router = useRouter();
  const [protectedData, setProtectedData] = useState(null);
  const [protectedDataError, setProtectedDataError] = useState(null);

  useEffect(() => {
    getAllStadistics();
    getActualServicePrice();
    fetchProtectedData();
  }, []);

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token)
      // Si no hay token, redirigir a la página de login
      router.push("/");
    try {
      const data = await apiRequest("/api/dashboard", "GET");
      setProtectedData(data);
    } catch (error) {
      setProtectedDataError(null);
    }
  };

  // Mientras carga
  if (statsLoading || priceLoading) return <div>Loading...</div>;

  // Mostrar un mensaje de error si falla la carga
  if (statsError || priceError || protectedDataError)
    return (
      <div>
        Error loading data: {statsError || priceError || protectedDataError}
      </div>
    );

  return (
    <div className="dashboard">
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">Clientes</h1>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatCard
          title="Pagos Diarios de Hoy"
          value={statisticsData?.todayDailyPassCount || 0}
          color="orange"
        />
        <StatCard
          title="Membresías Activas"
          value={statisticsData?.totalActiveMemberships || 0}
          color="orange"
        />
        <StatCard
          title="Historial de Pagos Diarios"
          value={statisticsData?.totalDailyPassCount || 0}
          color="orange"
        />
      </div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">Precios de Hoy</h1>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatCard
          title="Membresías"
          value={`RD$${servicePriceData?.membershipPrice?.monto || 0}`}
          color="orange"
        />
        <StatCard
          title="Pagos Diarios"
          value={`RD$${servicePriceData?.dailypassPrice?.monto || 0}`}
          color="orange"
        />
      </div>
    </div>
  );
};

export default HomeDasboard;
