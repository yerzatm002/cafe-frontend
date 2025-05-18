// src/pages/LoginPage.jsx
import { Container, Box, Typography } from '@mui/material'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <Box sx={{ py: 8, minHeight: '100vh', backgroundColor: '#fefaf6' }}>
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
        >
          Вход администратора
        </Typography>
        <LoginForm onLogin={() => window.location.href = '/admin/dashboard'} />
      </Container>
    </Box>
  )
}

export default LoginPage
