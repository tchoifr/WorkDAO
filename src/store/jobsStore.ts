import { defineStore } from 'pinia'
import api from '@/services/api'

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

  recruiter?: {
    id: string
    username?: string
    walletAddress?: string
  }
}

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
    async fetchRecruiterJobs() {
      this.loading = true
      this.error = null
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        const userId = currentUser?.id || currentUser?.uuid
        if (!userId) throw new Error('Utilisateur non connecté')

        const res = await api.get<Job[]>('/api/jobs', { params: { userId } })
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

    async createJob(payload: CreateJobPayload): Promise<Job> {
      this.loading = true
      this.error = null
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        const recruiterId = payload.recruiterId || currentUser?.id || currentUser?.uuid
        if (!recruiterId) throw new Error('Impossible de créer le job : recruteur non connecté')

        const finalPayload = { ...payload, recruiterId }

        console.log('📤 Envoi au backend:', finalPayload)

        const res = await api.post<Job>('/api/jobs', finalPayload)

        const newJob: Job = {
          ...res.data,
          recruiterId: res.data.recruiter?.id || res.data.recruiterId,
          recruiterUsername: res.data.recruiter?.username || res.data.recruiterUsername,
          recruiterWalletAddress: res.data.recruiter?.walletAddress || res.data.recruiterWalletAddress,
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

    async updateJobStatus(id: string, newStatus: string): Promise<Job> {
      this.loading = true
      this.error = null
      try {
        const res = await api.patch<Job>(`/api/jobs/${id}`, { status: newStatus })

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

    async deleteJob(id: string): Promise<void> {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/api/jobs/${id}`)
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
