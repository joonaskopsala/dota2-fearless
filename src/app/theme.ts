import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    },
    background: {
      default: '#676767'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif'
  }
})

export default theme
