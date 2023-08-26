"use client";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import AvatarPreferenceMenu from "./AvatarPreferenceMenu";
import { useState } from "react";

export default function AvatarPreferenceLocationMenu() {
  const [location, setLocation] = useState<"CR" | "USA" | "NI" | "PA">("CR");
  return (
    <AvatarPreferenceMenu title="Selecciona tu ubicación">
      <MenuItem>
        <ListItemIcon>
          {location === "CR" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Costa Rica</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          {location === "NI" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Nicaragua</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          {location === "PA" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Panamá</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          {location === "USA" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Estados Unidos</Typography>
      </MenuItem>
    </AvatarPreferenceMenu>
  );
}
