import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8f1d12'
    },
    secondary: {
      main: '#dc004e'
    },
    background: {
      default: '#575b66',
      paper: '#ffffff'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.8)'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 700
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          minHeight: 44
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.75rem'
        }
      }
    }
  }
})

export default theme
