// components/AccessDenied.tsx
import React from "react";

const AccessDenied: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Acceso Denegado
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          No tienes permiso para acceder a esta función.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
