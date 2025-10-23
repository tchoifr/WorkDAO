// 📁 store/conversationStore.ts
import { ref } from "vue"

export type UserRole = "freelancer" | "employer"

export interface Message {
  from: UserRole
  text: string
  time: string
  readByFreelancer: boolean
  readByEmployer: boolean
}

export interface Conversation {
  id: number
  freelancer: string
  company: string
  project: string
  active: boolean
  messages: Message[]
}

export const conversations = ref<Conversation[]>([
  {
    id: 1,
    freelancer: "Emma Laurent",
    company: "DevCorp Agency",
    project: "Refonte Dashboard Web3",
    active: true,
    messages: [
      {
        from: "employer",
        text: "Bonjour Emma 👋, disponible pour un call ?",
        time: "Il y a 2h",
        readByFreelancer: false,
        readByEmployer: true,
      },
    ],
  },
  {
    id: 2,
    freelancer: "Noah Dupuis",
    company: "DAO Collective",
    project: "Audit Smart Contract DAO",
    active: false,
    messages: [
      {
        from: "employer",
        text: "Votre proposition est en cours d’examen.",
        time: "Hier",
        readByFreelancer: true,
        readByEmployer: true,
      },
    ],
  },
])

export const activeConversationId = ref<number | null>(null)

/**
 * Ouvre une conversation et marque les messages comme lus pour le viewer
 */
export const openConversation = (id: number, viewer: UserRole): void => {
  activeConversationId.value = id
  const conv = conversations.value.find((c) => c.id === id)
  if (conv) {
    conv.messages.forEach((m) => {
      if (viewer === "freelancer") m.readByFreelancer = true
      else m.readByEmployer = true
    })
  }
}

export const closeConversation = (): void => {
  activeConversationId.value = null
}

/**
 * Active / désactive une conversation
 */
export const toggleActivation = (id: number): void => {
  const conv = conversations.value.find((c) => c.id === id)
  if (conv) conv.active = !conv.active
}

/**
 * Ajoute un nouveau message à une conversation
 */
export const addMessage = (id: number, from: UserRole, text: string): void => {
  const conv = conversations.value.find((c) => c.id === id)
  if (!conv) return

  conv.messages.push({
    from,
    text,
    time: "À l’instant",
    readByFreelancer: from === "freelancer",
    readByEmployer: from === "employer",
  })
}
