<script setup lang="ts">
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { UsersStore } from "../store/usersStore"
import { useLanguage } from "../store/useLanguage"
import { loginTextsEn } from "../variables/pages/en/login"
import { loginTextsFr } from "../variables/pages/fr/login"
import logo from "../assets/logo.png"
import background from "../assets/connect.jpg"

// ✅ Types Phantom & MetaMask
declare global {
  interface Window {
    ethereum?: any
    solana?: any
  }
}

// 🧠 Instances
const router = useRouter()
const userStore = UsersStore()
const { currentLang } = useLanguage()

// 🌐 Texte dynamique
const texts = computed(() =>
  currentLang.value === "en" ? loginTextsEn.texts : loginTextsFr.texts
)

// 🌈 États
const walletAddress = ref<string | null>(null)
const showNoWallet = ref(false)
const showCreateForm = ref(false)
const name = ref("")
const userRole = ref<"freelance" | "recruteur" | null>(null)

// ✅ Connexion principale
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
    if (!walletAddress.value) return

const loginRes = await axios.post("https://supreme-lynette-workdao-1926d5de.koyeb.app/api/login", {
  walletAddress: walletAddress.value,
});

    if (loginRes.data.exists) {
      const user = loginRes.data.user
      if (!user) return
      userStore.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
      redirectByRole(user.role)
    } else {
      if (!name.value || !userRole.value) {
        alert("Veuillez entrer votre nom et choisir un rôle avant de continuer.")
        showCreateForm.value = true
        return
      }
      const user = await userStore.registerUser({
        walletAddress: walletAddress.value,
        username: name.value,
        role: userRole.value,
      })
      if (!user) return
      redirectByRole(user.role)
    }
  } catch (error: unknown) {
    if (error instanceof Error) userStore.error = error.message
    else userStore.error = "Erreur inconnue"
  }
}

// 🦊 MetaMask
const connectMetaMask = async () => {
  const provider = window.ethereum
  const accounts = await provider.request({ method: "eth_requestAccounts" })
  const address = accounts[0]
  walletAddress.value = address
  const message = `Connexion WorkDAO - ${new Date().toISOString()}`
  await provider.request({ method: "personal_sign", params: [message, address] })
}

// 👻 Phantom
const connectPhantom = async () => {
  const provider = window.solana
  const resp = await provider.connect()
  walletAddress.value = resp.publicKey.toString()
}

// 🔁 Redirection selon rôle
const redirectByRole = (role: string | null | undefined) => {
  if (role === "freelance") router.push("/freelance")
  else if (role === "recruteur") router.push("/employer")
  else router.push("/")
}

// 🪪 Format wallet
const formatAddress = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4)
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center relative fade-in"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <!-- Overlay global -->
    <div class="absolute inset-0 hero-overlay"></div>

    <!-- Carte principale -->
    <div class="relative z-10 card-glow backdrop-blur-lg rounded-3xl p-8 w-[90%] max-w-[600px] text-center">
      <img :src="logo" alt="Logo" class="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_8px_var(--color-primary)]" />

      <h2 class="text-2xl font-bold text-[var(--color-secondary)] mb-2">
        {{ showCreateForm ? "Créer un compte" : texts.title }}
      </h2>

      <p class="text-[var(--color-text-dim)] mb-6">
        {{
          showCreateForm
            ? "Entrez vos informations et connectez votre wallet."
            : texts.subtitle
        }}
      </p>

      <!-- Connexion Wallet -->
      <button
        v-if="!showCreateForm"
        @click="connectWallet"
        class="btn-primary w-full"
      >
        {{ walletAddress ? formatAddress(walletAddress) : texts.walletButton }}
      </button>

      <!-- Lien création -->
      <button
        v-if="!showCreateForm"
        @click="showCreateForm = true"
        class="mt-4 text-[var(--color-primary)] hover:underline"
      >
        Créer un compte
      </button>

      <!-- Formulaire création -->
      <form v-if="showCreateForm" class="mt-6 space-y-4 text-left">
        <div>
          <label class="block text-[var(--color-text-dim)] mb-1">Nom complet</label>
          <input
            v-model="name"
            type="text"
            placeholder="Ex : Alex Dupont"
            class="w-full bg-[var(--color-bg-card)] border border-[var(--color-secondary)]/40 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-[var(--color-secondary)]/50 outline-none"
          />
        </div>

        <div>
          <label class="block text-[var(--color-text-dim)] mb-2">Je suis :</label>
          <div class="flex gap-3">
            <button
              type="button"
              @click="userRole = 'freelance'"
              :class="[
                'flex-1 py-2 rounded border transition-all',
                userRole === 'freelance'
                  ? 'bg-[var(--color-secondary)]/50 text-white border-[var(--color-secondary)]'
                  : 'bg-white/10 border-[var(--color-secondary)]/40'
              ]"
            >
              🧑‍💻 Freelance
            </button>

            <button
              type="button"
              @click="userRole = 'recruteur'"
              :class="[
                'flex-1 py-2 rounded border transition-all',
                userRole === 'recruteur'
                  ? 'bg-[var(--color-secondary)]/50 text-white border-[var(--color-secondary)]'
                  : 'bg-white/10 border-[var(--color-secondary)]/40'
              ]"
            >
              🏢 Recruteur
            </button>
          </div>
        </div>

        <button
          type="button"
          @click="connectWallet"
          class="btn-primary w-full"
        >
          {{ walletAddress ? formatAddress(walletAddress) : "Connecter mon wallet" }}
        </button>

        <button
          type="button"
          @click="showCreateForm = false"
          class="text-[var(--color-primary)] hover:underline w-full mt-2 text-center"
        >
          ⬅ Retour
        </button>
      </form>

      <!-- Message no wallet -->
      <div v-if="showNoWallet" class="mt-4 text-sm text-center text-[var(--color-text-dim)]">
        <p>{{ texts.noWallet }}</p>
        <p class="text-[var(--color-primary)] font-semibold">{{ texts.installWallet }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  color: #bbb;
}
</style>
