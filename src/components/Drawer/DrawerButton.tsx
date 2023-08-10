"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Theme, useMediaQuery, useTheme } from "@mui/material";

type DrawerButtonProps = {
  onClick(): void;
};

export default function DrawerButton({ onClick }: DrawerButtonProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <IconButton
        edge="start"
        color="default"
        onClick={onClick}
        // sx={(theme: Theme => {
        //   [theme.breakpoints.down("sm")]: {
        //     p: 2,
        //   },
        // })
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}
