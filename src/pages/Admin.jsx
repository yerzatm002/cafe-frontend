// src/pages/Admin.jsx
import {
  Container, Typography, Divider, Box, Button, Grid, Paper, List,
  ListItem, ListItemText, ListSubheader, Accordion, AccordionSummary,
  AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState, useEffect } from 'react'
import {
  getMenu, addDish, deleteDish,
  getReviews, deleteReview,
  getReservations
} from '../services/api'

const Admin = () => {
  const [menu, setMenu] = useState([])
  const [reviews, setReviews] = useState([])
  const [reservations, setReservations] = useState([])

  const [openDialog, setOpenDialog] = useState(false)
  const [newDish, setNewDish] = useState({ name: '', description: '', price: '' })

  // 🧠 Загрузка данных
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      window.location.href = '/admin/login'
      return
    }
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [menuData, reviewData, resData] = await Promise.all([
        getMenu(),
        getReviews(),
        getReservations()
      ])
      setMenu(menuData)
      setReviews(reviewData)
      setReservations(resData)
    } catch (err) {
      console.error('Ошибка загрузки данных:', err.message)
    }
  }

  const handleDeleteDish = async (id) => {
    try {
      await deleteDish(id)
      setMenu(menu.filter(d => d.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id)
      setReviews(reviews.filter(r => r.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  const handleAddDish = async () => {
    try {
      const created = await addDish({
        ...newDish,
        price: parseInt(newDish.price)
      })
      setMenu([created, ...menu])
      setNewDish({ name: '', description: '', price: '' })
      setOpenDialog(false)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <Box sx={{ backgroundColor: '#fffdf7', py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#3e2723' }}
        >
          Панель администратора
        </Typography>

        <Divider sx={{ my: 4, bgcolor: '#6d4c41' }} />

        {/* Меню секция */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="#4e342e">📋 Меню блюд</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={2}>
              <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ backgroundColor: '#6d4c41' }}>
                Добавить блюдо
              </Button>
            </Box>
            <Grid container spacing={3}>
              {menu.map(dish => (
                <Grid item xs={12} sm={6} md={4} key={dish.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      backgroundColor: '#fffaf5',
                      borderLeft: '5px solid #6d4c41',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>{dish.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#5d4037', minHeight: 48 }}>
                      {dish.description}
                    </Typography>
                    <Typography variant="subtitle1" mt={1}>{dish.price} ₸</Typography>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => handleDeleteDish(dish.id)}
                      sx={{ mt: 1 }}
                    >
                      Удалить
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Отзывы */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="#4e342e">🗣 Отзывы</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List sx={{ bgcolor: '#fffaf5', borderRadius: 2 }}>
              {reviews.map((review) => (
                <ListItem
                  key={review.id}
                  divider
                  secondaryAction={
                    <Button color="error" size="small" onClick={() => handleDeleteReview(review.id)}>
                      Удалить
                    </Button>
                  }
                >
                  <ListItemText primary={review.name} secondary={review.message} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Бронирования */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="#4e342e">📅 Бронирования</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ bgcolor: '#fffaf5', borderRadius: 2 }}
              subheader={
                <ListSubheader component="div" sx={{ bgcolor: '#fffaf5', color: '#5d4037' }}>
                  Последние заявки
                </ListSubheader>
              }
            >
              {reservations.map((r) => (
                <ListItem key={r.id} divider>
                  <ListItemText
                    primary={`${r.name} (${r.peopleCount} гостей) — ${r.date} ${r.time}`}
                    secondary={`${r.phone} | ${r.email}`}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Dialog: Добавить блюдо */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Добавить новое блюдо</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus fullWidth label="Название"
              sx={{ my: 1 }} value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            />
            <TextField
              fullWidth label="Описание"
              sx={{ my: 1 }} value={newDish.description}
              onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
            />
            <TextField
              fullWidth label="Цена"
              type="number"
              sx={{ my: 1 }} value={newDish.price}
              onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
            <Button variant="contained" onClick={handleAddDish}>Сохранить</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export default Admin
