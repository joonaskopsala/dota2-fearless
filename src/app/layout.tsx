'use client'

import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import React from 'react'
import theme from './theme'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Fearless mode ban tool</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              minHeight: '100vh',
              width: '100%',
              display: 'flex'
            }}
          >
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}
