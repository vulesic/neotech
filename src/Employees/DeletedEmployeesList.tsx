import React, { useEffect, useState } from "react";
import { EmployeeIC, EmployeesIC } from "../lib/interfaces";
import { selectDeletedEmployees, selectDeletedCount } from "../store/employeesSlice";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import useFetchDeletedEmployees from "../api/useDeletedEmployees";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const DeletedEmployeesList = () => {
  const employeesState = useSelector(selectDeletedEmployees);
  const countState = useSelector(selectDeletedCount);
  const { fetchDeletedData } = useFetchDeletedEmployees();

  const handlePaginationClick = (page: number) => {
    console.log("page :>> ", page);
    fetchDeletedData(page);
  };

  return (
    <Box className="DeletedEmployeesList" sx={{padding: 1, marginTop: 2}}>
      <Typography variant="h5">Deleted Employees List</Typography>
      {employeesState && (
        <List>
          {/* Titles for Columns */}
          <ListItem>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <ListItemText primary="Name" />
              </Grid>
              <Grid item xs={3}>
                <ListItemText primary="Email" />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary="Phone" />
              </Grid>
              <Grid item xs={4}>
                <ListItemText primary="City" />
              </Grid>
            </Grid>
          </ListItem>

          {employeesState.map((employee: EmployeeIC) => (
            <ListItem key={employee.email}>
              <Grid container spacing={0}>
                <Grid item xs={3}>
                  <ListItemText primary={employee.name} />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText primary={employee.email} />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={employee.phoneNumber} />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText primary={employee.homeAddress.city} />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
      <Pagination count={countState} limit={6} handleClick={handlePaginationClick} />
    </Box>
  );
};

export default DeletedEmployeesList;
