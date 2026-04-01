'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => {
  const lightPalette = {
    primary: {
      main: '#b45309',
      light: '#d97706',
      dark: '#92400e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0f766e',
      light: '#0d9488',
      dark: '#115e59',
      contrastText: '#f8fafc',
    },
    background: {
      default: '#f5f5f4',
      paper: '#fffcf7',
    },
    text: {
      primary: '#1c1917',
      secondary: '#57534e',
    },
    divider: '#d6d3d1',
  };

  const darkPalette = {
    primary: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#1c1917',
    },
    secondary: {
      main: '#2dd4bf',
      light: '#5eead4',
      dark: '#14b8a6',
      contrastText: '#042f2e',
    },
    background: {
      default: '#0f0f10',
      paper: '#171718',
    },
    text: {
      primary: '#f5f5f4',
      secondary: '#a8a29e',
    },
    divider: '#292524',
  };

  return {
    palette: mode === 'light' ? lightPalette : darkPalette,
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: mode === 'light' ? '#d6d3d1' : '#292524',
            transition: 'box-shadow 0.2s ease-in-out',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 14px 30px -16px rgba(28, 25, 23, 0.45)'
                : '0 18px 32px -18px rgba(0, 0, 0, 0.75)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },
    },
  };
};

export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme(getDesignTokens(mode));
};

export type AppTheme = ReturnType<typeof createAppTheme>;