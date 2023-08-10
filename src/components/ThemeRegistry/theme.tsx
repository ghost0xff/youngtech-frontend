import { LinkProps as MuiLinkProps, PaletteMode } from "@mui/material";
import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";
import LinkBehaviour from "./LinkBehaviour";

// const LinkBehaviour = forwardRef<HTMLAnchorElement, NextLinkProps>(
//   function LinkBehaviour(props, ref) {
//     return <NextLink ref={ref} {...props} />;
//   }
// );

const lightScrollbarThumb: string = "#c1c1c1"; // === rgb(96, 96, 96)
const lightScrollbarTrack: string = "transparent";

const darkScrollbarThumb: string = "";
const darkScrollbarTrack: string = "";

const generalTheme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          scrollbarColor: `${lightScrollbarThumb} ${lightScrollbarTrack}`,
          // scrollbarWidth: "none",
          // scrollbarWidth: "thin",
          // scrollbarWidth: 1,
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: lightScrollbarTrack,
            width: 6,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 50,
            backgroundColor: lightScrollbarThumb,
            minHeight: 5,
            border: `0px solid ${lightScrollbarTrack}`,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: lightScrollbarThumb,
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: lightScrollbarThumb,
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: lightScrollbarThumb,
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: lightScrollbarTrack,
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      } as MuiLinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
    MuiMenu: {
      defaultProps: {
        transitionDuration: 0,
        slotProps: {
          paper: {
            sx: {
              borderRadius: "12px",
              // minWidth: "315px",
            },
          },
        },
      },
    },
  },
});

const responsiveGeneralTheme = responsiveFontSizes(generalTheme);
// this themes below can be visualized here -> https://zenoo.github.io/mui-theme-creator

const lightTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0D1117",
      // main: "#0D1117",
      // main: "#00011c",
      contrastText: "#C8D1D8",
    },
    secondary: {
      main: "#1F6EEA",
      contrastText: "#C8D1D8",
    },
    info: {
      main: "#A371F7",
    },
    text: {
      disabled: "#7e7e7e",
    },
    background: {
      default: "#F6F8FA",
      // default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#F6F8FA",
          // backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 3,
          },
        },
      },
    },
  },
});

const darkTheme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1F6EEA",
      contrastText: "#C8D1D8",
    },
    secondary: {
      main: "#A371F7",
      contrastText: "#C8D1D8",
    },
    text: {
      primary: "#C8D1D8",
      secondary: "#C8D1D8",
      disabled: "#31373D",
    },
    background: {
      default: "#0D1117",
      paper: "#171A22",
    },
    success: {
      main: "#238636",
      contrastText: "#C8D1D8",
    },
    info: {
      main: "#238636",
      contrastText: "#C8D1D8",
    },
    divider: "#5E656D",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#010508",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#171A22",
        },
      },
    },
    MuiMenu: {
      defaultProps: {
        slotProps: {
          paper: {
            elevation: 0,
          },
        },
      },
    },
    // TODO: Add this and config new colors so it looks pretty cool
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     ":root": {
    //       scrollbarColor: `${lightScrollbarThumb} ${lightScrollbarTrack}`,
    //       // scrollbarWidth: "none",
    //       // scrollbarWidth: "thin",
    //       // scrollbarWidth: 1,
    //       "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
    //         backgroundColor: lightScrollbarTrack,
    //         width: 7,
    //       },
    //       "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
    //         borderRadius: 50,
    //         backgroundColor: lightScrollbarThumb,
    //         minHeight: 5,
    //         border: `0px solid ${lightScrollbarTrack}`,
    //       },
    //       "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
    //         {
    //           backgroundColor: lightScrollbarThumb,
    //         },
    //       "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
    //         {
    //           backgroundColor: lightScrollbarThumb,
    //         },
    //       "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
    //         {
    //           backgroundColor: lightScrollbarThumb,
    //         },
    //       "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
    //         backgroundColor: lightScrollbarTrack,
    //       },
    //     },
    //   },
    // },
  },
});

export function getTheme(mode: PaletteMode): Theme {
  if (mode === "light") {
    return deepmerge(responsiveGeneralTheme, lightTheme);
  }
  return deepmerge(responsiveGeneralTheme, darkTheme);
}
