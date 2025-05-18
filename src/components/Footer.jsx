// src/components/Footer.jsx
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        bgcolor: '#3e2723',
        color: '#fbe9e7',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Ресторан «Меруерт». Все права защищены.
      </Typography>
    </Box>
  )
}

export default Footer
