"use client";

import {
  MenuItem,
  IconButton,
  ListItemText,
  Typography,
  MenuList,
  Divider,
} from "@mui/material";
import AvatarMenuLink from "./AvatarMenuLink";
import { ReactNode } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

type AvPrefProps = {
  children?: ReactNode;
  title: string;
  onClick(): void;
};
export default function AvatarPreferenceMenu({
  children,
  title,
  onClick,
}: AvPrefProps) {
  return (
    <MenuList>
      <MenuItem
        disableRipple
        sx={{
          py: "0",
          ":hover": {
            bgcolor: "inherit",
          },
        }}
      >
        <IconButton onClick={onClick}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <ListItemText>
          <Typography variant="subtitle1" pl={0.5}>
            {title}
          </Typography>
        </ListItemText>
      </MenuItem>
      <Divider />
      {children}
    </MenuList>
  );
}
