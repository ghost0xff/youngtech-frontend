"use client";

import NextLink from "next/link";
import {
  MenuItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Link,
} from "@mui/material";

export interface AvMenuLinkProps {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

export default function AvatarMenuLink({ label, icon, href }: AvMenuLinkProps) {
  return (
    <Link href={href} underline="none" color="inherit" sx={{ p: 0 }}>
      <MenuItem>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText>
          <Typography variant="body1">{label}</Typography>
        </ListItemText>
      </MenuItem>
    </Link>
  );
}
