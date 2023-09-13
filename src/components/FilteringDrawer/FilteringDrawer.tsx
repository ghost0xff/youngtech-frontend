"use client";

import { Drawer, Typography } from "@mui/material";

const drawerWidth = 240;
export default function FilteringDrawer() {
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: { xs: "none", sm: "block" },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography>content :v</Typography>
      </Drawer>
    </>
  );
}
