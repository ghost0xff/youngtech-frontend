"use client";

import { getInitials } from "@/lib/stringUtils";
import {
  MenuItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Tooltip,
} from "@mui/material";
import AccountAvatar from "../AccountAvatar/AccountAvatar";
import UnanimatedMenuItem from "../utils/UnanimatedMenuItem";
import { useEffect, useMemo, useState } from "react";

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

  const initials = getInitials(name);

  async function handleClick(option: CopyOption) {
    const toBeCopied = option === "email" ? email : name;
    await navigator.clipboard.writeText(toBeCopied);
    // console.log(`copies this to your clipboard: ${toBeCopied}`);
    setTooltipText("Copied to clipboard!");
    // setCopied(true);
  }

  function handleMouseOver(option: CopyOption) {
    const text: string = `Click to copy ${option}`;
    setTooltipText(text);
    // console.log(`Click to copy ${option}`);
  }

  return (
    <UnanimatedMenuItem>
      <ListItemAvatar>
        <AccountAvatar name={name} imgHeight={40} imgWidth={40} />
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
