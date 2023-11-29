import React from 'react';
import { Provider } from "react-redux";
import store from "./store/store";
import './App.css';
import Employees from './Employees/Employees';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <Box>
          <Employees />
        </Box>
      </Provider>
    </LocalizationProvider>
  );
};

export default App;
