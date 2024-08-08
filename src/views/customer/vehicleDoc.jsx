import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import { getVehicle } from "../../service/vehicle.service";

const VehicleDoc = () => {
  const [imageData, setImageData] = useState([]); // State untuk menyimpan data gambar
  const navigate = useNavigate();

  useEffect(() => {
    // Mengambil data dari API
    getVehicle((data) => {
      setImageData(data);
    });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/customer/vehicle/${id}`);
  };

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <MainCard title="Dokumen" style={{ overflow: "auto" }}>
      <Grid container direction="row" spacing={2}>
        {imageData.length > 0 &&
          imageData.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                height: "auto",
                width: "100%",
                marginBottom: "16px",
              }}
            >
              <SubCard
                title={item.model_name}
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "100%",
                  width: "100%",
                  overflow: "auto",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(item.id)}
              >
                <Typography variant="h6">{item.model_name}</Typography>
                <Typography variant="body2">{item.police_number}</Typography>
              </SubCard>
            </Grid>
          ))}
      </Grid>
    </MainCard>
  );
};

export default VehicleDoc;
