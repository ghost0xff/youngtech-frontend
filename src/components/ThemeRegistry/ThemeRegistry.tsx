"use client";

import * as React from "react";
import { Theme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { getTheme } from "./theme";
import { PaletteMode, useMediaQuery } from "@mui/material";
import {
  ThemePreference,
  converteToPaletteMode,
  getThemeFromStorage,
  setThemeToStorage,
} from "@/lib/utils/themeUtils";
import {
  BreakfastDiningOutlined,
  KeyboardReturnOutlined,
} from "@mui/icons-material";
import { dark } from "@mui/material/styles/createPalette";

type ThemeChanger = {
  toggleTheme: (preference: ThemePreference) => void;
};

export const ThemePreferenceContext = React.createContext<ThemeChanger>({
  toggleTheme: () => {},
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefTheme, setPrefTheme] = React.useState<ThemePreference>(
    getThemeFromStorage()
  );
  const [paletteMode, setPaletteMode] = React.useState<PaletteMode>("light");
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const themeChanger: ThemeChanger = React.useMemo(
    () => ({
      toggleTheme: (preference: ThemePreference) => {
        setThemeToStorage(preference);
        setPrefTheme(preference);
      },
    }),
    []
  );

  React.useEffect(() => {
    const storedTheme: ThemePreference = getThemeFromStorage();
    const mode: PaletteMode = converteToPaletteMode(
      storedTheme,
      prefersDarkTheme
    );
    setPaletteMode(mode);
    setPrefTheme(storedTheme);
  }, [prefTheme]);

  // const preferredTheme: Theme = getTheme("light");
  // const preferredTheme: Theme = getTheme("dark");

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemePreferenceContext.Provider value={themeChanger}>
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
