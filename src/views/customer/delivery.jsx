import React, { useState, useEffect } from "react";
import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import {
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
// import { getTest } from "../../service/test";
import { getDelivery } from "../../service/delivery.service";

const Delivery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState([]); // State untuk menyimpan data gambar

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    // Mengambil data dari API
    getDelivery((data) => {
      console.log(data); // Simpan data ke state
      setImageData(data);
      console.log(data[0].bstb);
      console.log(data[1].bstb);
    });
  }, []);

  return (
    <MainCard title="Dashboard" style={{ overflow: "auto" }}>
      <Typography>Coming soon</Typography>
    </MainCard>
  );
};

export default Delivery;
