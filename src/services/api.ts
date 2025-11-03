// src/services/api.ts
import axios from 'axios'

// Utilise une variable d'environnement pour basculer entre local et prod
// Normalise l'URL: ajoute le schéma si manquant et retire le slash final
const rawBase = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_BASE_URL = (
  rawBase.startsWith('http://') || rawBase.startsWith('https://')
    ? rawBase
    : `https://${rawBase}`
).replace(/\/+$/, '')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

export default api
