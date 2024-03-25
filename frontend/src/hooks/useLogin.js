// useLogin.js
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data && data.error) {
          // If error message exists in response data, set it in error state
          setError(data.error);
        } else {
          // If no error message in data, set a generic error message
          setError("An error occurred during login.");
        }
        throw Error(data.error); // Throw error for catch block
      }

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
    } catch (error) {
      setError(error.message); // Set error state with the error message
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
