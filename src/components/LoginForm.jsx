// src/components/LoginForm.jsx
import {
  Box, TextField, Button, Typography, Alert, Paper
} from '@mui/material'
import { useState } from 'react'
import { login } from '../services/api'

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(email, pass)
      localStorage.setItem('isAdmin', 'true')
      localStorage.setItem('token', res.token)
      setError('')
      onLogin()
    } catch (err) {
      setError(err.message || 'Ошибка авторизации')
    }
  }

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 420,
        mx: 'auto',
        p: 4,
        borderRadius: 3,
        backgroundColor: '#fffaf5',
        boxShadow: '0 10px 24px rgba(0,0,0,0.1)'
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
      >
        Вход администратора
      </Typography>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth label="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth label="Пароль" type="password"
          value={pass} onChange={(e) => setPass(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#6d4c41',
            fontWeight: 600,
            py: 1.2,
            '&:hover': {
              backgroundColor: '#5d4037'
            }
          }}
        >
          Войти
        </Button>
      </Box>
    </Paper>
  )
}

export default LoginForm
