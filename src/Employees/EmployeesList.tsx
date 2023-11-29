import React, { useEffect, useState } from "react";
import { EmployeeIC } from "../lib/interfaces";
import { selectEmployees, selectCount } from "../store/employeesSlice";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import useFetchEmployees from "../api/useEmployees";
import useDeleteEmployee from "../api/useDeleteEmployee";
import useAddEmployee from "../api/useEmployee";
import useUpdateEmployee from "../api/usePatchUser";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import CreateEmployee from "./CreateEmployee";

const EmployeesList = () => {
  const employeesState = useSelector(selectEmployees);
  const countState = useSelector(selectCount);
  const { fetchData } = useFetchEmployees();
  const { addEmployee } = useAddEmployee();
  const { deleteEmployee } = useDeleteEmployee();
  const { updateEmployee } = useUpdateEmployee();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<EmployeeIC | {}>();
  const [employeeToUpdate, setEmployeeToUpdate] = useState<EmployeeIC | {}>();
  const [employees, setEmployees] = useState<EmployeeIC[] | []>();

  const handlePaginationClick = (page: number) => {
    fetchData(page);
  };

  const handleDeleteClick = (employee: EmployeeIC) => {
    setOpenDeleteDialog(true);
    setEmployeeToDelete(employee);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete && "_id" in employeeToDelete) {
      deleteEmployee(employeeToDelete as EmployeeIC);
    }
    setOpenDeleteDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleUpdateUser = (employee: EmployeeIC) => {
    setOpenUpdateDialog(true);
    setEmployeeToUpdate(employee);
  };

  const handleCreateEmployee = (emp: EmployeeIC) => {
    console.log("emp :>> ", emp);
    addEmployee(emp);
    setOpenUpdateDialog(false);
  };

  const handleUpdateEmployee = (emp: EmployeeIC) => {
    updateEmployee(emp)
    setOpenUpdateDialog(false);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleAddNewUser = () => {
    setEmployeeToUpdate({});
    setOpenUpdateDialog(true);
  };

  useEffect(() => {
    console.log("employeesState, employees :>> ", employeesState, employees);
    setEmployees(employeesState);
  }, [employeesState]);

  return (
    <Box className="EmployeesList" sx={{padding: 1}}>
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        handleClose={handleCloseDialog}
        handleDelete={handleConfirmDelete}
      />
      <CreateEmployee
        open={openUpdateDialog}
        handleClose={handleCloseUpdateDialog}
        handleCreate={handleCreateEmployee}
        handleUpdate={handleUpdateEmployee}
        employeeToUpdate={employeeToUpdate}
      />
      <Box sx={{ marginBottom: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Divider variant="middle" />
          <IconButton
            edge="end"
            aria-label="update"
            sx={{ margin: 0, padding: 0, paddingLeft: 1, paddingRight: 1, color: "green" }}
            disableFocusRipple
            disableRipple
            size="small"
            onClick={() => handleAddNewUser()}
          >
            <Typography variant="subtitle1">Add employee</Typography>
            <AddIcon />
          </IconButton>
        </Stack>
      </Box>
      {employees && (
        <List>
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
              <Grid item xs={2}>
                <ListItemText primary="City" />
              </Grid>
              <Grid item xs={2}>
                <ListItemText primary="Actions" />
              </Grid>
            </Grid>
          </ListItem>

          {employees.map((employee: EmployeeIC) => (
            <ListItem key={employee?.email}>
              <Grid container spacing={0}>
                <Grid item xs={3}>
                  <ListItemText primary={employee?.name} />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText primary={employee?.email} />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={employee?.phoneNumber} />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText primary={employee?.homeAddress.city} />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    edge="end"
                    aria-label="update"
                    sx={{ margin: 0, padding: 0, paddingLeft: 1, paddingRight: 1, color: "green" }}
                    onClick={() => handleUpdateUser(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ margin: 0, padding: 0, paddingLeft: 1, paddingRight: 1, color: "red" }}
                    onClick={() => handleDeleteClick(employee)}
                  >
                    <DeleteIcon />
                  </IconButton>
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

export default EmployeesList;
