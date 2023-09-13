"use client";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Fragment, useContext, useState } from "react";
import { ThemePreferenceContext } from "../ThemeRegistry/ThemeRegistry";
import OptionsPreferenceMenu from "./OptionsPreferenceMenu";
import {
  Typography,
  MenuItem,
  ListItemIcon,
  ListSubheader,
  MenuList,
} from "@mui/material";
import { ThemeUtils as TU } from "../utils";

export default function OptionsPreferenceThemeMenu() {
  // const themeChanger = useContext(ThemePreferenceContext);
  const [selectedTheme, setSelectedTheme] = useState<TU.ThemePreference>(
    "light" // <--- hard coded until implementeded
  );

  // const handleClick = (pref: TU.ThemePreference) => {
  //   themeChanger.toggleTheme(pref);
  //   setSelectedTheme(pref);
  // };

  return (
    <OptionsPreferenceMenu title="Apariencia">
      <MenuList
        disablePadding
        // subheader={
        //   <ListSubheader>
        //     La configuración solo se aplica a este navegador
        //   </ListSubheader>
        // <ListSubheader>Setting appliesy to this browser only</ListSubheader>
        // }
      >
        <MenuItem
          onClick={() => {
            // handleClick("device");
          }}
          disabled
        >
          <ListItemIcon>
            {selectedTheme === "device" && <CheckOutlinedIcon />}
          </ListItemIcon>
          <Typography variant="body1">Usar tema del dispositivo</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            // handleClick("dark");
          }}
          disabled
        >
          <ListItemIcon>
            {selectedTheme === "dark" && <CheckOutlinedIcon />}
          </ListItemIcon>
          <Typography variant="body1">Tema oscuro</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            // handleClick("light");
          }}
        >
          <ListItemIcon>
            {selectedTheme === "light" && <CheckOutlinedIcon />}
          </ListItemIcon>
          <Typography variant="body1">Tema claro</Typography>
        </MenuItem>
      </MenuList>
    </OptionsPreferenceMenu>
  );
}
