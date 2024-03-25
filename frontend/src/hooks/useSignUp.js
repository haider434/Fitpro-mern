// useSignUp.js
import { useState } from "react";
import { useAuthContext } from './useAuthContext';

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch('http://localhost:4000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error); // Set error state with the error message from the response
        throw new Error(data.error);
      }

      localStorage.setItem('user', JSON.stringify(data));
      dispatch({ type: 'LOGIN', payload: data });

    } catch (error) {
      setError(error.message); // Set error state with the error message
    } finally {
      setIsLoading(false);
    }
  }

  return { signup, error, isLoading };
}

export default useSignUp;
