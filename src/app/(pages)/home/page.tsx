"use client";

import { useStadisctisService } from "@/services/stadistics";
import { useEffect, useState } from "react";
import StatCard from "@/app/components/Common/stadisticsCards/StatCard";
import { useAuth } from "@/hooks/useAuth";

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
    getExpiredMemberships,
  } = useStadisctisService();

  const [protectedDataError] = useState(null);
  const [pendingMemberships, setPendingMemberships] = useState([]);
  const { userRole } = useAuth();

  useEffect(() => {
    getAllStadistics();
    getActualServicePrice();
    expiredMemberships();
  }, []);

  const expiredMemberships = async () => {
    const pendingMemberships = await getExpiredMemberships();
    setPendingMemberships(pendingMemberships);
    console.log("Expired memberships:", pendingMemberships.length);
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

  console.log(statisticsData?.totalAmount);

  if (userRole === "Owner") {
    return (
      <div className="dashboard">
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Membresias Pendiente de Pago
          </h1>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <StatCard
            title="Membresías Pendientes"
            value={`${pendingMemberships.length || 0}`}
            color="orange"
          />
        </div>

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
            value={`RD$${servicePriceData?.membershipPrice?.ammout || 0}`}
            color="orange"
          />
          <StatCard
            title="Pagos Diarios"
            value={`RD$${servicePriceData?.dailypassPrice?.ammout || 0}`}
            color="orange"
          />
        </div>

        <div className="w-full flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gray-700">Ganancias</h1>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <StatCard
            title="Total Membresías"
            value={`RD$${statisticsData?.totalMembershipAmount || 0}`}
            color="orange"
          />
          <StatCard
            title="TotalPagos Diarios"
            value={`RD$${statisticsData?.totalDailyPassAmount || 0}`}
            color="orange"
          />

          <StatCard
            title="Ganancias Actuales"
            value={`RD$${statisticsData?.totalAmount || 0}`}
            color="orange"
          />
        </div>
      </div>
    );
  }
  if (userRole === "Employes") {
    return (
      <div className="dashboard">
        <div className="w-full flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-gray-700">
            Membresias Pendiente a Pagar
          </h1>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <StatCard
            title="Membresías Pendientes"
            value={`${pendingMemberships.length || 0}`}
            color="orange"
          />
        </div>

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
            value={`RD$${servicePriceData?.membershipPrice?.ammout || 0}`}
            color="orange"
          />
          <StatCard
            title="Pagos Diarios"
            value={`RD$${servicePriceData?.dailypassPrice?.ammout || 0}`}
            color="orange"
          />
        </div>
      </div>
    );
  }
};

export default HomeDasboard;
