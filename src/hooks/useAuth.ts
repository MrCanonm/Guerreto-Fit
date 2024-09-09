import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken"); // Obtén el token de las cookies
    console.log(Cookies.get("authToken"));
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false); // Autenticación verificada (o no) y cargando finalizado
  }, [router]);

  return { isLoading, isAuthenticated };
}
