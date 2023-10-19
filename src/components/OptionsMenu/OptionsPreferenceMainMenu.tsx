"use client";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Brightness3OutlinedIcon from "@mui/icons-material/Brightness3Outlined";
import OptionsMenuHeader from "./OptionsMenuHeader";
import OptionsMenuLink from "./OptionsMenuLink";
import OptionsMenuInteractive from "./OptionsMenuInteractive";
import { MenuList, Divider } from "@mui/material";
import { MenuOption } from "./OptionsMenu";
import { ThemeUtils as TU } from "../utils";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSafeSession } from "../hooks";
import { AuthLoader } from "../Auth/AuthLoader";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import TranslateSharpIcon from "@mui/icons-material/TranslateSharp";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import ShoppingCartCheckoutSharpIcon from "@mui/icons-material/ShoppingCartCheckoutSharp";

type OptPrefMainMenuProps = {
  onChangeMenu(option: MenuOption): void;
};

export default function OptionsPreferenceMainMenu({
  onChangeMenu,
}: OptPrefMainMenuProps) {
  const [selectedTheme, setSelectedTheme] =
    useState<TU.ThemePreference>("light"); // hardcoded until implemented
  const { data: session } = useSafeSession();
  let completeName = "lol:v";
  if (session) {
    completeName = session.user.firstnames
      .concat(" ")
      .concat(session.user.lastnames);
  }

  // temporary till I add i18n
  const textTheme = (theme: TU.ThemePreference): string => {
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

      <AuthLoader>
        <OptionsMenuHeader
          name={completeName}
          email={session?.user?.email as string}
          img={session?.user?.image as string}
        />
        <Divider />
        <OptionsMenuLink
          href="/account"
          icon={<AccountBoxSharpIcon />}
          label="Tu cuenta"
        />
        <OptionsMenuLink
          href="/orders"
          icon={<ShoppingBagOutlinedIcon />}
          label="Ordenes y compras"
        />
        <OptionsMenuLink
          href="/checkout"
          label="Checkout"
          icon={<ShoppingCartCheckoutSharpIcon />}
        />

        <OptionsMenuInteractive
          onClick={() => signOut()}
          icon={<LoginSharpIcon />}
          label="Salir"
        />
        <Divider />
      </AuthLoader>

      {/* Preferences */}
      <OptionsMenuInteractive
        // icon={<Brightness3OutlinedIcon color="inherit" />}
        icon={<Brightness3OutlinedIcon />}
        label={`Apariencia: ${textTheme(selectedTheme)}`}
        onClick={() => onChangeMenu("theme")}
        showArrow
      />
      <OptionsMenuInteractive
        icon={<TranslateSharpIcon />}
        label="Lenguaje: Español"
        onClick={() => onChangeMenu("language")}
        showArrow
      />
      <OptionsMenuInteractive
        icon={<LanguageSharpIcon />}
        label="Ubicación: Costa Rica"
        onClick={() => onChangeMenu("location")}
        showArrow
      />
      <Divider />

      {/* Settings */}
      <OptionsMenuLink
        href="/settings"
        icon={<SettingsOutlinedIcon />}
        // icon={<SettingsSharpIcon  />}
        label="Configuración"
      />

      {/* Customer Service */}
      <OptionsMenuInteractive
        icon={<HelpOutlineIcon />}
        label="Ayuda"
        // showArrow
      />
      <OptionsMenuInteractive
        icon={<FeedbackOutlinedIcon />}
        label="Enviar comentarios"
        // showArrow
      />
    </MenuList>
  );
}
