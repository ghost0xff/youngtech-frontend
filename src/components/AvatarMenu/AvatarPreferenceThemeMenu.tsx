"use client";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Fragment, useContext, useState } from "react";
import { ThemePreferenceContext } from "../ThemeRegistry/ThemeRegistry";
import AvatarPreferenceMenu from "./AvatarPreferenceMenu";
import {
  Typography,
  MenuItem,
  ListItemIcon,
  ListSubheader,
  MenuList,
} from "@mui/material";
import { ThemePreference, getThemeFromStorage } from "@/lib/themeUtils";

export default function AvatarPreferenceThemeMenu() {
  const themeChanger = useContext(ThemePreferenceContext);
  const [selectedTheme, setSelectedTheme] = useState<ThemePreference>(
    getThemeFromStorage()
  );

  const handleClick = (pref: ThemePreference) => {
    themeChanger.toggleTheme(pref);
    setSelectedTheme(pref);
  };

  return (
    <AvatarPreferenceMenu title="Appearance">
      <MenuList
        disablePadding
        subheader={
          <ListSubheader>Setting applies to this browser only</ListSubheader>
        }
      >
        <MenuItem onClick={() => handleClick("device")} disabled>
          <ListItemIcon>
            {selectedTheme === "device" && <CheckOutlinedIcon />}
          </ListItemIcon>
          <Typography variant="body1">Use device theme</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClick("dark")} disabled>
          <ListItemIcon>
            {selectedTheme === "dark" && <CheckOutlinedIcon />}
          </ListItemIcon>
          <Typography variant="body1">Dark theme</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClick("light")}>
          <ListItemIcon>
            {selectedTheme === "light" && <CheckOutlinedIcon />}
          </ListItemIcon>
          <Typography variant="body1">Light theme</Typography>
        </MenuItem>
      </MenuList>
    </AvatarPreferenceMenu>
  );
}
