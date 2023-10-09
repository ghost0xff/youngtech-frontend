"use client";

import { Box, Typography } from "@mui/material";

export default function AppFooter() {
  return (
    <Box
      bottom="0px"
      sx={{
        marginTop: 20,
        width: "100%",
        backgroundColor: "primary.main",
        // color: "text.primary",
        bottom: 0,
        // width: "100%",
        height: 60,
        textAlign: "center",
      }}
      position="absolute"
    >
      <Typography color="background.default">content</Typography>
    </Box>
  );
}
