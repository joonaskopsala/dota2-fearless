import { Box, Typography } from '@mui/material'

const PlaceholderImage = () => {
  return (
    <Box
      sx={{
        width: 90,
        height: 50,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1
      }}
    >
      <Typography variant="h6" color="text.primary">
        ?
      </Typography>
    </Box>
  )
}

export { PlaceholderImage }
