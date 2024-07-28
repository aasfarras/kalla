import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import { useState } from "react";
import { height } from "@mui/system";

const service = () => {
  const theme = useTheme();

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <MainCard title="Service" sx={{ height: "100%" }}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField required label="Nama Lengkap" sx={{ width: "100%" }} />
          </Grid>
          <Grid item>
            <TextField required label="Nomor Whatsapp" sx={{ width: "100%" }} />
          </Grid>
          <Grid item>
            <TextField required label="Tipe Mobil" sx={{ width: "100%" }} />
          </Grid>
          <Grid item>
            <TextField required label="Nomor Plat" sx={{ width: "100%" }} />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipe Service
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Tipe Service"
                onChange={handleChange}
              >
                <MenuItem value="Service Berkala">Service Berkala</MenuItem>
                <MenuItem value="Pebaikan Kendaraan">
                  Perbaikan Kendaraan
                </MenuItem>
                <MenuItem value="Emergency">Emergency</MenuItem>
                <MenuItem value="Home Service">Home Service</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default service;
