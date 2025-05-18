// src/components/ReviewCard.jsx
import { Paper, Typography, Box } from '@mui/material'

const ReviewCard = ({ review }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: '#fffaf5',
        borderLeft: '6px solid #6d4c41',
        minHeight: 100
      }}
    >
      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
        “{review.message}”
      </Typography>
      <Box mt={1} textAlign="right">
        <Typography variant="subtitle2" color="text.secondary">
          — {review.name}
        </Typography>
      </Box>
    </Paper>
  )
}

export default ReviewCard
