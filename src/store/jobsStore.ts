import { defineStore } from 'pinia'
import axios from 'axios'

// 🔹 Interface Job
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

// 🔹 Interface pour la création
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
    recruiterJobs(state) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
      const userUuid = currentUser?.uuid
      if (!userUuid) return []
      return state.jobs.filter(job => job.recruiterId === userUuid)
    },
  },

  actions: {
    // 🟢 Récupère tous les jobs
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

    // 🟣 Crée un nouveau job
    async createJob(payload: CreateJobPayload) {
      this.loading = true
      this.error = null
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        const recruiterId = currentUser?.uuid

        if (!recruiterId) throw new Error("Impossible de créer le job : recruteur non connecté")

        const res = await axios.post<Job>(API_URL, { ...payload, recruiterId }, {
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

    // 🟡 Met à jour un job
    async updateJobStatus(id: string, newStatus: string) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.patch<Job>(
          `${API_URL}/${id}`,
          { status: newStatus },
          { headers: { 'Content-Type': 'application/json' } }
        )
        const index = this.jobs.findIndex(job => job.id === id)
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

    // 🔴 Supprime un job
    async deleteJob(id: string) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`${API_URL}/${id}`)
        this.jobs = this.jobs.filter(job => job.id !== id)
        console.log(`🗑️ Job ${id} supprimé avec succès`)
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        console.error('❌ Erreur deleteJob:', e)
      } finally {
        this.loading = false
      }
    },

    // 🔵 Récupère uniquement les jobs du recruteur connecté
    async fetchRecruiterJobs() {
      this.loading = true
      this.error = null

      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        const userUuid = currentUser?.uuid

        if (!userUuid) throw new Error('Utilisateur non connecté (UUID manquant dans localStorage)')

        console.log(`📡 Chargement des jobs du recruteur UUID=${userUuid}`)

        const res = await axios.get<Job[]>(API_URL, {
          params: { userId: userUuid },
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
