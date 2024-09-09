import { useState } from "react";
import { AuthType } from "@/app/components/Auth/authintarface";

export const useAuthService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiBaseUrl = "/api/auth/login";
  const apiLogoutResource = "/api/auth/logout";

  const login = async (credentials: AuthType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiBaseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred during login");
      }

      document.cookie = `authToken=${data.token}; path=/; max-age=86400;`;

      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiLogoutResource, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Limpiar la cookie del cliente
        document.cookie = "authToken=; path=/; max-age=0;";

        setLoading(false);
        return { success: true };
      } else {
        // Manejar el error, retornar el mensaje de error
        const result = await response.json();
        setLoading(false);
        return {
          success: false,
          error: result.error || "Error al cerrar sesión",
        };
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: "Error de red al cerrar sesión" };
    }
  };

  return {
    logout,
    login,
    loading,
    error,
  };
};
