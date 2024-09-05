"use client";

import { useStadisctisService } from "@/services/stadistics";
import { useEffect } from "react";
import StatCard from "./components/Common/stadisticsCards/StatCard";

const Home = () => {
  const { data, loading, error, getAllStadistics } = useStadisctisService();

  useEffect(() => {
    getAllStadistics();
  }, [getAllStadistics]);

  // Mientras carga
  if (loading) return <div>Loading...</div>;

  // Mostrar un mensaje de error si falla la carga
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div className="dashboard">
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
      </div>

      <hr className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatCard
          title="Membresías Activas"
          value={data?.totalActiveMemberships || 0}
          color="green"
        />
        <StatCard
          title="Pagos Diarios de  Hoy"
          value={data?.todayDailyPassCount || 0}
          color="blue"
        />
        <StatCard
          title="Total Pagos Diarios"
          value={data?.totalDailyPassCount || 0}
          color="blue"
        />
        <StatCard
          title="Monto Total Membresías"
          value={`$${data?.totalMembershipAmount || 0}`}
          color="blue"
        />
        <StatCard
          title="Monto Pago Diario de Hoy"
          value={`$${data?.totalDailyPassAmountToday || 0}`}
          color="blue"
        />
        <StatCard
          title="Monto Total de Pagos Diarios"
          value={`$${data?.totalDailyPassAmount || 0}`}
          color="blue"
        />
        <StatCard
          title="Monto Total Combinado"
          value={`$${data?.totalAmmout || 0}`}
          color="blue"
        />
      </div>
    </div>
  );
};

export default Home;
