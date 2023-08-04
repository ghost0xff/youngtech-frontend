"use client";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
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
  IconButton,
  Menu,
  MenuList,
  Divider,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import { ReactNode, useState } from "react";
import AccountAvatar from "../AccountAvatar/AccountAvatar";
import AvatarMenuHeader from "./AvatarMenuHeader";
import AvatarMenuLink, { AvMenuLinkProps } from "./AvatarMenuLink";
import AvatarMenuInteractive from "./AvatarMenuInteractive";
import AvatarPreferenceMenu from "./AvatarPreferenceMenu";

type AvatarMenu = "main" | "theme" | "language";

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menu, setMenu] = useState<AvatarMenu>("main");

  // const [interacAnchorEl, setInteracAnchorEl] = useState<null | HTMLElement>(
  //   null
  // );
  const open = Boolean(anchorEl);
  // const interacOpen = Boolean(interacAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleInteracClick = () => {
  //   setInteracAnchorEl(anchorEl);
  // };
  const handleClose = () => {
    setMenu("main");
    setAnchorEl(null);
  };

  // const handleInteracClose = () => {
  //   setInteracAnchorEl(null);
  // };

  function changeMenu(menu: AvatarMenu): void {
    // console.log(`menu set to ${menu}`);
    setMenu(menu);
  }

  const mainMenu = (
    <MenuList>
      {/* Header with account info*/}
      <AvatarMenuHeader
        name="Samuel Astua Flores"
        email="samuelastuaflores@gmail.com"
      />
      <Divider />

      {/* Account and auth options */}
      <AvatarMenuLink
        href="/account"
        icon={<AccountBoxOutlinedIcon />}
        label="Your account"
      />
      <AvatarMenuInteractive
        icon={<SwitchAccountOutlinedIcon />}
        label="Switch account"
        showArrow
      />
      <AvatarMenuLink href="/signout" icon={<LoginIcon />} label="Sign out" />

      {/* money my friend, money $$$$ */}
      <Divider />
      <AvatarMenuLink
        href="/orders"
        icon={<ShoppingBagOutlinedIcon />}
        label="Orders and purchases"
      />
      <Divider />

      {/* Preferences */}
      <AvatarMenuInteractive
        icon={<Brightness3OutlinedIcon />}
        label="Appearance: Device theme"
        onClick={() => changeMenu("theme")}
        showArrow
      />
      <AvatarMenuInteractive
        icon={<TranslateIcon />}
        label="Language: English"
        onClick={() => changeMenu("language")}
        showArrow
      />
      <Divider />

      {/* Settings */}
      <AvatarMenuLink
        href="/settings"
        icon={<SettingsOutlinedIcon />}
        label="Settings"
      />
      <Divider />

      {/* Customer Service */}
      <AvatarMenuInteractive
        icon={<HelpOutlineIcon />}
        label="Help"
        showArrow
      />
      <AvatarMenuInteractive
        icon={<FeedbackOutlinedIcon />}
        label="Send Feedback"
        showArrow
      />
    </MenuList>
  );

  const selectedTheme: string = "light";
  const ThemeMenu = (
    <AvatarPreferenceMenu title="Appearance" onClick={() => changeMenu("main")}>
      <MenuItem>
        <ListItemIcon>
          {selectedTheme === "device" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Use device theme</Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          {selectedTheme === "dark" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Dark theme</Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          {selectedTheme === "light" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Light theme</Typography>
      </MenuItem>
    </AvatarPreferenceMenu>
  );

  const selectedLanguage: string = "EN";
  const LanguageMenu = (
    <AvatarPreferenceMenu title="Language" onClick={() => changeMenu("main")}>
      <MenuItem>
        <ListItemIcon>
          {selectedLanguage === "EN" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">English</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          {selectedLanguage === "ES" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Spanish</Typography>
      </MenuItem>
    </AvatarPreferenceMenu>
  );

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
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        {/* TODO: check how does the 'dense' prop on MenuList
        once whole menu is complete
         */}
        {menu === "main" && mainMenu}
        {menu === "theme" && ThemeMenu}
        {menu === "language" && LanguageMenu}
      </Menu>
    </>
  );
}
