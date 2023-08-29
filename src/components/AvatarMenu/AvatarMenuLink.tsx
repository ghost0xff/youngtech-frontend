"use client";

import NextLink from "next/link";
import {
  MenuItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Link,
} from "@mui/material";
import { useContext } from "react";
import { AvatarMenuDestroyerContext } from "./AvatarMenu";
import UnstyledLink from "../helpers/UnstyledLink";
import { MenuUtils as MU } from "../utils";

export interface AvMenuLinkProps {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

export default function AvatarMenuLink({ label, icon, href }: AvMenuLinkProps) {
  const menuDestroyer: MU.MenuDestroyer = useContext(
    AvatarMenuDestroyerContext
  );
  return (
    <UnstyledLink href={href} onClick={menuDestroyer.destroy}>
      <MenuItem>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText>
          <Typography variant="body1">{label}</Typography>
        </ListItemText>
      </MenuItem>
    </UnstyledLink>
  );
}
