import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import AnimateButton from "../../../../ui-component/extended/AnimateButton";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Google from "../../../../assets/images/icons/social-google.svg";

// ============================|| AUTH - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  const theme = useTheme();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(""); // State for login error
  const navigate = useNavigate();

  const googleHandler = async () => {
    console.error("Login");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, setSubmitting) => {
    try {
      const response = await axios.post(
        "https://api.agang-toyota.my.id/api/login",
        {
          username: values.username,
          password: values.password,
        }
      );

      if (response.data.code === 200) {
        // Simpan token di localStorage atau context
        localStorage.setItem("token", response.data.data.access_token);

        // Redirect ke halaman utama
        navigate("/customer/dashboard");
      } else {
        // Set error message if login fails
        setLoginError("Username atau Password salah");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Login gagal. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Username</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          username: "",
          password: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("Username is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values, setSubmitting);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.username && errors.username)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-username-login">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username-login"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Username"
              />
              {touched.username && errors.username && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-username-login"
                >
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            {loginError && (
              <Box sx={{ mt: 2 }}>
                <FormHelperText error>{loginError}</FormHelperText>
              </Box>
            )}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
