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
    // <Badge
    //   // color="success"
    //   badgeContent=" "
    //   overlap="circular"
    //   variant="dot"
    //   anchorOrigin={{ vertical: "top", horizontal: "right" }}
    // >
    <Avatar
      alt={name}
      src={img}
      sx={{ width: imgWidth, height: imgHeight, bgcolor: "primary.main" }}
    >
      <Typography fontWeight="600">{initials}</Typography>
    </Avatar>
    // </Badge>
  );
  // return (
  //   <StyledBadge
  //     badgeContent=" "
  //     overlap="circular"
  //     variant="dot"
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "right",
  //     }}
  //   >
  //     <Avatar alt={name} src={img} sx={{ width: imgWidth, height: imgHeight }}>
  //       <Typography fontWeight="600">{initials}</Typography>
  //     </Avatar>
  //   </StyledBadge>
  // );
}
