
import { Palette, PaletteMode } from "@mui/material";

export namespace MenuUtils {

    export type MenuDestroyer = {
    destroy(): void;
    };

    export type MenuReturner = {
    return(): void;
    }

}


export namespace ThemeUtils {

    export type ThemePreference = "light" | "dark" | "device";
    const defaultTheme:ThemePreference = 'device';
    const themeKey = 'theme';

    function isThemePreference(value: string): value is ThemePreference {
        return ['light', 'dark', 'device'].includes(value as ThemePreference);
    }

    export function converteToPaletteMode(pref: ThemePreference, prefsDark?: boolean): PaletteMode {
        if(pref === 'device' && prefsDark) {
            const mode: PaletteMode =  prefsDark ? 'dark' :'light';
            return mode;
        }
        return pref  as PaletteMode;
    }

}
