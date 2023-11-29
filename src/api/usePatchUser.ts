import { useState } from "react";
import axios from "axios";
import { updateEmployeeSuccess } from "../store/employeesSlice";
import { useDispatch } from "react-redux";
import { EmployeeIC } from "../lib/interfaces";

const useUpdateEmployee = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const updateEmployee = async (employee: EmployeeIC) => {
    setLoading(true);
    const { _id } = employee;
    if (_id) {
      const url = `http://142.132.229.249:3000/employees/${_id}`;
      try {
        const response = await axios.patch(url, employee);
        dispatch(updateEmployeeSuccess(response.data))
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      }
    }
    setLoading(false);
  };

  return { loading, error, updateEmployee };
};

export default useUpdateEmployee;
