// components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext"; // Asegúrate de tener un contexto de autenticación

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/404"); // Redirige a la página 404 si no está autenticado
    }
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedRoute;
