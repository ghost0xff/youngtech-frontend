"use client";

import {
  Box,
  Divider,
  ListItem,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { List } from "@mui/material";
import HorizontalLogo from "../Logo/HorizontalLogo";

type SideDrawerProps = {
  isOpen: boolean;
  toggleDrawer(): void;
};

const drawerWidth = 240;
export default function SideDrawer({ isOpen, toggleDrawer }: SideDrawerProps) {
  const theme: Theme = useTheme();
  const isKindaBig = useMediaQuery(theme.breakpoints.up("md"));
  // const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <List>
      <ListItem sx={{ pl: 5 }}>
        <HorizontalLogo />
      </ListItem>
      <Divider />
    </List>
  );

  return (
    <>
      <Box
        component="nav"
        aria-label="side navbar drawer"
        sx={{
          width: {
            xs: drawerWidth,
          },
          flexShrink: {
            md: 0,
          },
        }}
      >
        {/* {isKindaBig ? (
          <Drawer
            elevation={0}
            // variant="permanent"
            variant="persistent"
            // transitionDuration={0}
            transitionDuration={59}
            open={isOpen}
            sx={{
              width: drawerWidth + 100,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth + 100,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <Typography>lul</Typography>
            </Box>
          </Drawer>
        ) : ( */}
        <SwipeableDrawer
          transitionDuration={180}
          // transitionDuration={0}
          anchor="left"
          open={isOpen}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          variant="temporary"
          elevation={0}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
            },
          }}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            square: false,
            variant: "outlined",
          }}
        >
          {drawerContent}
        </SwipeableDrawer>
        {/* )} */}
      </Box>
    </>
  );
}
