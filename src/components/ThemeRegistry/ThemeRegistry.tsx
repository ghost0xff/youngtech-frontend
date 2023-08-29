"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { getTheme } from "./theme";
import { PaletteMode } from "@mui/material";
import { ThemeUtils as TU } from "../utils";
import React from "react";

type ThemeChanger = {
  toggleTheme: (preference: TU.ThemePreference) => void;
};

export const ThemePreferenceContext = React.createContext<ThemeChanger>({
  toggleTheme: () => {},
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefTheme, setPrefTheme] = React.useState<TU.ThemePreference>("light");
  const [paletteMode, setPaletteMode] = React.useState<PaletteMode>("light");
  const themeChanger: ThemeChanger = React.useMemo(
    () => ({
      toggleTheme: (preference: TU.ThemePreference) => {
        // TU.setThemeToStorage(preference);
        // setPrefTheme(preference);
      },
    }),
    []
  );

  // React.useEffect(() => {
  //   const storedTheme: TU.ThemePreference = TU.getThemeFromStorage();
  //   const mode: PaletteMode = TU.converteToPaletteMode(
  //     storedTheme,
  //     prefersDarkTheme
  //   );
  //   setPaletteMode(mode);
  //   setPrefTheme(storedTheme);
  // }, [prefTheme]);

  // const preferredTheme: Theme = getTheme("light");
  // const preferredTheme: Theme = getTheme("dark");

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemePreferenceContext.Provider value={themeChanger}>
        {/* BELOW is hardcoded until I implement this,
         since MUI renders mostly on the client,
         would I need to retwrite the whole project? at
          least in styling????
         */}
        <ThemeProvider theme={getTheme("light")}>
          {/* {"do i prefer dark theme? = " + String(prefersDarkTheme)} */}
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline enableColorScheme />
          {children}
        </ThemeProvider>
      </ThemePreferenceContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
}
