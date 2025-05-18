// src/pages/Reviews.jsx
import {
  Box, Container, Typography, Grid, TextField, Button, Divider, Alert
} from '@mui/material'
import { useState, useEffect } from 'react'
import ReviewCard from '../components/ReviewCard'
import { getReviews, addReview } from '../services/api'

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ name: '', message: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const data = await getReviews()
      setReviews(data)
    } catch (err) {
      setError('Ошибка загрузки отзывов')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message) {
      setError('Заполните все поля')
      return
    }

    try {
      const newReview = await addReview(form)
      setReviews([newReview, ...reviews])
      setForm({ name: '', message: '' })
      setError('')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Ошибка отправки отзыва')
    }
  }

  return (
    <Box sx={{ backgroundColor: '#fffdf8', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
        >
          Отзывы гостей
        </Typography>

        <Divider sx={{ my: 3, bgcolor: '#6d4c41', height: 4, width: 60, mx: 'auto', borderRadius: 2 }} />

        <Typography align="center" sx={{ color: '#6d4c41', mb: 4 }}>
          Нам важно ваше мнение! Поделитесь впечатлением:
        </Typography>

        {/* Форма */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Спасибо за ваш отзыв!</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth name="name" label="Ваше имя"
                value={form.name} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth name="message" label="Ваш отзыв"
                value={form.message} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#6d4c41',
                  px: 4,
                  py: 1.5,
                  '&:hover': { backgroundColor: '#5d4037' }
                }}
              >
                Отправить отзыв
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Список отзывов */}
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Reviews