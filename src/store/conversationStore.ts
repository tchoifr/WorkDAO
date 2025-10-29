import { defineStore } from 'pinia'
import axios from 'axios'
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
    error: null as string | null,
  }),

  actions: {
    // 📨 Charger la boîte de réception
    async fetchInbox(userId: string) {
      this.loading = true
      try {
        const res = await axios.get(`http://localhost:8000/api/messages/inbox/${userId}`)

        const msgs: Message[] = res.data

        // ✅ S’il n’y a aucun message, on sort tout de suite
        if (!msgs.length) {
          this.conversations = []
          return
        }

        // ✅ Regrouper par interlocuteur
        const grouped = new Map<string, ConversationPreview>()

        msgs.forEach((m) => {
          const otherUserId = m.senderId === userId ? m.receiverId : m.senderId
          const username =
            m.senderId === userId ? m.receiverWallet : m.senderWallet

          grouped.set(otherUserId, {
            otherUserId,
            username,
            lastMessage: m.content,
          })
        })

        this.conversations = Array.from(grouped.values())
      } catch (e: any) {
        console.error('❌ Erreur fetchInbox:', e)
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    // 💬 Charger une conversation précise
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
      } catch (e: any) {
        console.error('❌ Erreur fetchConversation:', e)
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    // 📨 Envoyer un message
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
  },
})
