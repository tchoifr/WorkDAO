import { defineStore } from 'pinia'
import api from '../services/api' 
import { UsersStore } from './usersStore'

export interface Message {
  id: string
  senderId: string
  receiverId: string
  senderWallet: string
  receiverWallet: string
  content: string
  isRead: boolean
  createdAt: string
}

export interface ConversationPreview {
  otherUserId: string
  username: string
  lastMessage: string
}

export const useConversationStore = defineStore('conversationStore', {
  state: () => ({
    loading: false,
    messages: [] as Message[],
    conversations: [] as ConversationPreview[],
    unreadCount: 0 as number,
    error: null as string | null,
  }),

  actions: {
    async fetchInbox(userId: string) {
      this.loading = true
      try {
        const res = await api.get(`/api/messages/inbox/${userId}`)
        const msgs: Message[] = res.data

        if (!msgs.length) {
          this.conversations = []
          this.unreadCount = 0
          return
        }

        const grouped = new Map<string, ConversationPreview>()

        for (const m of msgs) {
          const otherUserId = m.senderId === userId ? m.receiverId : m.senderId

          if (!grouped.has(otherUserId)) {
            let username = ''

            try {
              const userRes = await api.get(`/api/users/${otherUserId}`)
              username = userRes.data.username
            } catch (err) {
              console.warn(`⚠️ Impossible de récupérer le username pour ${otherUserId}`)
              username = m.senderId === userId ? m.receiverWallet : m.senderWallet
            }

            grouped.set(otherUserId, {
              otherUserId,
              username,
              lastMessage: m.content,
            })
          }
        }

        this.conversations = Array.from(grouped.values())

        await this.fetchUnreadCount(userId)
      } catch (e: any) {
        console.error('❌ Erreur fetchInbox:', e)
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async fetchConversation(otherUserId: string) {
      const usersStore = UsersStore()
      const currentUser = usersStore.currentUser
      if (!currentUser?.id) return

      this.loading = true
      try {
        const res = await api.get(
          `/api/messages/conversation/${currentUser.id}/${otherUserId}`
        )
        this.messages = res.data

        await this.fetchUnreadCount(currentUser.id)
      } catch (e: any) {
        console.error('❌ Erreur fetchConversation:', e)
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async sendMessage(receiverId: string, content: string) {
      const usersStore = UsersStore()
      const currentUser = usersStore.currentUser
      if (!currentUser?.id) return

      try {
        const res = await api.post('/api/messages/send', {
          senderId: currentUser.id,
          receiverId,
          content,
        })

        this.messages.push(res.data)
      } catch (e: any) {
        console.error('❌ Erreur sendMessage:', e)
        this.error = e.message
      }
    },

    async fetchUnreadCount(userId: string) {
      try {
        const res = await api.get(`/api/messages/unread/${userId}`)
        this.unreadCount = res.data.unreadCount ?? 0
        console.log('🔔 Messages non lus:', this.unreadCount)
      } catch (e: any) {
        console.error('❌ Erreur fetchUnreadCount:', e)
        this.unreadCount = 0
      }
    },
  },
})
