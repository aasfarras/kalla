import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogContent,
  Typography,
  TablePagination,
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import ServiceForm from "./service"; // Komponen form dalam modal
import { getTabel } from "../../service/servicetabel.service";
import { useTheme } from "@emotion/react";

const ServiceList = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();

  useEffect(() => {
    // Fetch data from API with pagination
    fetchServices(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchServices = (page, rowsPerPage) => {
    // Update getTabel to handle pagination parameters if necessary
    getTabel((data) => {
      setServices(data);
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitSuccess = () => {
    // Fetch updated data after successful submission
    fetchServices(page, rowsPerPage);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <MainCard title="Service List">
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          mb: 2,
          background: theme.palette.secondary.light,
          color: "#fff",
          "&:hover": {
            background: theme.palette.secondary.main,
          },
        }}
      >
        Add New Service
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Vehicle Model</TableCell>
              <TableCell>Police Number</TableCell>
              <TableCell>Service Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{service.vehicle_model}</TableCell>
                  <TableCell>{service.police_number}</TableCell>
                  <TableCell>{service.service_type}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={services.length} // Total count should be fetched from the API
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Add New Service
          </Typography>
          <ServiceForm
            userId={userId}
            handleClose={handleClose}
            onSubmitSuccess={handleSubmitSuccess}
          />
        </DialogContent>
      </Dialog>
    </MainCard>
  );
};

export default ServiceList;
