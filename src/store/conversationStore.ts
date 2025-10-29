import { defineStore } from 'pinia'
import axios from 'axios'
import { UsersStore } from './usersStore'

/* -------------------------- Types -------------------------- */
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

/* -------------------------- Store -------------------------- */
export const useConversationStore = defineStore('conversationStore', {
  state: () => ({
    loading: false,
    messages: [] as Message[],
    conversations: [] as ConversationPreview[],
    unreadCount: 0 as number, // 🔔 compteur de messages non lus
    error: null as string | null,
  }),

  actions: {
    /* 📥 Charger la boîte de réception */
    async fetchInbox(userId: string) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:8000/api/messages/inbox/${userId}`)
        const msgs: Message[] = res.data

        if (!msgs.length) {
          this.conversations = []
          this.unreadCount = 0
          return
        }

        const grouped = new Map<string, ConversationPreview>()

        for (const m of msgs) {
          const otherUserId = m.senderId === userId ? m.receiverId : m.senderId

          // éviter de redemander un username déjà récupéré
          if (!grouped.has(otherUserId)) {
            let username = ''

            try {
              const userRes = await axios.get(`http://localhost:8000/api/users/${otherUserId}`)
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

        // 🔔 Met à jour le compteur de messages non lus
        await this.fetchUnreadCount(userId)
      } catch (e: any) {
        console.error('❌ Erreur fetchInbox:', e)
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    /* 💬 Charger une conversation précise */
    async fetchConversation(otherUserId: string) {
      const usersStore = UsersStore()
      const currentUser = usersStore.currentUser
      if (!currentUser?.id) return

      this.loading = true
      try {
        const res = await axios.get(
          `http://localhost:8000/api/messages/conversation/${currentUser.id}/${otherUserId}`
        )
        this.messages = res.data

        // 🔄 Après lecture, on met à jour le compteur
        await this.fetchUnreadCount(currentUser.id)
      } catch (e: any) {
        console.error('❌ Erreur fetchConversation:', e)
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    /* 📨 Envoyer un message */
    async sendMessage(receiverId: string, content: string) {
      const usersStore = UsersStore()
      const currentUser = usersStore.currentUser
      if (!currentUser?.id) return

      try {
        const res = await axios.post('http://localhost:8000/api/messages/send', {
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

    /* 🔔 Récupérer le nombre de messages non lus */
    async fetchUnreadCount(userId: string) {
      try {
        const res = await axios.get(`http://localhost:8000/api/messages/unread/${userId}`)
        this.unreadCount = res.data.unreadCount ?? 0
        console.log('🔔 Messages non lus:', this.unreadCount)
      } catch (e: any) {
        console.error('❌ Erreur fetchUnreadCount:', e)
        this.unreadCount = 0
      }
    },
  },
})
