"use client";

import Toolbar from "@mui/material/Toolbar";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import SideDrawer from "../Drawer/SideDrawer";
import DrawerButton from "../Drawer/DrawerButton";
import HorizontalLogo from "../Logo/HorizontalLogo";
import ShoppingCartMenu from "../ShoppingCart/ShoppingCartMenu";
import MenuIcon from "@mui/icons-material/Menu";

export default function TopAppBar() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  function toggleDrawer(): void {
    setOpenDrawer((current) => !current);
  }

  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <Box sx={{ display: "fixed" }}>
        {" "}
        <AppBar
          // enableColorOnDark
          elevation={0}
          position="fixed"
          sx={{
            // :v
            alignItems: "center",
            zIndex: (theme: Theme) =>
              isSmall ? theme.zIndex.drawer : theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <DrawerButton onClick={toggleDrawer} />
            <Box component="div" sx={{ lineHeight: 0, flexGrow: 1 }}>
              <HorizontalLogo />
            </Box>
            <ShoppingCartMenu />
            <AvatarMenu />
          </Toolbar>
          <Divider />
        </AppBar>
        <SideDrawer isOpen={openDrawer} toggleDrawer={toggleDrawer} />
      </Box>
    </>
  );
}
