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

// const lightScrollbarThumb: string = "#4e342e"; // === rgb(96, 96, 96)
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
            width: 4,
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
      main: "#00011c",
      contrastText: "#C8D1D8",
    },
    secondary: {
      main: "#1F6EEA",
      contrastText: "#C8D1D8",
    },
    info: {
      main: "#42a5f5",
    },
    background: {
      default: "#F6F8FA",
      paper: "#FFFFFF",
    },
    success: {
      main: "#66bb6a",
    },
    warning: {
      main: "#ff9800",
    },
  },

  // primary: {
  //   main: "#050B2D",
  //   // main: "#1a237e",
  //   contrastText: "#C8D1D8",
  //   light: "#303f9f",
  // },
  // secondary: {
  //   main: "#4e342e",
  //   contrastText: "#E2CFAF",
  // },
  // info: {
  //   main: "#8c9eff",
  // },
  // background: {
  //   default: "#f7f4d4",
  //   // paper: "#e4dbb3",
  //   // paper: "#f3e9c4",
  //   paper: "#f7f4d4",
  //   // paper: "#F3EBC5",
  //   // paper: "#F7EED5",
  // },
  // text: {
  //   primary: "rgba(98,39,39,0.87)",
  //   secondary: "rgba(98,39,39,0.87)",
  //   disabled: "rgba(98,39,39,0.87)",
  // },
  // warning: {
  //   main: "#ffb74d",
  //   contrastText: "#4e342e",
  // },
  // error: {
  //   main: "#e57373",
  //   contrastText: "#e2cfaf",
  // },
  // success: {
  //   main: "#81c784",
  //   contrastText: "#E2CFAF",
  // },
  //
  // },

  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          // backgroundColor: "#F6F8FA",

          backgroundColor: "#FFFFFF",

          // backgroundColor: "#f7f4d4",
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
