import React from "react";
import MainCard from "../../ui-component/cards/MainCard";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// Import gambar
import image1 from "../../assets/images/edukasi.jpeg";
import image2 from "../../assets/images/edukasi3.jpeg";
import image3 from "../../assets/images/edukasi2.jpeg";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const images = [image1, image2, image3];

  return (
    <MainCard title="Dashboard" style={{ overflow: "auto" }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="100%"
                image={image}
                alt={`Image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
};

export default Dashboard;
