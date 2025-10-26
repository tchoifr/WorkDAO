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
    loading: false as boolean,
    error: null as string | null
  }),

  actions: {
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
    }
  },

  getters: {
    getAdmins: (state) => state.users.filter(u => u.role === 'admin'),
    getFreelances: (state) => state.users.filter(u => u.role === 'freelance'),
    getEmployeurs: (state) => state.users.filter(u => u.role === 'employeur'),
    getDaos: (state) => state.users.filter(u => u.role === 'DAO')
  }
})
