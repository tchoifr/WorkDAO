// 📁 src/store/usersStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface User {
  id: string
  walletAddress: string | null
  username: string | null
  role: string | null
  network: string | null
  solBalance: string | null
  ethBalance: string | null
  workBalance: string | null
  createdAt: string | null
  updatedAt: string | null
}

export const UsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // 🔹 Charger tous les utilisateurs (si besoin admin)
    async fetchUsers() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get<User[]>('http://localhost:8000/api/users')
        this.users = response.data
      } catch (error: any) {
        this.error = error.message || 'Erreur lors du chargement des utilisateurs'
      } finally {
        this.loading = false
      }
    },

    // 🔹 Charger un utilisateur connecté via wallet
    async fetchUserByWallet(walletAddress: string) {
      this.loading = true
      try {
        const response = await axios.post('http://localhost:8000/api/login', { walletAddress })
        if (response.data.exists && response.data.user) {
          this.currentUser = response.data.user
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        } else {
          this.currentUser = null
        }
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
      } finally {
        this.loading = false
      }
    },

    // 🔹 Enregistrement d’un nouveau user
    async registerUser(payload: { walletAddress: string; username: string; role: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post('http://localhost:8000/api/register', payload, {
          headers: { 'Content-Type': 'application/json' },
        })
        this.currentUser = res.data.user
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        return this.currentUser
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        throw e
      } finally {
        this.loading = false
      }
    },

    // 🔹 Charger depuis le localStorage
    loadFromStorage() {
      const data = localStorage.getItem('currentUser')
      if (data) this.currentUser = JSON.parse(data)
    },

    // 🔹 Mettre à jour les infos utilisateur (par ex. username ou soldes)
    async updateUserInfo(updatedData: Partial<User>) {
      if (!this.currentUser) return

      this.loading = true
      try {
        const res = await axios.patch(
          `http://localhost:8000/api/users/${this.currentUser.id}`,
          updatedData,
          { headers: { 'Content-Type': 'application/json' } }
        )
        this.currentUser = res.data
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
      } finally {
        this.loading = false
      }
    },

    // 🔹 Déconnexion
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },
  },
})
