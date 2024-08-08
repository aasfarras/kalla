import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import {
  Grid,
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
  Box,
  IconButton,
} from "@mui/material";
import { getVehicle } from "../../service/vehicle.service";
import { useTheme } from "@emotion/react";
import DownloadIcon from "@mui/icons-material/Download"; // Import ikon download

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageOrientation, setImageOrientation] = useState("horizontal");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const imageRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    getVehicle((data) => {
      const selectedVehicle = data.find((item) => item.id === parseInt(id));
      setVehicle(selectedVehicle);
    });
  }, [id]);

  const handleClickOpen = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
    setImageOrientation("horizontal"); // Reset orientation on close
  };

  useEffect(() => {
    if (selectedImage && imageRef.current) {
      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        setImageOrientation(img.width > img.height ? "horizontal" : "vertical");
      };
    }
  }, [selectedImage]);

  if (!vehicle) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <MainCard title="Vehicle Doc" style={{ overflow: "auto" }}>
      <Typography variant="h5">Model Name: {vehicle.model_name}</Typography>
      <Typography variant="body1">
        Police Number: {vehicle.police_number}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        BPKB Status: {vehicle.bpkb_status === "yes" ? "Yes" : "No"}
      </Typography>

      <Grid
        container
        direction={isMobile ? "column" : "row"}
        spacing={2}
        sx={{ mt: 2 }}
      >
        {vehicle.bstb && (
          <Grid item xs={12} sm={6} md={3}>
            <SubCard
              title="BSTB"
              sx={{
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: { md: "350px" },
              }}
              onClick={() => handleClickOpen(vehicle.bstb)}
            >
              <img
                src={vehicle.bstb}
                alt="BSTB"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </SubCard>
          </Grid>
        )}
        {vehicle.leasing && (
          <Grid item xs={12} sm={6} md={3}>
            <SubCard
              title="Leasing"
              sx={{
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: { md: "350px" },
              }}
              onClick={() => handleClickOpen(vehicle.leasing)}
            >
              <img
                src={vehicle.leasing}
                alt="Leasing"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </SubCard>
          </Grid>
        )}
        {vehicle.asurance && (
          <Grid item xs={12} sm={6} md={3}>
            <SubCard
              title="Asurance"
              sx={{
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: { md: "350px" },
              }}
              onClick={() => handleClickOpen(vehicle.asurance)}
            >
              <img
                src={vehicle.asurance}
                alt="Asurance"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </SubCard>
          </Grid>
        )}
        {vehicle.certificate && (
          <Grid item xs={12} sm={6} md={3}>
            <SubCard
              title="Certificate"
              sx={{
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: { md: "350px" },
              }}
              onClick={() => handleClickOpen(vehicle.certificate)}
            >
              <img
                src={vehicle.certificate}
                alt="Certificate"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </SubCard>
          </Grid>
        )}
        {vehicle.stnk && (
          <Grid item xs={12} sm={6} md={3}>
            <SubCard
              title="STNK"
              sx={{
                cursor: "pointer",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: { md: "350px" },
              }}
              onClick={() => handleClickOpen(vehicle.stnk)}
            >
              <img
                src={vehicle.stnk}
                alt="STNK"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </SubCard>
          </Grid>
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            overflow: "hidden",
            width: imageOrientation === "horizontal" ? "auto" : "100%",
            height: imageOrientation === "horizontal" ? "auto" : "90vh",
          }}
        >
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Selected"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              width: imageOrientation === "horizontal" ? "auto" : "100%",
              height: imageOrientation === "horizontal" ? "100%" : "auto",
            }}
          />
          <Box sx={{ mt: 2 }}>
            <a
              href={selectedImage}
              download
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton>
                <DownloadIcon />
              </IconButton>
              <Typography variant="body2" sx={{ ml: 1 }}>
                Download
              </Typography>
            </a>
          </Box>
        </DialogContent>
      </Dialog>
    </MainCard>
  );
};

export default VehicleDetail;
