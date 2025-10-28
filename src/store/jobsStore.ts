import { defineStore } from 'pinia'
import axios from 'axios'

// 🔹 Interface Job (mappée sur ton backend Symfony)
export interface Job {
  id: string
  title: string
  description: string
  category?: string | null
  duration?: string | null
  skills?: string[] | null
  budget: string
  currency: string
  status: string
  createdAt: string
  updatedAt?: string | null
  recruiterId: string
  recruiterUsername: string
  recruiterWalletAddress?: string
}

// 🔹 Interface de création
export interface CreateJobPayload {
  recruiterId: string
  title: string
  description: string
  category?: string
  duration?: string
  skills?: string[]
  budget: string
  currency: string
  status: string
}

// 🌐 URL de ton API Symfony
const API_URL = 'http://localhost:8000/api/jobs'

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [] as Job[],
    loading: false as boolean,
    error: null as string | null,
  }),

  getters: {
    // 🔹 Récupérer uniquement les jobs du recruteur connecté
    recruiterJobs: (state) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
      if (!currentUser?.id) return []
      return state.jobs.filter((job) => job.recruiterId === currentUser.id)
    },
  },

  actions: {
    // 🟢 Récupération de tous les jobs
    async fetchJobs() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get<Job[]>(API_URL)
        this.jobs = res.data
      } catch (e: any) {
        this.error = e.message
        console.error('❌ Erreur fetchJobs:', e)
      } finally {
        this.loading = false
      }
    },

    // 🟣 Création d’un job
    async createJob(payload: CreateJobPayload) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.post<Job>(API_URL, payload, {
          headers: { 'Content-Type': 'application/json' },
        })
        this.jobs.push(res.data)
        console.log('✅ Job ajouté au store :', res.data)
        return res.data
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        console.error('❌ Erreur createJob:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    // 🟡 Mise à jour du statut
    async updateJobStatus(id: string, newStatus: string) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.patch<Job>(
          `${API_URL}/${id}`,
          { status: newStatus },
          { headers: { 'Content-Type': 'application/json' } }
        )

        // ✅ Met à jour dans le store
        const index = this.jobs.findIndex((job) => job.id === id)
        if (index !== -1) {
          this.jobs[index] = { ...this.jobs[index], status: res.data.status }
        }

        console.log(`✅ Statut du job ${id} mis à jour en "${newStatus}"`)
        return res.data
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        console.error('❌ Erreur updateJobStatus:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    // 🔴 Suppression d’un job
    async deleteJob(id: string) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`${API_URL}/${id}`)
        this.jobs = this.jobs.filter((job) => job.id !== id)
        console.log(`🗑️ Job ${id} supprimé avec succès`)
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        console.error('❌ Erreur deleteJob:', e)
      } finally {
        this.loading = false
      }
    },

    // 🔵 Charger uniquement les jobs du recruteur connecté
    async fetchRecruiterJobs() {
      this.loading = true
      this.error = null

      try {
        // ✅ Récupération du user depuis localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        if (!currentUser?.id) throw new Error('Utilisateur non connecté')

        // ✅ Le backend Symfony attend le paramètre ?userId=
        const res = await axios.get<Job[]>(API_URL, {
          params: { userId: currentUser.id },
        })

        this.jobs = res.data
        console.log('✅ Jobs du recruteur chargés :', res.data)
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        console.error('❌ Erreur fetchRecruiterJobs:', e)
      } finally {
        this.loading = false
      }
    },
  },
})
