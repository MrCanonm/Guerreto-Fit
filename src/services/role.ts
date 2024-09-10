// Service
import Cookies from "js-cookie";

// Servicio para obtener el rol del usuario
export async function getUserRole() {
  const token = Cookies.get("authToken");
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch("/api/role", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching role: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Role fetched:", data.role.name);
    return data.role.name;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}
