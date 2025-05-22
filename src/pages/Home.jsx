// src/pages/Home.jsx
import { Box, Typography, Button, Grid, Container, useTheme } from '@mui/material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const sliderImages = [
  'https://flynet.travel/wp-content/uploads/2019/05/Bennelong_Gallery_The-beautiful-interior-of-Bennelong-restaurant-with-spectacual-city-views-of-Sydney_1600x900-8.jpg',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f169f732-4736-4a0c-8562-12989935395d/dilkuz5-d83439eb-f31c-4701-b999-b344007739e9.jpg/v1/fill/w_1095,h_730,q_70,strp/shutterstock_741884605_by_thanseeha_dilkuz5-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODU0IiwicGF0aCI6IlwvZlwvZjE2OWY3MzItNDczNi00YTBjLTg1NjItMTI5ODk5MzUzOTVkXC9kaWxrdXo1LWQ4MzQzOWViLWYzMWMtNDcwMS1iOTk5LWIzNDQwMDc3MzllOS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bCq6X6IFLv69Vij9kcDh8G5JS0C6pq7t3R4vL0NSjUA',
  'https://avatars.mds.yandex.net/i?id=65c8b3934223c493ed20486b66d45b86_l-5257898-images-thumbs&n=13'
]

const Home = () => {
  const [current, setCurrent] = useState(0)
  const theme = useTheme()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#fff',
        overflow: 'hidden'
      }}
    >
      {/* Слайдер фон */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${sliderImages[current]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          filter: 'brightness(0.4)',
          transition: 'background-image 1s ease-in-out'
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: 12,
          pb: 8,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#fff',
                mb: 3
              }}
            >
              Добро пожаловать в <br /> ресторан «Меруерт»
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#e0e0e0',
                mb: 4,
                maxWidth: 550,
                lineHeight: 1.8
              }}
            >
              Авторская кухня, восточное гостеприимство и атмосфера уюта — всё это ждёт вас в самом сердце города. Приходите и насладитесь вкусом.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/menu"
              sx={{ mr: 2, px: 4, py: 1.5, fontWeight: 600 }}
              color="secondary"
            >
              Смотреть меню
            </Button>

            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/booking"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                color: '#fff',
                borderColor: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#000'
                }
              }}
            >
              Забронировать
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Home
