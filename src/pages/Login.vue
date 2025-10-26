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

// 🌐 Texte dynamique selon la langue
const texts = computed(() =>
  currentLang.value === "en" ? loginTextsEn.texts : loginTextsFr.texts
)

// 🌈 États réactifs
const walletAddress = ref<string | null>(null)
const showNoWallet = ref(false)
const showCreateForm = ref(false)
const name = ref("")
const userRole = ref<"freelance" | "recruteur" | null>(null)

// ✅ Fonction principale de connexion / création
const connectWallet = async () => {
  showNoWallet.value = false
  const hasMetaMask = window.ethereum?.isMetaMask
  const hasPhantom = window.solana?.isPhantom

  if (!hasMetaMask && !hasPhantom) {
    showNoWallet.value = true
    return
  }

  try {
    // 👛 Connexion au wallet
    if (hasMetaMask) await connectMetaMask()
    else if (hasPhantom) await connectPhantom()

    if (!walletAddress.value) return

    // 🟦 Étape 1 : Vérifie si l’utilisateur existe déjà
    const loginRes = await axios.post("http://localhost:8000/api/login", {
      walletAddress: walletAddress.value,
    })

    if (loginRes.data.exists) {
      console.log("✅ Utilisateur trouvé :", loginRes.data)
      const user = loginRes.data.user
      if (!user) {
        console.error("⚠️ Pas de user renvoyé par l’API login.")
        return
      }

      userStore.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
      redirectByRole(user.role)
    } else {
      // 🟩 Étape 2 : Création d’un nouveau compte
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

      if (!user) {
        console.error("⚠️ Erreur lors de la création du compte : aucun user retourné.")
        return
      }

      console.log("🆕 Utilisateur créé :", user)
      redirectByRole(user.role)
    }
  } catch (error: unknown) {
    // 🔥 Gestion d’erreur typée
    if (error instanceof Error) {
      console.error("❌ Erreur connexion :", error.message)
      userStore.error = error.message
    } else {
      console.error("❌ Erreur inconnue :", error)
      userStore.error = "Erreur inconnue"
    }
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

// 🔁 Redirection selon le rôle (protégée contre les valeurs null)
const redirectByRole = (role: string | null | undefined) => {
  if (role === "freelance") router.push("/freelance")
  else if (role === "recruteur") router.push("/employer")
  else router.push("/")
}

// ✂️ Format affichage du wallet
const formatAddress = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4)
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center relative"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    <div
      class="relative z-10 bg-white/10 backdrop-blur-md shadow-[0_0_25px_#00BFFF80]
             rounded-3xl p-8 w-[90%] max-w-[600px] text-center"
    >
      <img :src="logo" alt="Logo" class="w-24 h-24 mx-auto mb-6" />

      <h2 class="text-2xl font-bold text-[#00BFFF]">
        {{ showCreateForm ? "Créer un compte" : texts.title }}
      </h2>

      <p class="text-white/80 mt-2 mb-6">
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
        class="w-full py-3 border border-[#00BFFF]/50 rounded-lg hover:bg-[#00BFFF]/20 transition"
      >
        {{ walletAddress ? formatAddress(walletAddress) : texts.walletButton }}
      </button>

      <!-- Créer un compte -->
      <button
        v-if="!showCreateForm"
        @click="showCreateForm = true"
        class="mt-4 text-[#00BFFF] hover:underline"
      >
        Créer un compte
      </button>

      <!-- Formulaire création -->
      <form v-if="showCreateForm" class="mt-6 space-y-4">
        <div>
          <label class="block text-left text-white/80 mb-1">Nom complet</label>
          <input
            v-model="name"
            type="text"
            placeholder="Ex : Alex Dupont"
            class="w-full bg-white/10 border border-[#00BFFF]/40 rounded-lg px-4 py-3
                   text-white placeholder-white/40 focus:ring-2 focus:ring-[#00BFFF]/40"
          />
        </div>

        <div>
          <label class="block text-left text-white/80 mb-2">Je suis :</label>
          <div class="flex gap-3">
            <button
              type="button"
              @click="userRole = 'freelance'"
              :class="[
                'flex-1 py-2 rounded border transition-all',
                userRole === 'freelance'
                  ? 'bg-[#00BFFF]/50 text-white border-[#00BFFF]'
                  : 'bg-white/10 border-[#00BFFF]/40'
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
                  ? 'bg-[#00BFFF]/50 text-white border-[#00BFFF]'
                  : 'bg-white/10 border-[#00BFFF]/40'
              ]"
            >
              🏢 Recruteur
            </button>
          </div>
        </div>

        <button
          type="button"
          @click="connectWallet"
          class="w-full py-3 border border-[#00BFFF]/50 rounded-lg hover:bg-[#00BFFF]/20 transition"
        >
          {{ walletAddress ? formatAddress(walletAddress) : "Connecter mon wallet" }}
        </button>

        <button
          type="button"
          @click="showCreateForm = false"
          class="text-[#00BFFF] hover:underline w-full mt-2"
        >
          ⬅ Retour
        </button>
      </form>

      <!-- Message no wallet -->
      <div v-if="showNoWallet" class="mt-4 text-sm text-center text-white/80">
        <p>{{ texts.noWallet }}</p>
        <p class="text-[#00BFFF] font-semibold">{{ texts.installWallet }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  color: #bbb;
}
</style>
