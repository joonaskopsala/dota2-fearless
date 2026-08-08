import { Paper, PaperProps } from '@mui/material'
import { ReactNode } from 'react'

type PanelProps = PaperProps & {
  children: ReactNode
}

const Panel = ({ children, sx, ...props }: PanelProps) => {
  return (
    <Paper
      elevation={0}
      {...props}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: 'inherit',
        ...sx
      }}
    >
      {children}
    </Paper>
  )
}

export { Panel }
