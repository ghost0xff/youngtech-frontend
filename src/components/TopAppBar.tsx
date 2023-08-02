"use client";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import { useState } from "react";
import AvatarMenu from "./AvatarMenu";
import SideDrawer from "./Drawer/SideDrawer";
import DrawerButton from "./Drawer/DrawerButton";
import HorizontalLogo from "./Logo/HorizontalLogo";

export default function TopAppBar() {
  const [openDrawer, setOpenDrawer] = useState(false);

  function toggleDrawer(): void {
    setOpenDrawer((current) => !current);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" enableColorOnDark elevation={0}>
          <Toolbar
            variant="regular"
            sx={{
              alignItems: "center",
            }}
          >
            <DrawerButton toggleDrawer={toggleDrawer} />
            <SideDrawer
              isOpen={openDrawer}
              toggleDrawer={toggleDrawer}
            ></SideDrawer>
            <Box component="div" sx={{ lineHeight: 0, flexGrow: 1 }}>
              <HorizontalLogo mode="light" />
            </Box>
            <AvatarMenu></AvatarMenu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
