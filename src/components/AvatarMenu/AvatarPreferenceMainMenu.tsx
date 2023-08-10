"use client";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import SwitchAccountOutlinedIcon from "@mui/icons-material/SwitchAccountOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LoginIcon from "@mui/icons-material/Login";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import Brightness3OutlinedIcon from "@mui/icons-material/Brightness3Outlined";
import AvatarMenuHeader from "./AvatarMenuHeader";
import AvatarMenuLink from "./AvatarMenuLink";
import AvatarMenuInteractive from "./AvatarMenuInteractive";
import { MenuList, Divider } from "@mui/material";
import { AvatarMenuOption } from "./AvatarMenu";
import { ThemePreference, getThemeFromStorage } from "@/lib/themeUtils";
import { useState } from "react";
import { withFirstUpperCase } from "@/lib/stringUtils";

type AvPrefMainMenuProps = {
  onChangeMenu(option: AvatarMenuOption): void;
};

export default function AvatarPreferenceMainMenu({
  onChangeMenu,
}: AvPrefMainMenuProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemePreference>(
    getThemeFromStorage()
  );

  return (
    <MenuList>
      {/* Header with account info*/}
      <AvatarMenuHeader
        name="Samuel Astua Flores"
        email="samuelastuaflores@gmail.com"
      />
      <Divider />

      {/* Account and auth options */}
      <AvatarMenuLink
        href="/account"
        icon={<AccountBoxOutlinedIcon />}
        label="Your account"
      />
      <AvatarMenuInteractive
        icon={<SwitchAccountOutlinedIcon />}
        label="Switch account"
        showArrow
      />
      <AvatarMenuLink href="/signout" icon={<LoginIcon />} label="Sign out" />

      {/* money my friend, money $$$$ */}
      <Divider />
      <AvatarMenuLink
        href="/orders"
        icon={<ShoppingBagOutlinedIcon />}
        label="Orders and purchases"
      />
      <Divider />

      {/* Preferences */}
      <AvatarMenuInteractive
        icon={<Brightness3OutlinedIcon />}
        label={`Appearance: ${withFirstUpperCase(selectedTheme)} theme`}
        onClick={() => onChangeMenu("theme")}
        showArrow
      />
      <AvatarMenuInteractive
        icon={<TranslateIcon />}
        label="Language: English"
        onClick={() => onChangeMenu("language")}
        showArrow
      />
      <AvatarMenuInteractive
        icon={<LanguageOutlinedIcon />}
        label="Location: Costa Rica"
        onClick={() => onChangeMenu("location")}
        showArrow
      />
      <Divider />

      {/* Settings */}
      <AvatarMenuLink
        href="/settings"
        icon={<SettingsOutlinedIcon />}
        label="Settings"
      />
      <Divider />

      {/* Customer Service */}
      <AvatarMenuInteractive
        icon={<HelpOutlineIcon />}
        label="Help"
        showArrow
      />
      <AvatarMenuInteractive
        icon={<FeedbackOutlinedIcon />}
        label="Send Feedback"
        showArrow
      />
    </MenuList>
  );
}
