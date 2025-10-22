<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-no-repeat relative"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <div
      class="relative z-10 bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-80 text-center flex flex-col items-center"
    >
      <div class="flex flex-col items-center mb-6">
        <img :src="logo" alt="Logo" class="w-14 h-14 mb-2" />
        <h2 class="text-xl font-semibold text-[#00BFFF]">Connexion Web3</h2>
        <p class="text-sm text-white/70 mt-2">Utilise ton wallet pour te connecter</p>
      </div>

      <div class="flex flex-col gap-4 w-full">
        <!-- Connexion -->
        <button
          @click="connectWallet('login')"
          class="w-full flex items-center justify-center gap-2 border border-[#00BFFF]/40 py-2 rounded-md hover:bg-[#00BFFF]/10 transition"
        >
          <!-- Icône wallet inline -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 7.5h12.75a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 16.5 19.5H6a2.25 2.25 0 0 1-2.25-2.25V7.5z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M18 10.5h1.5a1.5 1.5 0 0 1 0 3H18v-3z" />
          </svg>
          <span>
            {{ walletAddress ? formatAddress(walletAddress) : "Se connecter avec un wallet" }}
          </span>
        </button>

        <!-- Création -->
        <button
          @click="connectWallet('register')"
          class="w-full flex items-center justify-center gap-2 border border-green-400/40 py-2 rounded-md hover:bg-green-400/10 transition"
        >
          <!-- Icône “plus” inline -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12M6 12h12" />
          </svg>
          <span>Créer un compte avec un wallet</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import logo from "../assets/logo.png"
import background from "../assets/connect.jpg"

declare global {
  interface Window { ethereum?: any }
}

const walletAddress = ref<string | null>(null)

const connectWallet = async (action: "login" | "register") => {
  try {
    if (!window.ethereum) {
      alert("MetaMask n'est pas installé. Veuillez l'ajouter à votre navigateur.")
      return
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    walletAddress.value = accounts[0]
    console.log(`Wallet ${action}:`, accounts[0])
    // TODO: call backend (login/register) avec l’adresse + éventuelle signature
  } catch (error) {
    console.error("Erreur de connexion au wallet :", error)
  }
}

const formatAddress = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4)
</script>

<style scoped>
::placeholder { color: #bbb; }
</style>
