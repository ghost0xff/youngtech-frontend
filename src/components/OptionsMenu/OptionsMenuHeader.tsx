"use client";

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
import { AuthLoader } from "../Auth/AuthLoader";
import CoolTooltip from "../CoolTooltip/CoolTooltip";

type OptionsMenuHeaderProps = {
  img?: string;
  name: string;
  email: string;
};

type CopyOption = "email" | "name";

export default function OptionsMenuHeader({
  img,
  name,
  email,
}: OptionsMenuHeaderProps) {
  const [tooltipText, setTooltipText] = useState("Haz click para copiarme");
  async function handleClick(option: CopyOption) {
    const toBeCopied = option === "email" ? email : name;
    await navigator.clipboard.writeText(toBeCopied);
    setTooltipText("Copiado al portapapeles!");
  }

  function handleMouseOver(option: CopyOption) {
    const word = option === "email" ? "correo" : "nombre";
    const text: string = `Click para copiar ${word}`;
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
