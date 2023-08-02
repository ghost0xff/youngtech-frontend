import { LinkProps as MuiLinkProps } from "@mui/material";
import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";

import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";

const LinkBehaviour = forwardRef<HTMLAnchorElement, NextLinkProps>(
  function LinkBehaviour(props, ref) {
    return <NextLink ref={ref} {...props} />;
  }
);

const generalTheme = createTheme({
  // palette: {
  //   mode: "dark",
  // },
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
        slotProps: {
          paper: {
            sx: {
              borderRadius: "12px",
            },
          },
        },
      },
    },
  },
});

const responsiveGeneralTheme = responsiveFontSizes(generalTheme);
// this themes below can be visualized here -> https://zenoo.github.io/mui-theme-creator

const lightTheme: Theme = createTheme(responsiveGeneralTheme, {
  palette: {
    // mode: "light",
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
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#010508",
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

const darkTheme: Theme = createTheme(responsiveGeneralTheme, {
  palette: {
    // mode: "light",
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

// let FixedThemeChoice: "light" | "dark";
export function getTheme(mode: "light" | "dark"): Theme {
  if (mode === "light") {
    return lightTheme;
  }
  return darkTheme;
}
