import { createTheme } from '@mui/material/styles';

// Motyw zgodny ze zrzutami ekranu - jasny z niebieskim nagłówkiem
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // Ciemnoniebieski kolor główny
      light: '#757de8',
      dark: '#002984',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057', // Różowy kolor dodatkowy
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff',
    },
    background: {
      default: '#f0f2f5', // Jasny szary - tło aplikacji
      paper: '#ffffff', // Biały - tło komponentów
    },
    error: {
      main: '#f44336', // Czerwony
    },
    warning: {
      main: '#ff9800', // Pomarańczowy
    },
    info: {
      main: '#2196f3', // Niebieski
    },
    success: {
      main: '#4caf50', // Zielony
    },
    text: {
      primary: '#212121', // Ciemny szary - tekst główny
      secondary: '#757575', // Szary - tekst drugorzędny
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8, // Zaokrąglone krawędzie
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#3f51b5',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f5f5f5',
          color: '#212121',
          borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(63, 81, 181, 0.08)',
            borderLeft: '4px solid #3f51b5',
            '&:hover': {
              backgroundColor: 'rgba(63, 81, 181, 0.12)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(63, 81, 181, 0.04)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.54)',
          minWidth: 40,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#212121',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(63, 81, 181, 0.05)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#3f51b5',
          borderBottom: '2px solid rgba(63, 81, 181, 0.2)',
        },
        body: {
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: '#3f51b5',
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 26 / 2,
          backgroundColor: '#e0e0e0',
          opacity: 1,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#3f51b5',
          height: 8,
        },
        track: {
          border: 'none',
        },
        rail: {
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          boxShadow: '0 0 8px rgba(63, 81, 181, 0.3)',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0 0 12px rgba(63, 81, 181, 0.5)',
          },
        },
        valueLabel: {
          backgroundColor: '#3f51b5',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#bdbdbd #f5f5f5',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f5f5f5',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(97, 97, 97, 0.9)',
          fontSize: '0.75rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
        },
      },
    },
  },
});

export default theme;
