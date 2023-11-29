import { useState, useEffect } from "react";
import axios from "axios";
import { deleteEmployeeSuccess } from "../store/employeesSlice";
import { useDispatch } from "react-redux";
import { EmployeeIC } from "../lib/interfaces";

const useDeleteEmployee = () => {
  const dispatch = useDispatch();
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const deleteEmployee = async (employee: EmployeeIC) => {
    setLoading(true);
    const { _id } = employee;
    if (_id) {
      const url = `http://142.132.229.249:3000/employees/soft-delete/${_id}`;
      try {
        const response = await axios.delete(url);
        console.log("response :>> ", response);
        dispatch(deleteEmployeeSuccess(response.data))
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

  return { loading, error, deleteEmployee };
};

export default useDeleteEmployee;
