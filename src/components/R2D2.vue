<template>
  <div class="r2d2-container">
    <div class="r2d2" @click="toggleDialog">
      <img :src="R2D2Image" alt="R2D2 Assistant" class="r2d2-img" />
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="dialog-box">
        <header class="dialog-header">
          <span>🤖 R2D2 Assistant</span>
          <button @click="toggleDialog">×</button>
        </header>

        <div class="dialog-body">
          <div v-for="(msg, i) in messages" :key="i" :class="msg.sender">
            <p v-html="msg.text"></p>
          </div>
        </div>

        <footer class="dialog-footer">
          <input
            v-model="userInput"
            type="text"
            placeholder="Posez une question sur WorkDAO..."
            @keyup.enter="sendQuestion"
          />
        </footer>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useWorkStore } from "../store/useWorkStore"
import R2D2Image from "../assets/r2d2.png"

const work = useWorkStore()
const isOpen = ref(false)
const userInput = ref("")
const messages = ref<{ sender: string; text: string }[]>([])

function toggleDialog() {
  isOpen.value = !isOpen.value
  if (isOpen.value && messages.value.length === 0) {
    messages.value.push({
      sender: "bot",
      text: "Bonjour 👋, je suis <b>R2D2</b>, ton assistant WorkDAO. Pose-moi une question sur le DAO, le staking, ou la gouvernance !",
    })
  }
}

function sendQuestion() {
  const q = userInput.value.trim()
  if (!q) return

  messages.value.push({ sender: "user", text: q })

  const answer = work.askR2D2(q)
  messages.value.push({ sender: "bot", text: answer })

  userInput.value = ""
}
</script>

<style scoped>
/* 🔹 Position du robot */
.r2d2-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

/* 🔹 Image du robot avec halo néon */
.r2d2-img {
  width: 90px;
  transition: transform 0.2s ease, filter 0.3s ease;
  animation: glowPulse 3s infinite ease-in-out;
  filter: drop-shadow(0 0 10px #00bfff)
          drop-shadow(0 0 25px #00bfff)
          drop-shadow(0 0 45px rgba(0, 191, 255, 0.8));
}

.r2d2-img:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 25px #00bfff)
          drop-shadow(0 0 45px #00bfff)
          drop-shadow(0 0 70px rgba(0, 191, 255, 1));
}


/* 🔹 Effet de respiration lumineuse */
@keyframes glowPulse {
  0%, 100% {
    filter: drop-shadow(0 0 10px #00bfff)
            drop-shadow(0 0 25px #00bfff)
            drop-shadow(0 0 40px rgba(0,191,255,0.8));
  }
  50% {
    filter: drop-shadow(0 0 25px #00bfff)
            drop-shadow(0 0 45px rgba(0,191,255,1));
  }
}

/* 🔹 Animation de la plateforme */
@keyframes platformPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
    box-shadow:
      0 0 20px rgba(0, 191, 255, 0.8),
      0 0 40px rgba(0, 191, 255, 0.6);
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
    box-shadow:
      0 0 40px rgba(0, 191, 255, 1),
      0 0 70px rgba(0, 191, 255, 0.8);
  }
}

/* 🔹 Boîte de dialogue du bot */
.dialog-box {
  position: absolute;
  bottom: 130px;
  right: 0;
  width: 320px;
  background: rgba(3, 29, 40, 0.95);
  border: 1px solid #00bfff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: white;
}

/* 🔹 Header */
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #031d28;
  border-bottom: 1px solid #00bfff;
  font-weight: bold;
}
.dialog-header span {
  color: #00bfff;
}
.dialog-header button {
  background: transparent;
  border: none;
  color: #00bfff;
  font-size: 1.3rem;
  cursor: pointer;
}

/* 🔹 Corps du message */
.dialog-body {
  padding: 10px;
  font-size: 0.9rem;
  max-height: 240px;
  overflow-y: auto;
}

/* 🔹 Messages */
.user {
  text-align: right;
  margin: 6px 0;
}
.user p {
  background: #00bfff;
  color: #000;
  display: inline-block;
  padding: 6px 10px;
  border-radius: 10px 10px 0 10px;
}
.bot {
  text-align: left;
  margin: 6px 0;
}
.bot p {
  background: #0a2431;
  border: 1px solid #00bfff;
  display: inline-block;
  padding: 6px 10px;
  border-radius: 10px 10px 10px 0;
}

/* 🔹 Zone de saisie */
.dialog-footer {
  border-top: 1px solid #00bfff;
  padding: 8px;
}
.dialog-footer input {
  width: 100%;
  padding: 6px;
  border-radius: 6px;
  background: #0a2431;
  border: 1px solid #00bfff;
  color: white;
  font-size: 0.9rem;
}
.dialog-footer input:focus {
  box-shadow: 0 0 6px #00bfff;
  outline: none;
}

/* 🔹 Animation de fade pour la boîte */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
