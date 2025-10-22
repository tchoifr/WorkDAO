<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-no-repeat relative"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <!-- Login Card -->
    <div
      class="relative z-10 bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-80 text-center flex flex-col items-center"
    >
      <!-- Logo + Header -->
      <div class="flex flex-col items-center mb-6">
        <img :src="logo" alt="Logo" class="w-14 h-14 mb-2" />
        <h2 class="text-xl font-semibold text-[#00BFFF]">
          {{ texts.title }}
        </h2>
        <p class="text-sm text-white/70 mt-2">
          {{ texts.subtitle }}
        </p>
      </div>

      <!-- Bouton de connexion -->
      <button
        @click="connectWallet"
        class="w-full flex items-center justify-center gap-2 border border-[#00BFFF]/40 py-2 rounded-md hover:bg-[#00BFFF]/10 transition"
      >
        <!-- Icône universelle wallet -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
             stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 7.5h12.75a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 16.5 19.5H6a2.25 2.25 0 0 1-2.25-2.25V7.5z" />
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M18 10.5h1.5a1.5 1.5 0 0 1 0 3H18v-3z" />
        </svg>
        <span>
          {{ walletAddress ? formatAddress(walletAddress) : texts.walletButton }}
        </span>
      </button>

      <!-- Aucun wallet détecté -->
      <div
        v-if="showNoWallet"
        class="mt-6 text-sm text-center text-white/80 space-y-2"
      >
        <p>{{ texts.noWallet }}</p>
        <p class="text-[#00BFFF]">{{ texts.installWallet }}</p>
        <div class="flex justify-center gap-4 mt-2">
          <a
            href="https://metamask.io/download/"
            target="_blank"
            class="text-[#E2761B] hover:underline"
          >MetaMask</a>
          <span class="text-white/50">•</span>
          <a
            href="https://phantom.app/download"
            target="_blank"
            class="text-purple-400 hover:underline"
          >Phantom</a>
        </div>
      </div>

      <!-- Adresse connectée -->
      <p v-if="walletAddress" class="text-sm text-[#00BFFF] mt-4">
        ✅ {{ texts.connected }} {{ formatAddress(walletAddress) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import logo from "../assets/logo.png"
import background from "../assets/connect.jpg"
import { useLanguage } from "../store/useLanguage"
import { loginTextsEn } from "../variables/pages/en/login"
import { loginTextsFr } from "../variables/pages/fr/login"

declare global {
  interface Window {
    ethereum?: any
    solana?: any
  }
}

const { currentLang } = useLanguage()

// ✅ Texte dynamique selon la langue
const texts = computed(() =>
  currentLang.value === "en" ? loginTextsEn.texts : loginTextsFr.texts
)

const walletAddress = ref<string | null>(null)
const showNoWallet = ref(false)

/**
 * Détection et connexion (MetaMask ou Phantom)
 */
const connectWallet = async () => {
  showNoWallet.value = false

  const hasMetaMask = window.ethereum && window.ethereum.isMetaMask
  const hasPhantom = window.solana && window.solana.isPhantom

  if (!hasMetaMask && !hasPhantom) {
    showNoWallet.value = true
    return
  }

  try {
    if (hasMetaMask) {
      await connectMetaMask()
    } else if (hasPhantom) {
      await connectPhantom()
    }
  } catch (error) {
    console.error("Erreur connexion wallet :", error)
  }
}

/**
 * 🔹 Connexion MetaMask
 */
const connectMetaMask = async () => {
  const provider = window.ethereum
  const accounts = await provider.request({ method: "eth_requestAccounts" })
  const address = accounts[0]
  walletAddress.value = address

  const message = `Connexion à WorkDAO via MetaMask - ${new Date().toISOString()}`
  const signature = await provider.request({
    method: "personal_sign",
    params: [message, address]
  })

  console.log("✅ MetaMask connecté :", address)
  console.log("🖋️ Signature :", signature)
}

/**
 * 🔹 Connexion Phantom
 */
const connectPhantom = async () => {
  const provider = window.solana
  const resp = await provider.connect()
  walletAddress.value = resp.publicKey.toString()

  const message = `Connexion à WorkDAO via Phantom - ${new Date().toISOString()}`
  const encodedMessage = new TextEncoder().encode(message)
  const signedMessage = await provider.signMessage(encodedMessage, "utf8")

  console.log("✅ Phantom connecté :", walletAddress.value)
  console.log("🖋️ Signature :", signedMessage)
}

const formatAddress = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4)
</script>

<style scoped>
::placeholder {
  color: #bbb;
}
</style>
