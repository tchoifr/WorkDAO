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
  recruiterUsername?: string
  recruiterWalletAddress?: string

  // 🧩 Optionnel si le backend renvoie un objet "recruiter"
  recruiter?: {
    id: string
    username?: string
    walletAddress?: string
  }
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
      const userId = currentUser?.id || currentUser?.uuid
      if (!userId) return []
      return state.jobs.filter(job => job.recruiterId === userId)
    },
  },

  actions: {
    // 🟢 Récupère les jobs d’un recruteur
    async fetchRecruiterJobs() {
      this.loading = true
      this.error = null
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        const userId = currentUser?.id || currentUser?.uuid
        if (!userId) throw new Error('Utilisateur non connecté')

        const res = await axios.get<Job[]>(API_URL, { params: { userId } })
        this.jobs = res.data.map(job => ({
          ...job,
          recruiterId: job.recruiter?.id || job.recruiterId,
          recruiterUsername: job.recruiter?.username || job.recruiterUsername,
          recruiterWalletAddress: job.recruiter?.walletAddress || job.recruiterWalletAddress,
        }))
        console.log('✅ Jobs du recruteur chargés :', this.jobs)
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        console.error('❌ Erreur fetchRecruiterJobs:', e)
      } finally {
        this.loading = false
      }
    },

    // 🟣 Création d’un job (corrigée)
    async createJob(payload: CreateJobPayload): Promise<Job> {
      this.loading = true
      this.error = null
      try {
        // ✅ On ne relit plus uniquement depuis localStorage : on fait confiance au payload
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

        const recruiterId =
          payload.recruiterId ||
          currentUser?.id ||
          currentUser?.uuid

        if (!recruiterId) {
          throw new Error('Impossible de créer le job : recruteur non connecté')
        }

        const finalPayload = {
          ...payload,
          recruiterId,
        }

        console.log('📤 Envoi au backend:', finalPayload)

        const res = await axios.post<Job>(
          API_URL,
          finalPayload,
          { headers: { 'Content-Type': 'application/json' } }
        )

        const newJob: Job = {
          ...res.data,
          recruiterId: (res.data as any).recruiter?.id || (res.data as any).recruiterId,
          recruiterUsername: (res.data as any).recruiter?.username || (res.data as any).recruiterUsername,
          recruiterWalletAddress: (res.data as any).recruiter?.walletAddress || (res.data as any).recruiterWalletAddress,
        }

        this.jobs.push(newJob)
        console.log('✅ Job ajouté au store :', newJob)
        return newJob
      } catch (e: any) {
        this.error = e.response?.data?.error || e.message
        console.error('❌ Erreur createJob:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    // 🟡 Mise à jour du statut
    async updateJobStatus(id: string, newStatus: string): Promise<Job> {
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

    // 🔴 Suppression
    async deleteJob(id: string): Promise<void> {
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
  },
})
