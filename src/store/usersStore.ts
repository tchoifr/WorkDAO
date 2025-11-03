import { defineStore } from 'pinia'
import api from '@/services/api'

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
        const res = await api.get<User[]>('/api/users')
        this.users = res.data
      } catch (e: any) {
        this.error = e.message || 'Erreur lors du chargement des utilisateurs'
      } finally {
        this.loading = false
      }
    },

    async fetchUserByWallet(walletAddress: string) {
      this.loading = true
      this.error = null
      try {
        const normalizedWallet = walletAddress.trim().toLowerCase()
        const res = await api.post('/api/login', {
          walletAddress: normalizedWallet,
        })

        if (res.data.exists && res.data.user) {
          const user = res.data.user
          this.currentUser = { ...user, id: user.uuid || user.id }
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

    async registerUser(payload: { walletAddress: string; username: string; role: string }) {
      this.loading = true
      this.error = null
      try {
        const res = await api.post('/api/register', payload)
        const user = res.data.user || res.data
        this.currentUser = { ...user, id: user.uuid || user.id }
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

    async updateUserInfo(updatedData: Partial<User>) {
      if (!this.currentUser) return
      this.loading = true
      try {
        const res = await api.patch(`/api/users/${this.currentUser.id}`, updatedData)
        const user = res.data.user || res.data
        this.currentUser = { ...user, id: user.uuid || user.id }
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
      } finally {
        this.loading = false
      }
    },

    loadFromStorage() {
      const data = localStorage.getItem('currentUser')
      if (data) {
        const user = JSON.parse(data)
        this.currentUser = { ...user, id: user.id || user.uuid }
      }
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    },
  },
})
