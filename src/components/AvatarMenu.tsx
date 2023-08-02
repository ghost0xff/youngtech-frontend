"use client";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LoginIcon from "@mui/icons-material/Login";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";
import Brightness3OutlinedIcon from "@mui/icons-material/Brightness3Outlined";
import {
  Badge,
  Avatar,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  MenuList,
  Paper,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";

type AvatarMenuOption = {
  label: string;
  icon: React.ReactNode;
  // TODO: change type of link for a custom Link Component
  link?: string;
  interactive?: boolean;
};

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const accountOptions: AvatarMenuOption[] = [
    { label: "Profile", icon: <AccountBoxOutlinedIcon /> },
    { label: "Switch Profile", icon: <SwitchAccountOutlinedIcon /> },
    { label: "Sign out", icon: <LoginIcon /> },
  ];
  const shoppingOptions: AvatarMenuOption[] = [
    { label: "Orders and Purchases", icon: <ShoppingBagOutlinedIcon /> },
  ];
  const preferences: AvatarMenuOption[] = [
    {
      label: "Appearance: Dark theme",
      icon: <Brightness3OutlinedIcon />,
      interactive: true,
    },
    { label: "Language: English", icon: <TranslateIcon />, interactive: true },
  ];
  const confOptions: AvatarMenuOption[] = [
    { label: "Settings", icon: <SettingsOutlinedIcon /> },
  ];
  const customerSupportOptions: AvatarMenuOption[] = [
    { label: "Help", icon: <HelpOutlineIcon /> },
    { label: "Send Feedback", icon: <FeedbackOutlinedIcon /> },
  ];

  function getElems(options: AvatarMenuOption[]): ReactNode[] {
    let elements: ReactNode[] = [];
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      elements.push(
        <MenuItem key={option.label}>
          <ListItemIcon>{option.icon}</ListItemIcon>
          <ListItemText primary={option.label} />
          {option.interactive && (
            <Typography variant="body1" fontSize={1} marginLeft={5}>
              <ArrowForwardIosOutlinedIcon />
            </Typography>
          )}
        </MenuItem>
      );
    }
    return elements;
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ ml: 2 }}
        aria-controls={open ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <StyledBadge
          badgeContent=" "
          overlap="circular"
          variant="dot"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Avatar alt="avatar">SA</Avatar>
        </StyledBadge>
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {/* TODO: check how does the 'dense' prop on MenuList
        once whole menu is complete
         */}
        <MenuList>
          <MenuItem>
            <ListItemAvatar>
              <Avatar alt="Samuel">SA</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 700 }}>
                  Samuel Astua Flores
                </Typography>
              }
              secondary="samuelastuaflores@gmail.com"
            />
          </MenuItem>
          <Divider />
          {getElems(accountOptions)}
          <Divider />
          {getElems(shoppingOptions)}
          <Divider />
          {getElems(preferences)}
          <Divider />
          {getElems(confOptions)}
          <Divider />
          {getElems(customerSupportOptions)}
        </MenuList>
      </Menu>
    </>
  );
}

const StyledBadge = styled(Badge)(({ theme }: any) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
