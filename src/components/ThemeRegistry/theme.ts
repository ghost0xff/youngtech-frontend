import { Theme, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material/styles';

const generalTheme = createTheme({
  palette: {
   mode:'dark' 
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});
const responsiveGeneralTheme = responsiveFontSizes(generalTheme);
// this themes below can be visualized here -> https://zenoo.github.io/mui-theme-creator

const lightTheme:Theme = createTheme(responsiveGeneralTheme, {
  palette: {
    mode: 'light',
    primary: {
      main: '#0D1117',
      contrastText: '#C8D1D8',
    },
    secondary: {
      main: '#1F6EEA',
      contrastText: '#C8D1D8',
    },
    info: {
      main: '#A371F7',
    },
    text: {
      disabled: '#7e7e7e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
        backgroundColor: '#010508'
        }
      }
    },
  }
});

const darkTheme:Theme = createTheme(responsiveGeneralTheme, {
  palette: {
    mode: 'dark',
    primary: {
      main: '#1F6EEA',
      contrastText: '#C8D1D8',
    },
    secondary: {
      main: '#A371F7',
      contrastText: '#C8D1D8',
    },
    text: {
      primary: '#C8D1D8',
      secondary: '#C8D1D8',
      disabled: '#31373D',
    },
    background: {
      default: '#0D1117',
      paper: '#171A22',
    },
    success: {
      main: '#238636',
      contrastText: '#C8D1D8',
    },
    info: {
      main: '#238636',
      contrastText: '#C8D1D8',
    },
    divider: '#5E656D', 
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
        backgroundColor: '#010508'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#171A22",
        }
      }
    }
  }
});



export function getTheme(mode: FixedThemeChoice): Theme {
  const theme = mode === 'light' ? lightTheme : darkTheme;
  return theme;
  // return responsiveGeneralTheme;
}