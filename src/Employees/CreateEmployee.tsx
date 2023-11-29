import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldProps, FormikTouched, FormikErrors } from "formik";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import TextField from "@mui/material/TextField";
import { Box, Stack } from "@mui/material";
import { FormValues } from "../lib/interfaces";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  homeAddress: {
    city: "",
    ZIPCode: "",
    addressLine1: "",
    addressLine2: "",
  },
  dateOfEmployment: "",
  dateOfBirth: "",
};

const CreateEmployee = ({ open, handleClose, handleCreate, handleUpdate, employeeToUpdate }: any) => {
  const [initialEmployeeValues, setInitialEmployeeValues] = useState(initialValues);
  const [isCreating, setIsCreating] = useState(true);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().matches(
      /^\+(?:[0-9]●?){6,14}[0-9]$/,
      'Please enter a valid phone number'
    )
    .required('Phone number is required'),
    homeAddress: Yup.object().shape({
      city: Yup.string().required("City is required"),
      ZIPCode: Yup.string().required("ZIP code is required"),
      addressLine1: Yup.string().required("Address Line 1 is required"),
      addressLine2: Yup.string().required("Address Line 2 is required"),
    }),
    dateOfEmployment: Yup.string().required("Date of Employment is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
  });

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    if (isCreating) {
      handleCreate(values);
      //resetForm();
    } else {
      handleUpdate(values);
      //resetForm()
    }
  };

  useEffect(() => {
    if (open && employeeToUpdate && Object.keys(employeeToUpdate).length !== 0) {
      setIsCreating(false);
      setInitialEmployeeValues(employeeToUpdate);
    } else {
      setIsCreating(true);
      setInitialEmployeeValues(initialValues);
    }
  }, [open, employeeToUpdate]);

  const formStyle = {
    padding: "10px 0",
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`${isCreating ? "Create" : "Update"}  Employee`}</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialEmployeeValues} validationSchema={validationSchema} enableReinitialize onSubmit={handleSubmit}>
          <Form style={formStyle}>
            <Stack width={300} direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
              <Box sx={{ width: "100%" }}>
                <Field name="name">
                  {({ field, form }: FieldProps) => (
                    <TextField
                      size="small"
                      {...field}
                      id="name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      error={!!(form.touched.name && form.errors.name)}
                      helperText={form.touched.name && form.errors.name ? String(form.errors.name) : ""}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="email">
                  {({ field, form }: FieldProps) => (
                    <TextField
                      size="small"
                      {...field}
                      id="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      error={!!(form.touched.email && form.errors.email)}
                      helperText={form.touched.email && form.errors.email ? String(form.errors.email) : ""}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="phoneNumber">
                  {({ field, form }: FieldProps) => (
                    <TextField
                      size="small"
                      {...field}
                      id="phoneNumber"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      error={!!(form.touched.phoneNumber && form.errors.phoneNumber)}
                      helperText={
                        form.touched.phoneNumber && form.errors.phoneNumber ? String(form.errors.phoneNumber) : ""
                      }
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="homeAddress.city">
                  {({ field, form }: FieldProps) => {
                    const touchedCity = form.touched.homeAddress as FormikTouched<{ city: string }> | undefined;
                    const errorCity = form.errors.homeAddress as FormikErrors<{ city: string }> | undefined;

                    return (
                      <TextField
                        size="small"
                        {...field}
                        id="homeAddress.city"
                        label="City"
                        variant="outlined"
                        fullWidth
                        error={touchedCity?.city && !!errorCity?.city}
                        helperText={touchedCity?.city && errorCity?.city ? errorCity.city : ""}
                      />
                    );
                  }}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="homeAddress.ZIPCode">
                  {({ field, form }: FieldProps) => {
                    const touchedZIPCode = form.touched.homeAddress as FormikTouched<{ ZIPCode: string }> | undefined;
                    const errorZIPCode = form.errors.homeAddress as FormikErrors<{ ZIPCode: string }> | undefined;

                    return (
                      <TextField
                        size="small"
                        {...field}
                        id="homeAddress.ZIPCode"
                        label="ZIP Code"
                        variant="outlined"
                        fullWidth
                        error={touchedZIPCode?.ZIPCode && !!errorZIPCode?.ZIPCode}
                        helperText={touchedZIPCode?.ZIPCode && errorZIPCode?.ZIPCode ? errorZIPCode.ZIPCode : ""}
                      />
                    );
                  }}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="homeAddress.addressLine1">
                  {({ field, form }: FieldProps) => {
                    const touchedAddressLine1 = form.touched.homeAddress as
                      | FormikTouched<{ addressLine1: string }>
                      | undefined;
                    const errorAddressLine1 = form.errors.homeAddress as
                      | FormikErrors<{ addressLine1: string }>
                      | undefined;

                    return (
                      <TextField
                        size="small"
                        {...field}
                        id="homeAddress.addressLine1"
                        label="Address Line1"
                        variant="outlined"
                        fullWidth
                        error={touchedAddressLine1?.addressLine1 && !!errorAddressLine1?.addressLine1}
                        helperText={
                          touchedAddressLine1?.addressLine1 && errorAddressLine1?.addressLine1
                            ? errorAddressLine1.addressLine1
                            : ""
                        }
                      />
                    );
                  }}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="homeAddress.addressLine2">
                  {({ field, form }: FieldProps) => {
                    const touchedAddressLine2 = form.touched.homeAddress as
                      | FormikTouched<{ addressLine2: string }>
                      | undefined;
                    const errorAddressLine2 = form.errors.homeAddress as
                      | FormikErrors<{ addressLine2: string }>
                      | undefined;

                    return (
                      <TextField
                        size="small"
                        {...field}
                        id="homeAddress.addressLine2"
                        label="Address Line2"
                        variant="outlined"
                        fullWidth
                        error={touchedAddressLine2?.addressLine2 && !!errorAddressLine2?.addressLine2}
                        helperText={
                          touchedAddressLine2?.addressLine2 && errorAddressLine2?.addressLine2
                            ? errorAddressLine2.addressLine2
                            : ""
                        }
                      />
                    );
                  }}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="dateOfEmployment">
                  {({ field, form }: FieldProps) => (
                    <DatePicker
                      {...field}
                      label="Date Of Employment"
                      value={dayjs(field.value)}
                      onChange={(newValue: any) => form.setFieldValue("dateOfEmployment", newValue)}
                    />
                  )}
                </Field>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="dateOfBirth">
                  {({ field, form }: FieldProps) => (
                    <DatePicker
                      {...field}
                      label="Date Of Employment"
                      value={dayjs(field.value)}
                      onChange={(newValue: any) => form.setFieldValue("dateOfBirth", newValue)}
                    />
                  )}
                </Field>
              </Box>
            </Stack>
            <Box sx={{ marginBottom: 1, marginTop: 1 }}>
              <Stack direction="row" justifyContent="space-between">
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  {`${isCreating ? "Create" : "Update"}`}
                </Button>
              </Stack>
            </Box>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmployee;
