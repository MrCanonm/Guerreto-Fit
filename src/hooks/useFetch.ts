import { useState } from "react";

export const useFetch = <T = unknown>(defaultData: T | null = null) => {
  const [data, setData] = useState<T | null>(defaultData);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const executeFetch = async (
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
    bodyData?: unknown,
    errorMessage?: string,
    successMessage?: string
  ) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(endpoint, {
        method,
        headers:
          bodyData instanceof FormData
            ? // No Content-Type header for FormData
              {}
            : {
                "Content-Type": "application/json",
              },
        body:
          bodyData instanceof FormData
            ? bodyData
            : bodyData
            ? JSON.stringify(bodyData)
            : null,
        credentials: "include",
      });

      if (!response.ok) {
        const responseJson = await response.json();
        const extractedText = responseJson?.message || "Error";
        errorMessage = extractedText;
        throw new Error(extractedText);
      }

      const result = await response.json();
      setData(result);

      if (method !== "GET") {
        if (result?.result?.data?.rejected?.length > 0) {
        }
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, message, executeFetch };
};
