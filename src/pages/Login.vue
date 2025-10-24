<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-no-repeat relative"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    <!-- Carte principale -->
    <div
      class="relative z-10 bg-white/10 backdrop-blur-md 
         shadow-[0_0_25px_#00BFFF80] hover:shadow-[0_0_40px_#00BFFF]
         transition-all duration-500 rounded-3xl 
         p-6 sm:p-8 md:p-10 lg:p-12 
         w-[90%] sm:w-[85%] md:w-[80%] lg:max-w-[60rem] 
         h-auto md:h-[38rem] 
         mx-auto flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <!-- Logo + Texte -->
      <div class="flex flex-col items-center mb-8">
        <img
          :src="logo"
          alt="Logo WorkDAO"
          class="w-32 h-32 mb-6 drop-shadow-[0_0_20px_#00BFFF]"
        />
        <h2 class="text-3xl font-extrabold text-[#00BFFF] drop-shadow-[0_0_10px_#00BFFF]">
          {{ showCreateForm ? "Créer un compte" : texts.title }}
        </h2>
        <p class="text-lg text-white/80 mt-3 max-w-2xl leading-relaxed">
          {{
            showCreateForm
              ? "Entrez vos informations et connectez votre wallet pour continuer."
              : texts.subtitle
          }}
        </p>
      </div>

      <!-- Bouton Connecter Wallet -->
      <button
        v-if="!showCreateForm"
        @click="connectWallet"
        class="w-full max-w-md flex items-center justify-center gap-3 border border-[#00BFFF]/50 py-3 rounded-lg
               hover:bg-[#00BFFF]/20 hover:scale-105 transition-all duration-300 text-lg font-medium shadow-[0_0_10px_#00BFFF50]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-[#00BFFF]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 7.5h12.75a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 16.5 19.5H6a2.25 2.25 0 0 1-2.25-2.25V7.5z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M18 10.5h1.5a1.5 1.5 0 0 1 0 3H18v-3z"
          />
        </svg>
        <span class="text-white">
          {{ walletAddress ? formatAddress(walletAddress) : texts.walletButton }}
        </span>
      </button>

      <!-- Bouton pour basculer sur création -->
      <button
        v-if="!showCreateForm"
        @click="showCreateForm = true"
        class="mt-6 text-[#00BFFF] hover:underline text-base font-medium"
      >
        Créer un compte
      </button>

      <!-- Formulaire de création -->
      <form
        v-if="showCreateForm"
        class="flex flex-col gap-5 w-full max-w-md text-left mt-4"
      >
        <!-- Nom -->
        <div>
          <label class="block text-white/80 mb-2 font-medium">Nom complet</label>
          <input
            v-model="name"
            type="text"
            placeholder="Ex : Alex Dupont"
            class="w-full bg-white/10 border border-[#00BFFF]/40 rounded-lg px-4 py-3 
                   text-white placeholder-white/40 focus:outline-none 
                   focus:border-[#00BFFF] focus:ring-2 focus:ring-[#00BFFF]/40
                   transition-all duration-300"
            required
          />
        </div>

        <!-- Choix du rôle -->
        <div>
          <label class="block text-white/80 mb-2 font-medium">Je suis :</label>
          <div class="flex justify-between">
            <button
              type="button"
              @click="userRole = 'freelance'"
              :class="[
                'flex-1 mx-1 py-3 rounded-lg border border-[#00BFFF]/50 transition-all duration-300',
                userRole === 'freelance'
                  ? 'bg-[#00BFFF]/50 text-white shadow-[0_0_15px_#00BFFF80]'
                  : 'bg-white/10 hover:bg-[#00BFFF]/20'
              ]"
            >
              🧑‍💻 Freelance
            </button>
            <button
              type="button"
              @click="userRole = 'recruteur'"
              :class="[
                'flex-1 mx-1 py-3 rounded-lg border border-[#00BFFF]/50 transition-all duration-300',
                userRole === 'recruteur'
                  ? 'bg-[#00BFFF]/50 text-white shadow-[0_0_15px_#00BFFF80]'
                  : 'bg-white/10 hover:bg-[#00BFFF]/20'
              ]"
            >
              🏢 Recruteur
            </button>
          </div>
        </div>

        <!-- Bouton Wallet -->
        <button
          type="button"
          @click="connectWallet"
          class="w-full flex items-center justify-center gap-3 border border-[#00BFFF]/50 py-3 rounded-lg
                 hover:bg-[#00BFFF]/20 hover:scale-105 transition-all duration-300 text-lg font-medium shadow-[0_0_10px_#00BFFF50]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-[#00BFFF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 7.5h12.75a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 16.5 19.5H6a2.25 2.25 0 0 1-2.25-2.25V7.5z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M18 10.5h1.5a1.5 1.5 0 0 1 0 3H18v-3z"
            />
          </svg>
          <span class="text-white">
            {{ walletAddress ? formatAddress(walletAddress) : texts.walletButton }}
          </span>
        </button>

        <!-- Retour à la connexion -->
        <button
          type="button"
          @click="showCreateForm = false"
          class="mt-3 text-[#00BFFF] hover:underline text-base font-medium text-center"
        >
          ⬅ Retour à la connexion
        </button>

        <!-- Message si aucun wallet -->
        <div v-if="showNoWallet" class="mt-4 text-sm text-center text-white/80 space-y-2">
          <p>{{ texts.noWallet }}</p>
          <p class="text-[#00BFFF] font-semibold">{{ texts.installWallet }}</p>
          <div class="flex justify-center gap-4 mt-2">
            <a
              href="https://metamask.io/download/"
              target="_blank"
              class="text-[#E2761B] hover:underline font-medium"
              >MetaMask</a
            >
            <span class="text-white/50">•</span>
            <a
              href="https://phantom.app/download"
              target="_blank"
              class="text-purple-400 hover:underline font-medium"
              >Phantom</a
            >
          </div>
        </div>
      </form>

      <!-- Adresse connectée -->
      <p
        v-if="walletAddress && !showCreateForm"
        class="text-sm text-[#00BFFF] mt-6 font-semibold"
      >
        ✅ {{ texts.connected }} {{ formatAddress(walletAddress) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
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

const router = useRouter()
const { currentLang } = useLanguage()
const texts = computed(() =>
  currentLang.value === "en" ? loginTextsEn.texts : loginTextsFr.texts
)

const walletAddress = ref<string | null>(null)
const showNoWallet = ref(false)
const showCreateForm = ref(false)
const name = ref("")
const userRole = ref<"freelance" | "recruteur" | null>(null)

const connectWallet = async () => {
  showNoWallet.value = false
  const hasMetaMask = window.ethereum?.isMetaMask
  const hasPhantom = window.solana?.isPhantom

  if (!hasMetaMask && !hasPhantom) {
    showNoWallet.value = true
    return
  }

  try {
    if (hasMetaMask) await connectMetaMask()
    else if (hasPhantom) await connectPhantom()

    if (showCreateForm.value) {
      if (!name.value || !userRole.value) {
        alert("Veuillez remplir votre nom et choisir un rôle avant de continuer.")
        return
      }

      // Simulation d’enregistrement
      console.log("Création de compte :", {
        name: name.value,
        wallet: walletAddress.value,
        role: userRole.value,
      })

      if (userRole.value === "freelance") router.push("/freelance")
      else router.push("/employer")
    } else {
      // Connexion simple
      router.push("/dashboard")
    }
  } catch (error) {
    console.error("Erreur connexion wallet :", error)
  }
}

const connectMetaMask = async () => {
  const provider = window.ethereum
  const accounts = await provider.request({ method: "eth_requestAccounts" })
  const address = accounts[0]
  walletAddress.value = address
  const message = `Connexion WorkDAO - ${new Date().toISOString()}`
  await provider.request({ method: "personal_sign", params: [message, address] })
}

const connectPhantom = async () => {
  const provider = window.solana
  const resp = await provider.connect()
  walletAddress.value = resp.publicKey.toString()
}

const formatAddress = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4)
</script>

<style scoped>
::placeholder {
  color: #bbb;
}
</style>
