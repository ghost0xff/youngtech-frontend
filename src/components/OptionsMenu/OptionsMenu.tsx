"use client";
import { IconButton, Menu, Theme, useTheme } from "@mui/material";
import React, { createContext, useState } from "react";
import AccountAvatar from "../AccountAvatar/AccountAvatar";
import OptionsPreferenceThemeMenu from "./OptionsPreferenceThemeMenu";
import OptionsPreferenceMainMenu from "./OptionsPreferenceMainMenu";
import AvatarPreferenceLanguageMenu from "./OptionsPreferenceLanguageMenu";
import OptionsPreferenceLocationMenu from "./OptionsPreferenceLocationMenu";
import { MenuUtils as MU } from "../utils";
import { useSafeSession } from "../hooks";
import { AuthLoader } from "../Auth/AuthLoader";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export type MenuOption = "main" | "theme" | "language" | "location";

export const OptionsMenuDestroyerContext = createContext<MU.MenuDestroyer>({
  destroy: () => {},
});

export const OptionsMenuReturnerContext = createContext<MU.MenuReturner>({
  return: () => {},
});

export default function OptionsMenu() {
  const [anchorEl, setAchorEl] = useState<null | HTMLElement>(null);
  const [menu, setMenu] = useState<MenuOption>("main");
  const open = Boolean(anchorEl);
  const { data: session } = useSafeSession();
  const theme: Theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenu("main");
    setAchorEl(null);
  };

  function changeMenu(menu: MenuOption): void {
    setMenu(menu);
  }

  const menuDestroyer: MU.MenuDestroyer = React.useMemo(
    () => ({
      destroy: () => {
        handleClose();
      },
    }),
    []
  );

  const menuReturner: MU.MenuReturner = React.useMemo(
    () => ({
      return: () => {
        setMenu("main");
      },
    }),
    []
  );

  return (
    <>
      <AuthLoader
        onUnAuthenticated={
          <IconButton
            size="small"
            onClick={handleClick}
            aria-controls={open ? "options-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        }
      >
        <IconButton
          size="small"
          onClick={handleClick}
          aria-controls={open ? "options-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AccountAvatar
            name={session?.user?.name as string}
            img={session?.user?.image as string}
            imgWidth={33}
            imgHeight={33}
          />
        </IconButton>
      </AuthLoader>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transitionDuration={0}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              minWidth: "305px",
              // maxWidth: "300px",
              maxHeight: "749px",
            },
          },
        }}
      >
        <OptionsMenuDestroyerContext.Provider value={menuDestroyer}>
          <OptionsMenuReturnerContext.Provider value={menuReturner}>
            {/* TODO: check how does the 'dense' prop on MenuList
        once whole menu is complete
         */}
            {menu === "main" && (
              <OptionsPreferenceMainMenu onChangeMenu={changeMenu} />
            )}
            {menu === "theme" && <OptionsPreferenceThemeMenu />}
            {menu === "language" && <AvatarPreferenceLanguageMenu />}
            {menu === "location" && <OptionsPreferenceLocationMenu />}
          </OptionsMenuReturnerContext.Provider>
        </OptionsMenuDestroyerContext.Provider>
      </Menu>
    </>
  );
}
