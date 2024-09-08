import { useState } from "react";
import { AuthType } from "@/app/components/Auth/authintarface";

export const useAuthService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: AuthType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
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

  return {
    login,
    loading,
    error,
  };
};
