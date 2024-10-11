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
import { getDashboard } from "../../service/dashboard.service";
import { getListPromotion } from "../../service/listPromotion.service";
import Carousel from "react-material-ui-carousel";
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
  const [promotion, setListPromotion] = useState([]);
  const [surveyLink, setSurveyLink] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    // Fetch vehicle data from API
    getVehicle((data) => {
      setVehicles(data);
    });

    getDashboard((data) => {
      setSurveyLink(data.value);
    });

    // Fetch promotion images from API
    getListPromotion((data) => {
      setListPromotion(data); // Simpan data promosi
    });
  }, []);

  const handlePromoteNowClick = () => {
    window.open("https://maps.app.goo.gl/QNhULdx8yAu6nnM99?g_st=iw", "_blank");
  };

  const handleSurveyClick = () => {
    if (surveyLink) {
      window.open(surveyLink, "_blank");
    } else {
      console.error("Survey link is not available");
    }
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
              sx={{
                fontWeight: "bold",
                fontSize: { md: "38px", xs: "30px" },
                mb: 4.5,
                mt: 2,
              }}
            >
              Upload Foto <br /> & Beri Review <br />
              Terbaikmu!
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { md: "18px", xs: "14px" }, mb: 2 }}
            >
              Upload Foto Anda selama berada di Dealer, berikan komentar terbaik
              Anda, & dapatkan 13 Kemudahan Pelanggan Kalla Toyota!
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography>
              <Button
                variant="contained"
                onClick={handlePromoteNowClick}
                sx={{
                  background: theme.palette.primary.dark,
                }}
              >
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
              sx={{
                fontWeight: "bold",
                fontSize: { md: "38px", xs: "30px" },
                mb: 4.5,
                mt: 2,
              }}
            >
              Isi Surveynya
              <br /> Dapatkan Hadiahnya!
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: { md: "18px", xs: "14px" }, mb: 2 }}
            >
              Bantu kami agar dapat memahami kebutuhan Anda dengan baik,
              selesaikan Survey Kepuasan Pelanggan berikut dan dapatkan Freebies
              saat Service Pertama!
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography>
              <Button
                variant="contained"
                onClick={handleSurveyClick}
                sx={{ background: theme.palette.primary.dark }}
              >
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
              width: "100%",
              height: "100%",
              mb: 2,
            }}
          >
            {promotion.map((promo) => (
              <Card key={promo.id}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={promo.image_path} // Menggunakan gambar dari API
                  alt={`Promotion ${promo.id}`}
                />
              </Card>
            ))}
          </Carousel>
        </Grid>
        {/* Divider for separating slider and subcards */}
        <Divider sx={{ my: 2, width: "100%" }} />
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
                <Typography
                  color="textSecondary"
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "14px", md: "inherit" },
                  }} // Adjust text size for mobile
                >
                  No. Polisi: {vehicle.police_number}
                </Typography>
                <Grid container spacing={2} mt={2} justifyContent="center">
                  {/* Row 1 */}
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    direction={isMobile ? "column" : "row"}
                  >
                    {[
                      { label: "BSTB", status: vehicle.bstb },
                      { label: "Leasing", status: vehicle.leasing },
                      { label: "Asurance", status: vehicle.asurance },
                    ].map((item, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        display="flex"
                        alignItems="center"
                        key={index}
                      >
                        <Tooltip
                          title={
                            item.status
                              ? `${item.label} available`
                              : `${item.label} not available`
                          }
                        >
                          <IconButton>
                            {renderStatusIcon(item.status)}
                          </IconButton>
                        </Tooltip>
                        <Typography
                          sx={{
                            ml: { xs: 0, md: 1 },
                            textAlign: "center",
                            fontSize: { xs: "14px", md: "inherit" },
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                  {/* Row 2 */}
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={2}
                    direction={isMobile ? "column" : "row"}
                  >
                    {[
                      { label: "Certificate", status: vehicle.certificate },
                      { label: "STNK", status: vehicle.stnk },
                      { label: "BPKB", status: vehicle.bpkb },
                    ].map((item, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={4}
                        display="flex"
                        alignItems="center"
                        key={index}
                      >
                        <Tooltip
                          title={
                            item.status
                              ? `${item.label} available`
                              : `${item.label} not available`
                          }
                        >
                          <IconButton>
                            {renderStatusIcon(item.status)}
                          </IconButton>
                        </Tooltip>
                        <Typography
                          sx={{
                            ml: { xs: 0, md: 1 },
                            textAlign: "center",
                            fontSize: { xs: "14px", md: "inherit" },
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Grid>
                    ))}
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
