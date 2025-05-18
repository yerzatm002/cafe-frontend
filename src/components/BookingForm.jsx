// src/components/BookingForm.jsx
import {
  TextField, Button, Grid, Box, Typography, Alert, Paper
} from '@mui/material'
import { useState, useEffect } from 'react'
import { createReservation } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: ''
}

const BookingForm = () => {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.date || !form.time || !form.guests) {
      setError('Пожалуйста, заполните все поля')
      setSuccess(false)
      return
    }

    try {
      await createReservation({
        ...form,
        peopleCount: parseInt(form.guests),
      })
      setError('')
      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      setError(err.message || 'Ошибка отправки бронирования')
      setSuccess(false)
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: '#fffaf4',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
      >
        Забронируйте столик
      </Typography>

      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ my: 2 }}>Бронирование успешно отправлено!</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="name" label="Имя" value={form.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="email" label="Email" type="email" value={form.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth name="phone" label="Телефон" value={form.phone} onChange={handleChange} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth name="date" label="Дата" type="date"
              InputLabelProps={{ shrink: true }} value={form.date} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth name="time" label="Время" type="time"
              InputLabelProps={{ shrink: true }} value={form.time} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth name="guests" label="Кол-во гостей" type="number"
              value={form.guests} onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#6d4c41',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#5d4037'
                }
              }}
            >
              Забронировать
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default BookingForm
