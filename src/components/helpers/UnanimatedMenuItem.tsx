"use client";

import { MenuItem } from "@mui/material";
import { ReactNode } from "react";

type NoAnimationsMenuItemProps = {
  children: ReactNode;
  // icon: ReactNode;
  // title: string;
};
export default function UnanimatedMenuItem({
  children,
}: NoAnimationsMenuItemProps) {
  return (
    <MenuItem
      disableRipple
      sx={{
        py: "0",
        ":hover": {
          bgcolor: "inherit",
        },
      }}
    >
      {children}
    </MenuItem>
  );
}
