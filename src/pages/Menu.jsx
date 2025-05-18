// src/pages/Menu.jsx
import { useEffect, useState } from 'react'
import {
  Container, Grid, Typography, Button, Box, Divider
} from '@mui/material'
import DishCard from '../components/DishCard'
import { getMenu } from '../services/api'

const Menu = () => {
  const [menu, setMenu] = useState([])
  const [category, setCategory] = useState('Все')

  useEffect(() => {
    loadMenu()
  }, [])

  const loadMenu = async () => {
    try {
      const data = await getMenu()
      setMenu(data)
    } catch (err) {
      console.error('Ошибка загрузки меню:', err.message)
    }
  }

  const categories = ['Все', ...new Set(menu.map(d => d.category))]
  const filtered = category === 'Все'
    ? menu
    : menu.filter(d => d.category === category)

  return (
    <Box sx={{ backgroundColor: '#fefaf6', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
        >
          Меню ресторана
        </Typography>
        <Divider sx={{ my: 3, bgcolor: '#6d4c41' }} />

        {/* Категории */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 5 }}>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={cat === category ? 'contained' : 'outlined'}
              onClick={() => setCategory(cat)}
              sx={{
                textTransform: 'none',
                borderRadius: 3,
                px: 3,
                py: 1,
                backgroundColor: cat === category ? '#4e342e' : 'transparent',
                color: cat === category ? '#fff' : '#4e342e',
                borderColor: '#4e342e',
                '&:hover': {
                  backgroundColor: '#6d4c41',
                  color: '#fff'
                }
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        {/* Блюда */}
        <Grid container spacing={4}>
          {filtered.map(dish => (
            <Grid item xs={12} sm={6} md={4} key={dish.id}>
              <DishCard dish={dish} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Menu
