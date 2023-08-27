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
import { ThemePreference, getThemeFromStorage } from "@/lib/utils/themeUtils";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

type AvPrefMainMenuProps = {
  onChangeMenu(option: AvatarMenuOption): void;
};

export default function AvatarPreferenceMainMenu({
  onChangeMenu,
}: AvPrefMainMenuProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemePreference>(
    getThemeFromStorage()
  );
  const { data: session } = useSession();

  // temporary till I add i18n
  const textTheme = (theme: ThemePreference): string => {
    let word: "Claro" | "Oscuro" | "del Dispositivo" = "Claro";
    if (theme == "light") {
      word = "Claro";
    } else if (theme == "dark") {
      word = "Oscuro";
    } else if (theme == "device") {
      word = "del Dispositivo";
    }
    return word;
  };

  return (
    <MenuList>
      {/* Header with account info*/}
      <AvatarMenuHeader
        name={session?.user?.name as string}
        email={session?.user?.email as string}
        img={session?.user?.image as string}
      />
      <Divider />

      {/* Account and auth options */}
      <AvatarMenuLink
        href="/account"
        icon={<AccountBoxOutlinedIcon />}
        label="Tu cuenta"
      />
      <AvatarMenuLink
        href="/orders"
        icon={<ShoppingBagOutlinedIcon />}
        label="Ordenes y compras"
      />
      <AvatarMenuInteractive
        icon={<SwitchAccountOutlinedIcon />}
        label="Cambiar de cuenta"
        showArrow
      />

      <AvatarMenuInteractive
        onClick={() => signOut({ callbackUrl: "/" })}
        icon={<LoginIcon />}
        label="Salir"
      />

      {/* money my friend, money $$$$ */}
      <Divider />

      {/* Preferences */}
      <AvatarMenuInteractive
        icon={<Brightness3OutlinedIcon />}
        label={`Apariencia: ${textTheme(selectedTheme)}`}
        onClick={() => onChangeMenu("theme")}
        showArrow
      />
      <AvatarMenuInteractive
        icon={<TranslateIcon />}
        label="Lenguaje: Español"
        onClick={() => onChangeMenu("language")}
        showArrow
      />
      <AvatarMenuInteractive
        icon={<LanguageOutlinedIcon />}
        label="Ubicación: Costa Rica"
        onClick={() => onChangeMenu("location")}
        showArrow
      />
      <Divider />

      {/* Settings */}
      <AvatarMenuLink
        href="/settings"
        icon={<SettingsOutlinedIcon />}
        label="Configuración"
      />

      {/* Customer Service */}
      <AvatarMenuInteractive
        icon={<HelpOutlineIcon />}
        label="Ayuda"
        // showArrow
      />
      <AvatarMenuInteractive
        icon={<FeedbackOutlinedIcon />}
        label="Enviar comentarios"
        // showArrow
      />
    </MenuList>
  );
}
