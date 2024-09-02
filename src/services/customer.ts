import { Customer } from "@/app/components/Customer/customerInterfaces";
import { useFetch } from "../hooks/useFetch";

export const useCustomerService = () => {
  const { data, error, loading, executeFetch } = useFetch<Customer[]>();
  const apiResource = "/api/customer";
  const membershipResource = "/api/membership";
  const dailyPassResource = "/api/dailypass";

  const createCustomer = async (customerData: Customer) => {
    const dataToSend = {
      ...customerData,
    };

    await executeFetch(
      apiResource,
      "POST",
      dataToSend,
      "Error creating customer",
      "Customer created successfully"
    );
  };

  const updateCustomer = async (
    customerId: number,
    updatedCustomerData: Customer
  ) => {
    const dataToSend = {
      ...updatedCustomerData,
    };

    await executeFetch(
      `${apiResource}/${customerId}`,
      "PATCH",
      dataToSend,
      "Error updating customer",
      "Customer updated successfully"
    );
  };

  const getAllCustomers = async () => {
    await executeFetch(
      apiResource,
      "GET",
      undefined,
      "Error fetching customers"
    );
  };

  const getCustomerById = async (customerId: number) => {
    await executeFetch(
      `${apiResource}/${customerId}`,
      "GET",
      undefined,
      "Error fetching customer"
    );
  };

  const deleteCustomer = async (customerId: number) => {
    await executeFetch(
      `${apiResource}/${customerId}`,
      "DELETE",
      undefined,
      "Error deleting customer",
      "Customer deleted successfully"
    );
  };

  // Nuevas funciones para obtener Memberships y DailyPasses

  const getAllMemberships = async () => {
    await executeFetch(
      membershipResource,
      "GET",
      undefined,
      "Error fetching memberships"
    );
  };

  const canceledMembership = async (customerId: number) => {
    await executeFetch(
      `${membershipResource}/${customerId}/cancel`,
      "PATCH",
      undefined,
      "Error canceling customer",
      "Customer canceled successfully"
    );
  };

  const renewMembership = async (customerId: number) => {
    await executeFetch(
      `${membershipResource}/${customerId}/renew`,
      "PATCH",
      undefined,
      "Error canceling customer",
      "Customer canceled successfully"
    );
  };

  const pendingMembership = async (customerId: number) => {
    await executeFetch(
      `${membershipResource}/${customerId}/peding`,
      "PATCH",
      undefined,
      "Error canceling customer",
      "Customer canceled successfully"
    );
  };

  const getAllDailyPasses = async () => {
    await executeFetch(
      dailyPassResource,
      "GET",
      undefined,
      "Error fetching daily passes"
    );
  };

  return {
    data,
    loading,
    error,
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getAllMemberships,
    getAllDailyPasses,
    canceledMembership,
    renewMembership,
    pendingMembership,
  };
};
