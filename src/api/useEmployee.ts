import { useState, useEffect } from "react";
import axios from "axios";
import { employeeAddedSuccess } from "../store/employeesSlice";
import { useDispatch } from "react-redux";

const useAddEmployee = () => {
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const addEmployee = async (employee: any) => {
    setLoading(true);
    try {
      const response = await axios.post("http://142.132.229.249:3000/employees", employee);
      console.log("response :>> ", response);
      dispatch(employeeAddedSuccess(response.data))
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred."));
      }
    }
    setLoading(false);
  };

  return { loading, error, addEmployee };
};

export default useAddEmployee;
