"use client";

import Toolbar from "@mui/material/Toolbar";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Skeleton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import OptionsMenu from "../OptionsMenu/OptionsMenu";
import HorizontalLogo from "../Logo/HorizontalLogo";
import ShoppingCartMenu from "../ShoppingCart/ShoppingCartMenu";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { signIn } from "next-auth/react";
import { AuthLoader } from "../Auth/AuthLoader";
import LoginDialog from "../Login/LoginDialog";
import { useState } from "react";
import FilteringDrawer from "../FilteringDrawer/FilteringDrawer";
import SearchBar from "../Search/SearchBar";

const drawerWidth = 240;

export default function TopAppBar() {
  // const [openDialog, setOpenDialog] = useState(false);

  // function handleClick() {
  //   setOpenDialog(true);
  // }

  // function handleClose() {
  //   setOpenDialog(false);
  // }

  return (
    <>
      <AppBar
        component="nav"
        elevation={0}
        position="fixed"
        sx={{
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
          // zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component="div"
            sx={{
              lineHeight: 0,
              // flexGrow: 1
            }}
          >
            <HorizontalLogo />
          </Box>
          <SearchBar />
          <Stack direction="row" spacing={3}>
            <AuthLoader
              loader={
                <>
                  <Skeleton
                    variant="circular"
                    animation={false}
                    height={35}
                    width={35}
                  />
                  <Skeleton
                    variant="circular"
                    animation={false}
                    height={35}
                    width={35}
                  />
                </>
              }
              onUnAuthenticated={
                <>
                  <OptionsMenu />
                  <Button
                    sx={{
                      borderRadius: "40px",
                      textTransform: "none",
                    }}
                    color="secondary"
                    startIcon={<AccountCircleOutlinedIcon />}
                    variant="outlined"
                    onClick={() => signIn()}
                  >
                    Acceder
                  </Button>
                </>
              }
            >
              <ShoppingCartMenu />
              <OptionsMenu />
            </AuthLoader>
          </Stack>{" "}
        </Toolbar>

        <Toolbar
          sx={{
            display: { xs: "flex", sm: "none" },
          }}
        >
          {" "}
          <Box component="div" sx={{ lineHeight: 0, flexGrow: 1 }}>
            <HorizontalLogo />
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>

      <FilteringDrawer />
    </>
  );
}