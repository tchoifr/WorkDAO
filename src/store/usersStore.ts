import { defineStore } from 'pinia'
import axios from 'axios'

export interface User {
  id: string
  uuid?: string
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

    // 🟨 Connexion via wallet
    async fetchUserByWallet(walletAddress: string) {
      this.loading = true
      this.error = null
      try {
        const normalizedWallet = walletAddress.trim().toLowerCase()
        const res = await axios.post('http://localhost:8000/api/login', {
          walletAddress: normalizedWallet,
        })

        if (res.data.exists && res.data.user) {
          const user = res.data.user

          // 🧠 Corrige : mappe uuid → id
          this.currentUser = {
            ...user,
            id: user.uuid || user.id,
          }

          localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
          return this.currentUser
        }

        return null
      } catch (e: any) {
        console.error('Erreur login:', e.response?.data || e.message)
        this.error = e.response?.data?.error || e.message
        return null
      } finally {
        this.loading = false
      }
    },

    // 🟩 Inscription (création d’un nouvel utilisateur)
    async registerUser(payload: { walletAddress: string; username: string; role: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post('http://localhost:8000/api/register', payload, {
          headers: { 'Content-Type': 'application/json' },
        })

        const user = res.data.user || res.data

        this.currentUser = {
          ...user,
          id: user.uuid || user.id,
        }

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

    // 🟧 Charger l’utilisateur depuis le localStorage
    loadFromStorage() {
      const data = localStorage.getItem('currentUser')
      if (data) {
        const user = JSON.parse(data)

        // 🧩 Ajout du patch rétroactif pour anciens comptes
        this.currentUser = {
          ...user,
          id: user.id || user.uuid,
        }
      }
    },

    async updateUserInfo(updatedData: Partial<User>) {
      if (!this.currentUser) return
      this.loading = true
      try {
        const res = await axios.patch(
          `http://localhost:8000/api/users/${this.currentUser.id}`,
          updatedData,
          { headers: { 'Content-Type': 'application/json' } }
        )

        const user = res.data.user || res.data
        this.currentUser = {
          ...user,
          id: user.uuid || user.id,
        }

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },
  },
})
