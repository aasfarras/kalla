import React, { useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import { postService } from "../../service/service.service";
import { useTheme } from "@emotion/react";

const ServiceForm = ({ userId, handleClose, onSubmitSuccess }) => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    whatsapp: "",
    vehicleType: "",
    policeNumber: "",
    serviceType: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const serviceData = {
      customer_id: userId,
      service_type: formData.serviceType,
      vehicle_model: formData.vehicleType,
      police_number: formData.policeNumber,
    };

    postService(serviceData, (data) => {
      onSubmitSuccess();
      handleClose();
    });
  };

  return (
    <MainCard title="Add New Servicee">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <TextField
            required
            label="Tipe Mobil"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            label="Nomor Plat"
            name="policeNumber"
            value={formData.policeNumber}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="service-type-label">Tipe Service</InputLabel>
            <Select
              labelId="service-type-label"
              id="service-type"
              name="serviceType"
              value={formData.serviceType}
              label="Tipe Service"
              onChange={handleChange}
            >
              <MenuItem value="Service Berkala">Service Berkala</MenuItem>
              <MenuItem value="Perbaikan Kendaraan">
                Perbaikan Kendaraan
              </MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
              <MenuItem value="Home Service">Home Service</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: "100%",
              padding: "10px 0",
              fontSize: "14px",
              mt: { md: 2 },
              background: theme.palette.secondary.light,
              color: "#fff",
              "&:hover": {
                background: theme.palette.secondary.main,
                color: "#fff",
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ServiceForm;
