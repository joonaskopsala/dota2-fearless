import { Button, ButtonProps } from '@mui/material'
import { ReactNode } from 'react'

type ToolButtonProps = ButtonProps & {
  children: ReactNode
}

const ToolButton = ({ children, sx, ...props }: ToolButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        minHeight: 44,
        minWidth: { xs: '100%', sm: 160 },
        fontWeight: 700,
        color:
          props.variant === 'outlined' ? 'rgba(255,255,255,0.92)' : '#141414',
        backgroundColor:
          props.variant === 'outlined'
            ? 'transparent'
            : 'rgba(255,255,255,0.96)',
        borderColor:
          props.variant === 'outlined'
            ? 'rgba(255,255,255,0.3)'
            : 'rgba(255,255,255,0.96)',
        '&:hover': {
          backgroundColor:
            props.variant === 'outlined'
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(255,255,255,1)',
          borderColor: 'rgba(255,255,255,0.45)'
        },
        '&.Mui-disabled': {
          color: 'rgba(255,255,255,0.38)',
          borderColor: 'rgba(255,255,255,0.16)',
          backgroundColor:
            props.variant === 'outlined'
              ? 'transparent'
              : 'rgba(255,255,255,0.35)'
        },
        ...sx
      }}
    >
      {children}
    </Button>
  )
}

export { ToolButton }
