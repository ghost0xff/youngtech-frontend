"use client";
import { IconButton, Menu } from "@mui/material";
import React, { createContext, useState } from "react";
import AccountAvatar from "../AccountAvatar/AccountAvatar";
import AvatarPreferenceThemeMenu from "./AvatarPreferenceThemeMenu";
import AvatarPreferenceMainMenu from "./AvatarPreferenceMainMenu";
import AvatarPreferenceLanguageMenu from "./AvatarPreferenceLanguageMenu";
import AvatarPreferenceLocationMenu from "./AvatarPreferenceLocationMenu";
import { MenuUtils as MU } from "../utils";
import { useSafeSession } from "../hooks";

export type AvatarMenuOption = "main" | "theme" | "language" | "location";

export const AvatarMenuDestroyerContext = createContext<MU.MenuDestroyer>({
  destroy: () => {},
});

export const AvatarMenuReturnerContext = createContext<MU.MenuReturner>({
  return: () => {},
});

export default function AvatarMenu() {
  const [anchorEl, setAchorEl] = useState<null | HTMLElement>(null);
  const [menu, setMenu] = useState<AvatarMenuOption>("main");
  const open = Boolean(anchorEl);
  const { data: session } = useSafeSession();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenu("main");
    setAchorEl(null);
  };

  function changeMenu(menu: AvatarMenuOption): void {
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
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ ml: 2 }}
        aria-controls={open ? "avatar-menu" : undefined}
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
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        transitionDuration={0}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              minWidth: "315px",
            },
          },
        }}
      >
        <AvatarMenuDestroyerContext.Provider value={menuDestroyer}>
          <AvatarMenuReturnerContext.Provider value={menuReturner}>
            {/* TODO: check how does the 'dense' prop on MenuList
        once whole menu is complete
         */}
            {menu === "main" && (
              <AvatarPreferenceMainMenu onChangeMenu={changeMenu} />
            )}
            {menu === "theme" && <AvatarPreferenceThemeMenu />}
            {menu === "language" && <AvatarPreferenceLanguageMenu />}
            {menu === "location" && <AvatarPreferenceLocationMenu />}
          </AvatarMenuReturnerContext.Provider>
        </AvatarMenuDestroyerContext.Provider>
      </Menu>
    </>
  );
}
