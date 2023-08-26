import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import AvatarPreferenceMenu from "./AvatarPreferenceMenu";
import { AvatarMenuOption } from "./AvatarMenu";

export default function AvatarPreferenceLanguageMenu() {
  // TODO: actually ADD i18n
  const selectedLanguage: string = "ES";
  return (
    <AvatarPreferenceMenu title="Selecciona tu idioma">
      <MenuItem>
        <ListItemIcon>
          {selectedLanguage === "ES" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Español</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          {selectedLanguage === "EN" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">English</Typography>
      </MenuItem>
    </AvatarPreferenceMenu>
  );
}
