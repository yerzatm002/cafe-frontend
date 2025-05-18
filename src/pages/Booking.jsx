// src/pages/Booking.jsx
import { Container, Box, Typography, Divider } from '@mui/material'
import BookingForm from '../components/BookingForm'

const Booking = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #fff8f2, #fefaf6)',
        minHeight: '100vh',
        py: { xs: 6, md: 8 }
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#3e2723'
          }}
        >
          Бронирование
        </Typography>

        <Divider
          sx={{
            width: 60,
            height: 4,
            mx: 'auto',
            mb: 3,
            bgcolor: '#6d4c41',
            borderRadius: 2
          }}
        />

        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 5,
            fontWeight: 400,
            color: '#5d4037',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Забронируйте столик в нашем ресторане заранее, чтобы гарантировать себе место и идеальное обслуживание.
        </Typography>

        <BookingForm />
      </Container>
    </Box>
  )
}

export default Booking
