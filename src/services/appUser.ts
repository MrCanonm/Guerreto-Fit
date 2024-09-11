import { useFetch } from "../hooks/useFetch";
import { AppUser } from "@/app/components/AppUser/app-user-intertace";

export const useAppUserService = () => {
  const { data, error, loading, executeFetch } = useFetch<AppUser[]>();
  const apiResource = "/api/appUser";
  const roleResource = "/api/role/roles";

  const createAppUser = async (appUserData: AppUser) => {
    const dataToSend = {
      ...appUserData,
    };

    await executeFetch(
      apiResource,
      "POST",
      dataToSend,
      "Error creating customer",
      "Customer created successfully"
    );
  };

  const getAllAppUser = async () => {
    await executeFetch(
      apiResource,
      "GET",
      undefined,
      "Error fetching customers"
    );
  };

  const getAllRoles = async () => {
    const data = await executeFetch(
      roleResource,
      "GET",
      undefined,
      "Error fetching customers"
    );
    return data;
  };

  return {
    data,
    loading,
    error,
    createAppUser,
    getAllAppUser,
    getAllRoles,
  };
};
