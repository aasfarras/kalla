import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

// material-ui
import {
  useTheme,
  Avatar,
  Box,
  Button,
  Chip,
  ClickAwayListener,
  List,
  Paper,
  Popper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import Transitions from "../../../../ui-component/extended/Transitions";

// assets
import { IconLogout, IconSettings } from "@tabler/icons-react";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // state untuk modal
  const [loading, setLoading] = useState(true); // state untuk loading data
  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    imageUrl: "",
  });

  const anchorRef = useRef(null);

  // Function to fetch profile data from the API
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        "https://api.agang-toyota.my.id/api/customer/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is successful and has data
      if (response.data && response.data.code === 200) {
        const { username, name, email, phone, gender, address, imageUrl } =
          response.data.data;
        setProfileData({
          username,
          name,
          email,
          phone,
          gender,
          address,
          imageUrl,
        });
      } else {
        console.error("Failed to fetch profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchProfileData when the component is mounted
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(
        "https://api.agang-toyota.my.id/api/logout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        localStorage.removeItem("token");

        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleProfileOpen = () => {
    setProfileOpen(true); // buka modal
  };

  const handleProfileClose = () => {
    setProfileOpen(false); // tutup modal
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.dark,
            background: `${theme.palette.primary.dark}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            src={profileData.imageUrl}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={
          <IconSettings
            stroke={1.5}
            size="1.5rem"
            color={theme.palette.primary.dark}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 1, pt: 0 }}>
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [theme.breakpoints.down("md")]: {
                          minWidth: "100%",
                        },
                        "& .MuiButton-root": {
                          mt: 0.5,
                          width: "100%",
                          borderRadius: `${customization.borderRadius}px`,
                          textAlign: "left",
                          padding: "12px 16px",
                          justifyContent: "flex-start",
                        },
                      }}
                    >
                      <Button
                        onClick={handleProfileOpen} // ketika klik, buka modal profile
                        startIcon={<IconSettings stroke={1.5} size="1.3rem" />}
                        variant="text"
                        color="inherit"
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                          textAlign: "left",
                          padding: "12px 16px",
                          justifyContent: "flex-start",
                          width: "100%",
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <Typography variant="body2">Profile</Typography>
                      </Button>
                      <Button
                        onClick={handleLogout}
                        startIcon={<IconLogout stroke={1.5} size="1.3rem" />}
                        variant="text"
                        color="inherit"
                        sx={{
                          borderRadius: `${customization.borderRadius}px`,
                          textAlign: "left",
                          padding: "12px 16px",
                          justifyContent: "flex-start",
                          width: "100%",
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                      >
                        <Typography variant="body2">Logout</Typography>
                      </Button>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      {/* Modal untuk Profile */}
      <Dialog
        open={profileOpen}
        onClose={handleProfileClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>View Profile</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Tampilkan foto profil di tengah */}
              <Box sx={{ mb: 2 }}>
                <Avatar
                  src={profileData.imageUrl}
                  sx={{ width: 120, height: 120 }}
                />
              </Box>

              {/* Field untuk Nama */}
              <TextField
                label="Nama"
                fullWidth
                value={profileData.name}
                disabled
                color="error"
              />

              {/* Field untuk Phone */}
              <TextField
                label="Phone"
                fullWidth
                value={profileData.phone}
                disabled
              />

              <TextField
                label="Gender"
                fullWidth
                value={profileData.gender}
                disabled
              />

              {/* Field untuk Address */}
              <TextField
                label="Address"
                fullWidth
                value={profileData.address}
                disabled
                multiline
                rows={4}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileSection;
