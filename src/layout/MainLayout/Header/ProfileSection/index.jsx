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
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import Transitions from "../../../../ui-component/extended/Transitions";

// assets
import { IconLogout, IconSettings, IconKey } from "@tabler/icons-react";

// service function for updating profile data
export const updateProfile = async (serviceData, callback) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "https://api.agang-toyota.my.id/api/customer/profile",
      {
        name: serviceData.name,
        username: serviceData.username,
        phone: serviceData.phone,
        gender: serviceData.gender,
        address: serviceData.address,
        email: serviceData.email, // include email here
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    callback(response.data.data);
  } catch (error) {
    console.error("Error updating profile data:", error);
  }
};

// service function for changing password
export const changePassword = async (serviceData, callback) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "https://api.agang-toyota.my.id/api/customer/change-password",
      {
        old_password: serviceData.old_password,
        password: serviceData.password,
        password_confirmation: serviceData.password_confirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    callback(response.data.data);
  } catch (error) {
    console.error("Error changing password:", error);
  }
};

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    phone: "",
    gender: "",
    address: "",
    email: "", // Add email field
    imageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false); // state for edit mode
  const [editData, setEditData] = useState(profileData); // state for storing edit form data
  const [changePasswordOpen, setChangePasswordOpen] = useState(false); // state for change password dialog
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const anchorRef = useRef(null);

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

      if (response.data && response.data.code === 200) {
        const { username, name, phone, gender, address, email, imageUrl } =
          response.data.data; // Include email here
        setProfileData({
          username,
          name,
          phone,
          gender,
          address,
          email, // Include email here
          imageUrl,
        });
        setEditData({
          username,
          name,
          phone,
          gender,
          address,
          email, // Include email here
          imageUrl,
        }); // initialize edit data
      } else {
        console.error("Failed to fetch profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

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
    setProfileOpen(true);
  };

  const handleProfileClose = () => {
    setProfileOpen(false);
    setIsEditing(false); // reset edit mode on close
  };

  const handleChangePasswordOpen = () => {
    setChangePasswordOpen(true);
  };

  const handleChangePasswordClose = () => {
    setChangePasswordOpen(false);
    setPasswordData({
      old_password: "",
      password: "",
      password_confirmation: "",
    }); // reset password fields
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await updateProfile(editData, (updatedData) => {
      setProfileData(updatedData); // update profile data with the new data
      setIsEditing(false); // exit edit mode
      setProfileOpen(false);
    });
  };

  const handleChangePasswordSave = async () => {
    await changePassword(passwordData, (updatedData) => {
      console.log("Password changed successfully", updatedData);
      setChangePasswordOpen(false);
      setPasswordData({
        old_password: "",
        password: "",
        password_confirmation: "",
      }); // reset password fields
    });
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
                  shadow={theme.shadows[1]}
                  sx={{
                    zIndex: 1200,
                    width: 250,
                  }}
                >
                  <PerfectScrollbar style={{ maxHeight: "300px" }}>
                    <Box sx={{ p: 1, pt: 0 }}>
                      <List component="nav">
                        <Button
                          onClick={handleProfileOpen}
                          startIcon={
                            <IconSettings stroke={1.5} size="1.3rem" />
                          }
                          variant="text"
                          color="inherit"
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                            textAlign: "left",
                            padding: "12px 16px",
                            justifyContent: "flex-start",
                            width: "100%",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.light,
                            },
                          }}
                        >
                          Profile
                        </Button>
                        <Button
                          onClick={handleChangePasswordOpen}
                          startIcon={<IconKey stroke={1.5} size="1.3rem" />}
                          variant="text"
                          color="inherit"
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                            textAlign: "left",
                            padding: "12px 16px",
                            justifyContent: "flex-start",
                            width: "100%",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.light,
                            },
                          }}
                        >
                          Change Password
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
                              backgroundColor: theme.palette.primary.light,
                            },
                          }}
                        >
                          Logout
                        </Button>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      {/* Profile Dialog */}
      <Dialog
        open={profileOpen}
        onClose={handleProfileClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Profile Settings</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={editData.name}
                onChange={handleChange}
                disabled={!isEditing} // Disable input if not in edit mode
              />
              <TextField
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
                value={editData.username}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                value={editData.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                margin="dense"
                name="gender"
                label="Gender"
                type="text"
                fullWidth
                value={editData.gender}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                value={editData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={editData.email}
                onChange={handleChange}
                disabled={!isEditing} // Disable email input if not in edit mode
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
              <Button onClick={handleEditToggle} color="secondary">
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handleEditToggle} color="primary">
              Edit
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordOpen}
        onClose={handleChangePasswordClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="old_password">Old Password</InputLabel>
            <OutlinedInput
              id="old_password"
              name="old_password"
              type={showOldPassword ? "text" : "password"}
              value={passwordData.old_password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggleOldPasswordVisibility} edge="end">
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="password">New Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showNewPassword ? "text" : "password"}
              value={passwordData.password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggleNewPasswordVisibility} edge="end">
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>

          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel htmlFor="password_confirmation">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="password_confirmation"
              name="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={passwordData.password_confirmation}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChangePasswordSave} color="primary">
            Change Password
          </Button>
          <Button onClick={handleChangePasswordClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileSection;
