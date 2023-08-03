"use client";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LoginIcon from "@mui/icons-material/Login";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness3OutlinedIcon from "@mui/icons-material/Brightness3Outlined";
import { IconButton, Menu, MenuList, Divider } from "@mui/material";
import { ReactNode, useState } from "react";
import AccountAvatar from "../AccountAvatar/AccountAvatar";
import AvatarMenuHeader from "./AvatarMenuHeader";
import AvatarMenuLink, { AvMenuLinkProps } from "./AvatarMenuLink";
import AvatarMenuInteractive, {
  AvMenuInteracProps,
} from "./AvatarMenuInteractive";
import { AccountBoxOutlined } from "@mui/icons-material";
import AvatarPreferenceMenu from "./AvatarPreferenceMenu";

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
          <AvatarMenuLink
            href="/account"
            icon={<AccountBoxOutlinedIcon />}
            label="Your account"
          />
          <AvatarMenuInteractive
            icon={<SwitchAccountOutlinedIcon />}
            label="Switch account"
          />
          <AvatarMenuLink
            href="/signout"
            icon={<LoginIcon />}
            label="Sign out"
          />
          <Divider />
          <AvatarMenuLink
            href="/orders"
            icon={<ShoppingBagOutlinedIcon />}
            label="Orders and purchases"
          />
          <Divider />
          <AvatarMenuInteractive
            icon={<Brightness3OutlinedIcon />}
            label="Appearance: Device theme"
          />
          <AvatarMenuInteractive
            // onClick={}
            icon={<TranslateIcon />}
            label="Language: English"
            menu={
              <AvatarPreferenceMenu
                handleClose={handleClose}
                anchorEl={null}
                open={false}
              ></AvatarPreferenceMenu>
            }
          />
          <Divider />
          <AvatarMenuLink
            href="/settings"
            icon={<SettingsOutlinedIcon />}
            label="Settings"
          />
          <Divider />
          <AvatarMenuInteractive
            icon={<HelpOutlineIcon />}
            label="Help"
            showArrow={false}
          />
          <AvatarMenuInteractive
            icon={<FeedbackOutlinedIcon />}
            label="Send Feedback"
            showArrow={false}
          />
        </MenuList>
      </Menu>
    </>
  );
}
