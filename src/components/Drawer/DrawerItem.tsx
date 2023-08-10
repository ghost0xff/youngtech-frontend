"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactNode } from "react";
import UnstyledLink from "../utils/UnstyledLink";

type DrawerItemProps = {
  open: boolean;
  icon: ReactNode;
  label: string;
  href: string;
  key: string | number;
};
export default function DrawerItem({
  open,
  icon,
  label,
  href,
  key,
}: DrawerItemProps) {
  return (
    <UnstyledLink href={href} key={key}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            // px: 4,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </UnstyledLink>
  );
}
