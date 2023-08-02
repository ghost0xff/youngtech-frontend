"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

type DrawerButtonProps = {
  toggleDrawer(): void;
};

export default function DrawerButton({ toggleDrawer }: DrawerButtonProps) {
  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => {
          toggleDrawer();
        }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
