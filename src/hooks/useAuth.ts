import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login"); // Redirige al login si no hay token
    }
  }, [router]);
}
