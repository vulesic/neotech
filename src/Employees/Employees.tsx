import EmployeesList from "./EmployeesList";
import DeletedEmployeesList from "./DeletedEmployeesList";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useState } from "react";

const Employees = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5">NEOTECH SOLUTIONS - Dragan Vulešić</Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Employess" value="1" />
              <Tab label="Deleted employess" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <EmployeesList />
          </TabPanel>
          <TabPanel value="2">
            <DeletedEmployeesList />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Employees;
