import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Divider,
  CardMedia,
  useTheme,
  useMediaQuery,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import MainCard from "../../ui-component/cards/MainCard";
import SubCard from "../../ui-component/cards/SubCard";
import { getVehicle } from "../../service/vehicle.service";
import Carousel from "react-material-ui-carousel";
import image1 from "../../assets/images/edukasi.jpeg";
import image2 from "../../assets/images/edukasi3.jpeg";
import image3 from "../../assets/images/edukasi2.jpeg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const renderStatusIcon = (status) => {
  return status ? (
    <CheckCircleIcon color="success" />
  ) : (
    <CancelIcon color="error" />
  );
};

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    // Fetch vehicle data from API
    getVehicle((data) => {
      setVehicles(data);
    });
  }, []);

  const handlePromoteNowClick = () => {
    window.open("https://g.co/kgs/ftJfmjx", "_blank");
  };

  const handleSurveyClick = () => {
    window.open("https://g.co/kgs/ftJfmjx", "_blank");
  };

  return (
    <MainCard title="Dashboard" style={{ overflow: "auto" }}>
      <Grid container spacing={2}>
        {/* Left Side: Cards */}
        <Grid item xs={12} md={7}>
          {/* Card 1 */}
          <SubCard
            sx={{
              height: "auto",
              width: "100%",
              overflow: "auto",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "32px", mb: 2 }}
            >
              Upload Foto <br /> & Beri Review <br />
              Terbaikmu!
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              Upload Foto Anda selama berada di Dealer, berikan komentar terbaik
              Anda, & dapatkan 13 Kemudahan Pelanggan Kalla Toyota!
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>
              <Button variant="contained" onClick={handlePromoteNowClick}>
                Promote Now
              </Button>
            </Typography>
          </SubCard>

          {/* Card 2 */}
          <SubCard
            sx={{
              height: "auto",
              width: "100%",
              overflow: "auto",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", fontSize: "32px", mb: 2 }}
            >
              Isi Surveynya
              <br /> Dapatkan Hadiahnya!
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "16px" }}>
              Bantu kami agar dapat memahami kebutuhan Anda dengan baik,
              selesaikan Survey Kepuasan Pelanggan berikut dan dapatkan Freebies
              saat Service Pertama!
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>
              <Button variant="contained" onClick={handleSurveyClick}>
                Survey Kepuasan Pelanggan
              </Button>
            </Typography>
          </SubCard>
        </Grid>
        {/* Right Side: Slider and SubCards */}
        <Grid item xs={12} md={5}>
          {/* Image Slider */}
          <Carousel
            navButtonsAlwaysVisible
            sx={{
              width: "100%", // Adjust width as needed
              height: "100%", // Adjust height if needed
              mb: 2, // Margin bottom for spacing
            }}
          >
            <Card>
              <CardMedia
                component="img"
                height="100%"
                image={image1}
                alt="Image 1"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100%"
                image={image2}
                alt="Image 2"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="100%"
                image={image3}
                alt="Image 3"
              />
            </Card>
          </Carousel>
        </Grid>
        {/* Divider for separating slider and subcards */}
        <Divider sx={{ my: 2, width: "100%" }} /> {/* Full-width divider */}
        {/* Vehicle SubCard Section */}
        <Grid container spacing={2}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} key={vehicle.id}>
              <SubCard
                title={vehicle.model_name}
                sx={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: "auto",
                  width: "100%",
                  overflow: "auto",
                  cursor: "pointer",
                }}
              >
                <Typography color="textSecondary">
                  No. Polisi: {vehicle.police_number}
                </Typography>
                <Grid container spacing={2} mt={2}>
                  {/* Row 1 */}
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={4} display="flex" alignItems="center">
                      <Tooltip
                        title={
                          vehicle.bstb ? "BSTB available" : "BSTB not available"
                        }
                      >
                        <IconButton>
                          {renderStatusIcon(vehicle.bstb)}
                        </IconButton>
                      </Tooltip>
                      <Typography sx={{ ml: { xs: 0, md: 1 } }}>
                        BSTB
                      </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" alignItems="center">
                      <Tooltip
                        title={
                          vehicle.leasing
                            ? "Leasing available"
                            : "Leasing not available"
                        }
                      >
                        <IconButton>
                          {renderStatusIcon(vehicle.leasing)}
                        </IconButton>
                      </Tooltip>
                      <Typography sx={{ ml: { xs: 0, md: 1 } }}>
                        Leasing
                      </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" alignItems="center">
                      <Tooltip
                        title={
                          vehicle.asurance
                            ? "Asurance available"
                            : "Asurance not available"
                        }
                      >
                        <IconButton>
                          {renderStatusIcon(vehicle.asurance)}
                        </IconButton>
                      </Tooltip>
                      <Typography sx={{ ml: { xs: 0, md: 1 } }}>
                        Asurance
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* Row 2 */}
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={4} display="flex" alignItems="center">
                      <Tooltip
                        title={
                          vehicle.certificate
                            ? "Certificate available"
                            : "Certificate not available"
                        }
                      >
                        <IconButton>
                          {renderStatusIcon(vehicle.certificate)}
                        </IconButton>
                      </Tooltip>
                      <Typography sx={{ ml: { xs: 0, md: 1 } }}>
                        Certificate
                      </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" alignItems="center">
                      <Tooltip
                        title={
                          vehicle.stnk ? "STNK available" : "STNK not available"
                        }
                      >
                        <IconButton>
                          {renderStatusIcon(vehicle.stnk)}
                        </IconButton>
                      </Tooltip>
                      <Typography sx={{ ml: { xs: 0, md: 1 } }}>
                        STNK
                      </Typography>
                    </Grid>
                    <Grid item xs={4} display="flex" alignItems="center">
                      <Tooltip
                        title={
                          vehicle.bpkb_status === "yes"
                            ? "BPKB available"
                            : "BPKB not available"
                        }
                      >
                        <IconButton>
                          {vehicle.bpkb_status === "yes" ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <CancelIcon color="error" />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Typography sx={{ ml: { xs: 0, md: 1 } }}>
                        BPKB
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default VehicleList;
