"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { getUserRole } from "@/services/role";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userPermission, setUserPermission] = useState<string[] | null>(null);
  const router = useRouter();

  const checkAuth = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserPermission(null);
      setIsLoading(false);
      return false;
    }

    try {
      const user = await getUserRole();
      setUserRole(user.data.role);
      setUserPermission(user.data.rolePermissions);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserPermission(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const refreshAuth = async () => {
    setIsLoading(true);
    const isAuth = await checkAuth();
    if (isAuth) {
      router.push("/home");
    }
  };

  return { isLoading, isAuthenticated, userRole, userPermission, refreshAuth };
}
