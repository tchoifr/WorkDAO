// src/services/api.ts
import axios from 'axios'

// Utilise une variable d'environnement pour basculer entre local et prod
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
