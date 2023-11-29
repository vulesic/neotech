import { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchEmployees } from "../store/employeesSlice";
import { useDispatch } from 'react-redux';

const useFetchEmployees = () => {
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://142.132.229.249:3000/employees?page=${page}&limit=6`);
      // setData(response.data);
      dispatch(fetchEmployees(response.data))
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('An unknown error occurred.'));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(1); // Fetch data for the initial page when the component mounts
  }, []);

  return { loading, error, fetchData };
};

export default useFetchEmployees;
