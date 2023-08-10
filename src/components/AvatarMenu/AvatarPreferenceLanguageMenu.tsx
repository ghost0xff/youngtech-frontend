import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import AvatarPreferenceMenu from "./AvatarPreferenceMenu";
import { AvatarMenuOption } from "./AvatarMenu";

export default function AvatarPreferenceLanguageMenu() {
  // TODO: actuallu ADD i18n
  const selectedLanguage: string = "EN";
  return (
    <AvatarPreferenceMenu title="Choose your location">
      <MenuItem>
        <ListItemIcon>
          {selectedLanguage === "EN" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">English</Typography>
      </MenuItem>
      <MenuItem disabled>
        <ListItemIcon>
          {selectedLanguage === "ES" && <CheckOutlinedIcon />}
        </ListItemIcon>
        <Typography variant="body1">Spanish</Typography>
      </MenuItem>
    </AvatarPreferenceMenu>
  );
}
