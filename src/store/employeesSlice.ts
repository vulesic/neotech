import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateIC, FetchEmployeesIC } from "../lib/interfaces";

const initialState: InitialStateIC = {
  employees: [],
  count: 0,
  deletedEmployees: [],
  deletedCount: 0,
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    fetchEmployees: (state, action: PayloadAction<FetchEmployeesIC>) => {
      const { employees, count } = action.payload;
      state.employees = employees;
      state.count = count;
    },

    fetchDeletedEmployees: (state, action: PayloadAction<FetchEmployeesIC>) => {
      const { employees, count } = action.payload;
      state.deletedEmployees = employees;
      state.deletedCount = count;
    },

    employeeAddedSuccess: (state, action: PayloadAction<any>) => {
      state.employees = [...state.employees, action.payload];
      state.count += 1; 
    },

    deleteEmployeeSuccess: (state, action) => {
      const idToDelete = action.payload._id;
      state.employees = state.employees.filter((employee) => employee._id !== idToDelete);
      state.count -= 1;
      state.deletedEmployees = [...state.deletedEmployees, action.payload];
      state.deletedCount += 1; 
    },

    updateEmployeeSuccess: (state, action) => {
      const updatedEmployee = action.payload;
      const indexToUpdate = state.employees.findIndex((employee) => employee._id === updatedEmployee._id);
      if (indexToUpdate !== -1) {
        state.employees[indexToUpdate] = { ...state.employees[indexToUpdate], ...updatedEmployee };
      }
    },
  },
});

export const selectEmployees = (state: any) => state.employees.employees;
export const selectCount = (state: any) => state.employees.count;
export const selectDeletedEmployees = (state: any) => state.employees.deletedEmployees;
export const selectDeletedCount = (state: any) => state.employees.deletedCount;

export const { fetchEmployees, fetchDeletedEmployees, employeeAddedSuccess, updateEmployeeSuccess, deleteEmployeeSuccess } =
  employeesSlice.actions;
export default employeesSlice.reducer;
