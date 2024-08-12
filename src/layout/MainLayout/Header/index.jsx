import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// project imports
import LogoSection from "../LogoSection";
import Logo from "../../../assets/images/logo-kalla.png";

// import NotificationSection from "./NotificationSection";
import ProfileSection from "./ProfileSection";

// assets
import { IconMenu2 } from "@tabler/icons-react";
import { height, width } from "@mui/system";
import { Typography } from "@mui/material";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: { xs: "none", md: "block" },
            flexGrow: 1,
          }}
        >
          <img width="150px" src={Logo} alt="logo" />
        </Box>
        <ButtonBase sx={{ borderRadius: "8px", overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.orange.main,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <Box sx={{ ml: { xs: 2, md: 5 } }}>
        <Typography sx={{ fontSize: { xs: 11, md: 14 }, mb: { xs: 0.5 } }}>
          Selamat Datang, AGANG TOYOTA!
        </Typography>
        <Typography variant="h4" sx={{ fontSize: { xs: 12, md: 16 } }}>
          KALLA GOWA PERSONAL GUIDE
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      {/* <NotificationSection /> */}
      <ProfileSection />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
