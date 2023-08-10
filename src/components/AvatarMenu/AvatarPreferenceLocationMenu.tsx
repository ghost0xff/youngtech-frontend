"use client";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import AvatarPreferenceMenu from "./AvatarPreferenceMenu";
import { useState } from "react";

export default function AvatarPreferenceLocationMenu() {
  const [location, setLocation] = useState<"CR" | "USA">("CR");
  return (
    <AvatarPreferenceMenu title="Choose your location">
      <MenuItem>
        <ListItemIcon>
          {location === "CR" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Costa Rica</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          {location === "USA" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">United Stated</Typography>
      </MenuItem>
    </AvatarPreferenceMenu>
  );
}
