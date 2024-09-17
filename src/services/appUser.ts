import { useFetch } from "../hooks/useFetch";
import { AppUser } from "@/app/components/AppUser/app-user-intertace";

export const useAppUserService = () => {
  const { data, error, loading, executeFetch } = useFetch<AppUser[]>();
  const apiResource = "/api/appUser";
  const roleResource = "/api/role/roles";
  const actualUserResource = "/api/appUser/actualUser";

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

  const updateStatus = async (appUserId: string) => {
    await executeFetch(
      `${apiResource}/${appUserId}`,
      "PATCH",
      "Error updating user",
      "User updated successfully"
    );
  };

  const getAppUserById = async (appUserId: string) => {
    const data = await executeFetch(
      `${apiResource}/${appUserId}`,
      "GET",
      "Error updating user",
      "User updated successfully"
    );
    return data;
  };

  const updatePassword = async (appUserId: string, appUserData: AppUser) => {
    const dataToSend = {
      ...appUserData,
    };
    await executeFetch(
      `${apiResource}/${appUserId}/updatePassword`,
      "PATCH",
      dataToSend,
      "Error updating user",
      "User updated successfully"
    );
  };

  const actualUser = async () => {
    const data = await executeFetch(
      actualUserResource,
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
    updateStatus,
    actualUser,
    updatePassword,
    getAppUserById,
  };
};
