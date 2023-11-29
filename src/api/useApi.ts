import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ApiHookResponse<T> = ApiResponse<T> & {
  setUrl: Dispatch<SetStateAction<string>>;
  setMethod: Dispatch<SetStateAction<HttpMethod>>;
  setBody: Dispatch<SetStateAction<any>>;
  updateUrl: Dispatch<SetStateAction<any>>;
  trigger: () => void; // Function to trigger the API call
};

const useAPI = <T>(
  initialUrl: string,
  initialMethod: HttpMethod = 'GET',
  initialBody?: any
): ApiHookResponse<T> => {
  const [url, setUrl] = useState<string>(initialUrl);
  const [method, setMethod] = useState<HttpMethod>(initialMethod);
  const [body, setBody] = useState<any>(initialBody);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const updateUrl = useCallback((newUrl: string) => {
    console.log('newUrl :>> ', newUrl);
    setUrl(newUrl);
  }, [url]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json', // Modify headers as needed
        },
        body: body ? JSON.stringify(body) : undefined,
      };
      
      // console.log('url :>> ', url);
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      if (method === 'DELETE') {
        setData(null);
      } else {
        const result: T = await response.json();
        setData(result);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const trigger = () => {
    console.log('trigger :>> ', );
    if (body !== undefined) {
      fetchData();
    }
  };

  useEffect(() => {
    // This effect is intentionally left empty to avoid triggering the API call on component mount
  }, []);

  return {
    data,
    isLoading,
    error,
    updateUrl,
    setUrl,
    setMethod,
    setBody,
    trigger, // Expose trigger function
  };
};

export default useAPI;
