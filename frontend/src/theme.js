import { createTheme } from '@mui/material/styles';

// Motyw z elementami estetyki kosmiczno-robotycznej
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4dabf5', // Jasnoniebieski kolor główny - jak światło LED
      light: '#80d8ff',
      dark: '#0077c2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#b388ff', // Fioletowy kolor dodatkowy - jak światło neonu
      light: '#e7b9ff',
      dark: '#805acb',
      contrastText: '#fff',
    },
    background: {
      default: '#0a1929', // Ciemny granat - jak kosmos
      paper: '#132f4c', // Ciemny niebieski - jak panel sterowania
    },
    error: {
      main: '#ff5252', // Czerwony - jak światło ostrzegawcze
    },
    warning: {
      main: '#ffab40', // Pomarańczowy - jak światło ostrzegawcze
    },
    info: {
      main: '#64b5f6', // Niebieski - jak ekran informacyjny
    },
    success: {
      main: '#69f0ae', // Zielony - jak światło statusu
    },
    text: {
      primary: '#e3f2fd', // Jasny niebieski - jak tekst na ekranie
      secondary: '#90caf9', // Jaśniejszy niebieski - jak tekst drugorzędny
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
      letterSpacing: '0.02em',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
      letterSpacing: '0.02em',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      letterSpacing: '0.02em',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      letterSpacing: '0.02em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 12, // Zaokrąglone krawędzie - jak panele robotów
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(90deg, #0a1929 0%, #132f4c 100%)',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.5)',
          borderBottom: '1px solid rgba(77, 171, 245, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '8px 16px',
          transition: 'all 0.3s ease',
        },
        contained: {
          background: 'linear-gradient(45deg, #4dabf5 30%, #80d8ff 90%)',
          boxShadow: '0 4px 10px rgba(77, 171, 245, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 15px rgba(77, 171, 245, 0.5)',
          },
        },
        outlined: {
          borderColor: '#4dabf5',
          '&:hover': {
            boxShadow: '0 0 10px rgba(77, 171, 245, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.3)',
          borderRadius: 16,
          border: '1px solid rgba(77, 171, 245, 0.1)',
          background: 'linear-gradient(145deg, rgba(19, 47, 76, 0.9), rgba(10, 25, 41, 0.95))',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(180deg, #0a1929 0%, #132f4c 100%)',
          color: '#e3f2fd',
          borderRight: '1px solid rgba(77, 171, 245, 0.2)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(77, 171, 245, 0.15)',
            borderLeft: '4px solid #4dabf5',
            '&:hover': {
              backgroundColor: 'rgba(77, 171, 245, 0.25)',
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(77, 171, 245, 0.08)',
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'rgba(227, 242, 253, 0.7)',
          minWidth: 40,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#e3f2fd',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(19, 47, 76, 0.8)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#90caf9',
          borderBottom: '2px solid rgba(77, 171, 245, 0.3)',
        },
        body: {
          borderBottom: '1px solid rgba(77, 171, 245, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(19, 47, 76, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.2)',
        },
        elevation2: {
          boxShadow: '0 4px 15px 0 rgba(0, 0, 0, 0.3)',
        },
        elevation3: {
          boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: 'rgba(77, 171, 245, 0.1)',
          border: '1px solid rgba(77, 171, 245, 0.2)',
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'rgba(77, 171, 245, 0.2)',
            border: '1px solid rgba(77, 171, 245, 0.3)',
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: 'rgba(179, 136, 255, 0.2)',
            border: '1px solid rgba(179, 136, 255, 0.3)',
          },
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
              backgroundColor: '#4dabf5',
              opacity: 1,
              border: 'none',
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#4dabf5',
            border: '6px solid #fff',
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 26 / 2,
          backgroundColor: '#2c3e50',
          opacity: 1,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#4dabf5',
          height: 8,
        },
        track: {
          border: 'none',
          backgroundImage: 'linear-gradient(90deg, #4dabf5, #80d8ff)',
        },
        rail: {
          backgroundColor: 'rgba(77, 171, 245, 0.2)',
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          boxShadow: '0 0 10px rgba(77, 171, 245, 0.5)',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0 0 15px rgba(77, 171, 245, 0.7)',
          },
        },
        valueLabel: {
          backgroundColor: '#4dabf5',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#4dabf5 #132f4c',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#132f4c',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4dabf5',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'rgba(19, 47, 76, 0.95)',
          border: '1px solid rgba(77, 171, 245, 0.2)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          fontSize: '0.75rem',
        },
        arrow: {
          color: 'rgba(19, 47, 76, 0.95)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(145deg, rgba(19, 47, 76, 0.95), rgba(10, 25, 41, 0.98))',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          border: '1px solid rgba(77, 171, 245, 0.2)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
});

export default theme;
