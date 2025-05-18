// src/components/Navbar.jsx
import {
  AppBar, Toolbar, Typography, Button, Box, Container
} from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const guestLinks = [
  { label: 'Главная', to: '/' },
  { label: 'Меню', to: '/menu' },
  { label: 'Бронирование', to: '/booking' },
  { label: 'Отзывы', to: '/reviews' }
]

const adminLinks = [
  { label: 'Панель управление', to: '/admin/dashboard' },
  // { label: 'Отзывы', to: '/admin' },
  // { label: 'Бронирования', to: '/admin' }
]

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true')
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    setIsAdmin(false)
    navigate('/')
  }

  const links = isAdmin ? adminLinks : guestLinks

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: '#2e1b0f',
        fontFamily: "'Playfair Display', serif"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography
            variant="h4"
            component={Link}
            to="/"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              color: '#fce4c8',
              textDecoration: 'none',
              px: 2
            }}
          >
            Меруерт
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map((link) => (
              <Button
                key={link.to}
                component={Link}
                to={link.to}
                sx={{
                  color: location.pathname === link.to ? '#ffe082' : '#fce4c8',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 2,
                  '&:hover': {
                    backgroundColor: '#4e342e',
                    color: '#ffffff'
                  }
                }}
              >
                {link.label}
              </Button>
            ))}

            {!isAdmin ? (
              <Button
                component={Link}
                to="/admin/login"
                variant="outlined"
                sx={{
                  borderColor: '#d7ccc8',
                  color: '#fce4c8',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  ml: 1,
                  '&:hover': {
                    backgroundColor: '#5d4037',
                    borderColor: '#fff',
                    color: '#fff'
                  }
                }}
              >
                Войти
              </Button>
            ) : (
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="error"
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  ml: 1
                }}
              >
                Выйти
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
