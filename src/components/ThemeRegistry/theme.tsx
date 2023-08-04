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

const generalTheme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
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
              minWidth: "315px",
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
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#F6F8FA",
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
  },
});

export function getTheme(mode: "light" | "dark"): Theme {
  if (mode === "light") {
    return deepmerge(responsiveGeneralTheme, lightTheme);
  }
  return deepmerge(responsiveGeneralTheme, darkTheme);
}
