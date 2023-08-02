"use client";

import NextLink from "next/link";
import {
  MenuItem,
  ListItemIcon,
  Typography,
  ListItemText,
  Link,
} from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import LinkBehaviour from "../ThemeRegistry/LinkBehaviour";

export interface AvMenuOptProps {
  label: string;
  icon: React.ReactNode;
  href?: string | undefined;
}

export default function AvatarMenuOption({
  label,
  icon,
  href,
}: AvMenuOptProps) {
  if (href) {
    return (
      <Link href={href} underline="none" color="inherit" sx={{ p: 0 }}>
        <MenuItem>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>
            <Typography variant="body1">{label}</Typography>
          </ListItemText>
        </MenuItem>
      </Link>
    );
  }
  return (
    <MenuItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>
        <Typography variant="subtitle1">{label}</Typography>
      </ListItemText>
      <Typography variant="body2" fontSize={1} marginLeft={3}>
        <NavigateNextOutlinedIcon />
      </Typography>
    </MenuItem>
  );
}
