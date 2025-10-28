// 📁 src/store/usersStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface User {
  id: string
  walletAddress: string | null
  username: string | null
  roles: string[] 
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
    // 🟦 Récupérer tous les utilisateurs (admin)
    async fetchUsers() {
      this.loading = true
      try {
        const res = await axios.get<User[]>('http://localhost:8000/api/users')
        this.users = res.data
      } catch (e: any) {
        this.error = e.message || 'Erreur lors du chargement des utilisateurs'
      } finally {
        this.loading = false
      }
    },

    // 🟨 Vérifier si un wallet existe (connexion)
    async fetchUserByWallet(walletAddress: string) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post('http://localhost:8000/api/login', { walletAddress })
        if (res.data.exists && res.data.user) {
          this.currentUser = res.data.user
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
          return this.currentUser
        }
        return null
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        return null
      } finally {
        this.loading = false
      }
    },

    // 🟩 Créer un utilisateur (inscription)
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
        console.error('❌ Erreur registerUser:', e)
        this.error = e.response?.data?.error || e.message
        return null
      } finally {
        this.loading = false
      }
    },

    // 🟧 Charger le user depuis le localStorage
    loadFromStorage() {
      const data = localStorage.getItem('currentUser')
      if (data) this.currentUser = JSON.parse(data)
    },

    // 🟪 Mettre à jour un utilisateur existant
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

    // 🟥 Déconnexion
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },
  },
})
