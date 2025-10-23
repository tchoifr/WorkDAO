// 📁 utils/messageHelpers.ts
import type { Conversation, UserRole } from "../store/conversationStore"

export const hasUnreadFor = (
  conv: Conversation,
  viewer: UserRole
): boolean => {
  if (!conv.messages.length) return false
  return conv.messages.some((msg) =>
    viewer === "freelancer" ? !msg.readByFreelancer : !msg.readByEmployer
  )
}
