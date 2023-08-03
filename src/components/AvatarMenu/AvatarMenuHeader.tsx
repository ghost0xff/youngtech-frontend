"use client";

import { getInitials } from "@/lib/utils";
import {
  MenuItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountAvatar from "../AccountAvatar/AccountAvatar";

type AvatarMenuHeaderProps = {
  img?: string;
  name: string;
  email: string;
};

export default function AvatarMenuHeader({
  img,
  name,
  email,
}: AvatarMenuHeaderProps) {
  const initials = getInitials(name);
  return (
    <MenuItem>
      <ListItemAvatar>
        <AccountAvatar name={name} imgHeight={40} imgWidth={40} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography sx={{ fontWeight: 700 }}>{name}</Typography>}
        secondary={email}
      />
    </MenuItem>
  );
}
