import React from "react";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthWrapper1 from "../AuthWrapper1";
import AuthCardWrapper from "../AuthCardWrapper";
import AuthLogin from "../authentication/auth-forms/AuthLogin";
import Logo from "../../../assets/images/logo-kalla.png";

const Login = () => {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <AuthWrapper1>
      {/* <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", padding: downMD ? "16px" : "24px" }}
      >
        <Grid item>cek</Grid>
      </Grid> */}

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh", padding: downMD ? "16px" : "24px" }}
      >
        <Grid
          item
          xs={12}
          md={6} // Adjust size based on your needs
          lg={4} // Adjust size based on your needs
        >
          <AuthCardWrapper>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item textAlign="center">
                <Link aria-label="logo">
                  <img width="150px" src={Logo} alt="logo" />
                </Link>
              </Grid>
              <Grid item>
                <AuthLogin />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </AuthCardWrapper>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
