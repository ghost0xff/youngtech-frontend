"use client";

import { Menu, MenuList, Divider } from "@mui/material";
import AvatarMenuLink from "./AvatarMenuLink";

type AvPrefProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  children?: any;
  handleClose(): void;
};

export default function AvatarPreferenceMenu({
  children,
  anchorEl,
  open,
  handleClose,
}: AvPrefProps) {
  return (
    <Menu
      transitionDuration={0}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      elevation={0}
      transformOrigin={{ horizontal: "left", vertical: "top" }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <MenuList>
        <Divider />
        <AvatarMenuLink href="/" label="English" />
        <AvatarMenuLink href="/" label="Spanish" />
        <AvatarMenuLink href="/" label="Dutch" />
        {children}
      </MenuList>
    </Menu>
  );
}
