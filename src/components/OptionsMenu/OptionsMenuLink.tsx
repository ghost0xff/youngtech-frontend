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
import { OptionsMenuDestroyerContext } from "./OptionsMenu";
import UnstyledLink from "../helpers/UnstyledLink";
import { MenuUtils as MU } from "../utils";

export interface OptMenuLinkProps {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

export default function OptionsMenuLink({
  label,
  icon,
  href,
}: OptMenuLinkProps) {
  const menuDestroyer: MU.MenuDestroyer = useContext(
    OptionsMenuDestroyerContext
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
