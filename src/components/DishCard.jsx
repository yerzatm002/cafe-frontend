// src/components/DishCard.jsx
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material'

const DishCard = ({ dish }) => {
  return (
    <Card
      sx={{
        maxWidth: 360,
        mx: 'auto',
        backgroundColor: '#fffaf5',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        borderRadius: 3,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.03)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={dish.imageUrl}
        alt={dish.name}
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
        >
          {dish.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#5d4037', minHeight: 48 }}>
          {dish.description}
        </Typography>
        <Box mt={2} fontWeight={600} color="#8d6e63">
          {dish.price.toLocaleString()} ₸
        </Box>
      </CardContent>
    </Card>
  )
}

export default DishCard
