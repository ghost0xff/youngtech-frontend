"use client";

import { getInitials } from "@/lib/utils/stringUtils";
import {
  MenuItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";
import AccountAvatar from "../AccountAvatar/AccountAvatar";
import UnanimatedMenuItem from "../helpers/UnanimatedMenuItem";
import { useState } from "react";

type AvatarMenuHeaderProps = {
  img?: string;
  name: string;
  email: string;
};

type CopyOption = "email" | "name";

export default function AvatarMenuHeader({
  img,
  name,
  email,
}: AvatarMenuHeaderProps) {
  // const [copied, setCopied] = useState(false);
  const [tooltipText, setTooltipText] = useState("Click to copy me!");

  async function handleClick(option: CopyOption) {
    const toBeCopied = option === "email" ? email : name;
    await navigator.clipboard.writeText(toBeCopied);
    setTooltipText("Copied to clipboard!");
  }

  function handleMouseOver(option: CopyOption) {
    const text: string = `Click to copy ${option}`;
    setTooltipText(text);
  }

  return (
    <UnanimatedMenuItem>
      <ListItemAvatar>
        <AccountAvatar name={name} img={img} imgHeight={40} imgWidth={40} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Tooltip
            onMouseOver={() => handleMouseOver("name")}
            placement="top"
            onClick={() => handleClick("name")}
            followCursor
            title={tooltipText}
          >
            <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
          </Tooltip>
        }
        secondary={
          <Tooltip
            onMouseOver={() => handleMouseOver("email")}
            onClick={() => handleClick("email")}
            followCursor
            title={tooltipText}
          >
            <span>{email}</span>
          </Tooltip>
        }
      />
    </UnanimatedMenuItem>
  );
}
