// src/services/api.js

const API_BASE = 'https://cafe-backend-bf76.onrender.com/api'  // заменить при деплое

// ===== Universal fetcher =====
const fetchAPI = async (path, options = {}) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Ошибка запроса')
  return data
}

// ============ 🔐 АВТОРИЗАЦИЯ ============

export const login = async (email, password) => {
  const res = await fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  localStorage.setItem('token', res.token)
  return res
}

// ============ 📋 МЕНЮ ============

export const getMenu = () => fetchAPI('/menu')

export const addDish = (dish) => fetchAPI('/menu', {
  method: 'POST',
  body: JSON.stringify(dish)
})

export const deleteDish = (id) => fetchAPI(`/menu/${id}`, {
  method: 'DELETE'
})

// ============ 🗣 ОТЗЫВЫ ============

export const getReviews = () => fetchAPI('/review')

export const addReview = (review) => fetchAPI('/review', {
  method: 'POST',
  body: JSON.stringify(review)
})

export const deleteReview = (id) => fetchAPI(`/review/${id}`, {
  method: 'DELETE'
})

// ============ 📅 БРОНИРОВАНИЕ ============

export const createReservation = (data) => fetchAPI('/reservation', {
  method: 'POST',
  body: JSON.stringify(data)
})

export const getReservations = () => fetchAPI('/reservation')
