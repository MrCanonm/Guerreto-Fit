"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserRole } from "@/services/role";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken"); // Obtén el token de las cookies

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      // Aquí debes obtener el rol del usuario
      getUserRole()
        .then((name: string) => {
          setUserRole(name);
          setIsLoading(false); // Autenticación verificada (o no) y cargando finalizado
        })
        .catch(() => {
          router.push("/login");
        });
    }
  }, [router]);

  return { isLoading, isAuthenticated, userRole };
}
