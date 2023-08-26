"use client";

import Toolbar from "@mui/material/Toolbar";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useSession, signIn } from "next-auth/react";

export default function TopAppBar() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: session, status } = useSession();

  function toggleDrawer(): void {
    setOpenDrawer((current) => !current);
  }

  return (
    <>
      {/* <Box sx={{ flexGrow: 1, display: "fixed" }}> */}
      <Box sx={{ display: "fixed" }}>
        {" "}
        <AppBar
          // enableColorOnDark
          // component="nav"
          elevation={0}
          position="static"
          sx={{
            // :v
            // alignItems: "",
            zIndex: (theme: Theme) =>
              isSmall ? theme.zIndex.drawer : theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            {" "}
            <DrawerButton onClick={toggleDrawer} />
            <Box component="div" sx={{ lineHeight: 0, flexGrow: 1 }}>
              <HorizontalLogo />
            </Box>
            <Stack direction="row" spacing={2}>
              <ShoppingCartMenu />
              {session ? (
                <AvatarMenu />
              ) : (
                <Box>
                  <Button
                    sx={{
                      borderRadius: "40px",
                    }}
                    color="secondary"
                    startIcon={<AccountCircleOutlinedIcon />}
                    variant="outlined"
                    onClick={() => signIn()}
                  >
                    Sign in
                  </Button>
                </Box>
              )}
            </Stack>{" "}
          </Toolbar>

          <Divider />
        </AppBar>
        {/* <SideDrawer isOpen={openDrawer} toggleDrawer={toggleDrawer} /> */}
      </Box>
    </>
  );
}
