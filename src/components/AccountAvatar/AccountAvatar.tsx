"use client";
import { getInitials } from "@/lib/utils/stringUtils";
import StyledBadge from "./StyledBadge";
import { Typography, Avatar, Badge } from "@mui/material";

type AccountAvatarProps = {
  status?: badgeStatus;
  img?: string;
  name: string;
  imgWidth: number;
  imgHeight: number;
};

type badgeStatus = "online" | "invisible" | "doNotDisturbe";

export default function AccountAvatar({
  status,
  img,
  name,
  imgWidth,
  imgHeight,
}: AccountAvatarProps) {
  const initials: string = getInitials(name);

  return (
    <Avatar alt={name} src={img}>
      <Typography fontWeight="600">{initials}</Typography>
    </Avatar>
  );

}
