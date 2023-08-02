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
import Brightness3OutlinedIcon from "@mui/icons-material/Brightness3Outlined";
import {
  Avatar,
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
  paperClasses,
} from "@mui/material";
import { ReactNode, useState } from "react";
import StyledBadge from "../AccountAvatar/StyledBadge";
import AccountAvatar from "../AccountAvatar/AccountAvatar";
import AvatarMenuOption, { AvMenuOptProps } from "./AvatarMenuOption";
import AvatarMenuHeader from "./AvatarMenuHeader";

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function getElems(options: AvMenuOptProps[]): ReactNode[] {
    let elements: ReactNode[] = [];
    for (let index = 0; index < options.length; index++) {
      const option = options[index];
      elements.push(
        <AvatarMenuOption
          key={option.label}
          label={option.label}
          icon={option.icon}
          href={option.href}
        />
      );
    }
    return elements;
  }

  const accountOptions: AvMenuOptProps[] = [
    { label: "Profile", icon: <AccountBoxOutlinedIcon />, href: "/" },
    { label: "Switch Profile", icon: <SwitchAccountOutlinedIcon /> },
    { label: "Sign out", icon: <LoginIcon />, href: "/" },
  ];
  const shoppingOptions: AvMenuOptProps[] = [
    {
      label: "Orders and Purchases",
      icon: <ShoppingBagOutlinedIcon />,
      href: "/ordersAndpurchases",
    },
  ];
  const preferences: AvMenuOptProps[] = [
    {
      label: "Appearance: Dark theme",
      icon: <Brightness3OutlinedIcon />,
    },
    {
      label: "Language: English",
      icon: <TranslateIcon />,
    },
  ];
  const confOptions: AvMenuOptProps[] = [
    { label: "Settings", icon: <SettingsOutlinedIcon />, href: "/" },
  ];
  const customerSupportOptions: AvMenuOptProps[] = [
    { label: "Help", icon: <HelpOutlineIcon />, href: "/" },
    { label: "Send Feedback", icon: <FeedbackOutlinedIcon />, href: "/" },
  ];

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
        <AccountAvatar
          name="Samuel Astua Flores"
          imgWidth={33}
          imgHeight={33}
        />
      </IconButton>
      <Menu
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
            },
          },
        }}
        // sx={{ borderRadius: "50%" }}
        transitionDuration={0}
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
          <AvatarMenuHeader
            name="Samuel Astua Flores"
            email="samuelastuaflores@gmail.com"
          />
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
