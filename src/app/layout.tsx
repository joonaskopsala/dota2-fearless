'use client'

import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, Container } from '@mui/material'
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
          <Container
            maxWidth={false}
            sx={{
              width: '100vw',
              padding: 0,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
