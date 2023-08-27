import { Palette, PaletteMode } from "@mui/material";


export type ThemePreference = "light" | "dark" | "device";

const defaultTheme:ThemePreference = 'device';
const themeKey = 'theme';

function isThemePreference(value: string): value is ThemePreference {
    return ['light', 'dark', 'device'].includes(value as ThemePreference);
}

export function getThemeFromStorage(): ThemePreference {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedValue: string | null = localStorage.getItem(themeKey);

        // case it does not exist at all or is nullish
        if(!storedValue) {
            localStorage.setItem(themeKey, defaultTheme);
            return defaultTheme;
        } 
        // case it does exist in local storage AND is valid 
        if(isThemePreference(storedValue)){
            return storedValue ;
        } else {
        // case IT DOES exist but isn't a valid option
            localStorage.setItem(themeKey, defaultTheme);
            return defaultTheme;
        }
    }
    return defaultTheme;
}

export function setThemeToStorage(preference: ThemePreference) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(themeKey);
        localStorage.setItem(themeKey, preference);
    }
}


export function converteToPaletteMode(pref: ThemePreference, prefsDark?: boolean): PaletteMode {
    if(pref === 'device' && prefsDark) {
        const mode: PaletteMode =  prefsDark ? 'dark' :'light';
        return mode;
    }
    return pref  as PaletteMode;
    // if(prefsDark) {
    //     const mode:PaletteMode = prefsDark ? 'dark' : 'light';
    //     return mode;
    // }
    // return pref as PaletteMode;

}