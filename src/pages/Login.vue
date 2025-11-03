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

declare global {
  interface Window {
    ethereum?: any
    solana?: any
  }
}

const router = useRouter()
const userStore = UsersStore()
const { currentLang } = useLanguage()

const texts = computed(() =>
  currentLang.value === "en" ? loginTextsEn.texts : loginTextsFr.texts
)

const walletAddress = ref<string | null>(null)
const showNoWallet = ref(false)
const showCreateForm = ref(false)
const name = ref("")
const userRole = ref<"freelance" | "recruteur" | null>(null)

// 🧭 Détermine le rôle principal
const getPrimaryRole = (roles?: string[]) => {
  const list = (roles ?? []).map(r => r.toLowerCase())
  if (list.includes("freelance")) return "freelance"
  if (list.includes("employer") || list.includes("recruteur")) return "employer"
  return "freelance"
}

// 🦊 Connexion MetaMask
const connectMetaMask = async () => {
  const provider = window.ethereum
  const accounts = await provider.request({ method: "eth_requestAccounts" })
  const address = accounts[0]
  walletAddress.value = address

  const message = `Connexion WorkDAO - ${new Date().toISOString()}`
  await provider.request({ method: "personal_sign", params: [message, address] })
}

// 👻 Connexion Phantom
const connectPhantom = async () => {
  const provider = window.solana
  const resp = await provider.connect()
  walletAddress.value = resp.publicKey.toString()
}

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

    if (loginRes.data.exists && loginRes.data.user) {
      const user = loginRes.data.user
      userStore.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))

      const mainRole = getPrimaryRole(user.roles)
      redirectByRole(mainRole)
      return
    }

    // Sinon, afficher formulaire d'inscription
    showCreateForm.value = true
  } catch (error: any) {
    console.error("Erreur login:", error.response?.data || error.message)
    userStore.error = error.response?.data?.error || error.message
  }
}

// 🧾 Création de compte
const registerNewUser = async () => {
  if (!walletAddress.value) {
    const hasMetaMask = window.ethereum?.isMetaMask
    const hasPhantom = window.solana?.isPhantom

    if (!hasMetaMask && !hasPhantom) {
      showNoWallet.value = true
      alert("Aucun wallet détecté. Installe MetaMask ou Phantom.")
      return
    }

    try {
      if (hasMetaMask) await connectMetaMask()
      else if (hasPhantom) await connectPhantom()
    } catch {
      alert("Échec de la connexion au wallet.")
      return
    }
  }

  if (!walletAddress.value) {
    alert("Impossible de récupérer ton adresse de wallet.")
    return
  }

  if (!name.value || !userRole.value) {
    alert("Veuillez entrer votre nom et choisir un rôle avant de continuer.")
    return
  }

  try {
    const user = await userStore.registerUser({
      walletAddress: walletAddress.value.trim().toLowerCase(),
      username: name.value,
      role: userRole.value,
    })

    if (user) {
      const mainRole = getPrimaryRole(user.roles)
      redirectByRole(mainRole)
    }
  } catch (error: any) {
    console.error("Erreur register:", error.response?.data || error.message)
    userStore.error = error.response?.data?.error || error.message
  }
}

// 🔁 Redirection selon rôle
const redirectByRole = (role: string) => {
  if (role === "freelance") router.push("/freelance")
  else if (role === "employer" || role === "recruteur") router.push("/employer")
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
    <div class="absolute inset-0 hero-overlay"></div>

    <div
      class="relative z-10 card-glow backdrop-blur-lg rounded-3xl p-8 w-[90%] max-w-[600px] text-center border border-cyan-500/40 shadow-xl"
    >
      <img
        :src="logo"
        alt="Logo"
        class="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_8px_var(--color-primary)]"
      />

      <h2 class="text-2xl font-bold text-cyan-400 mb-2">
        {{ showCreateForm ? "Créer un compte" : "Connexion Web3" }}
      </h2>

      <p class="text-gray-300 mb-6">
        {{
          showCreateForm
            ? "Entrez vos informations et connectez votre wallet."
            : "Connecte-toi ou crée un compte via ton wallet décentralisé."
        }}
      </p>

      <!-- Connexion -->
      <button
        v-if="!showCreateForm"
        @click="connectWallet"
        class="btn-primary w-full border border-cyan-400 rounded-full py-3 hover:bg-cyan-600/20 transition-all"
      >
        {{ "Connecter mon wallet" }}
      </button>

      <!-- Lien création -->
      <button
        v-if="!showCreateForm"
        @click="showCreateForm = true"
        class="mt-4 text-cyan-400 hover:underline"
      >
        Créer un compte
      </button>

      <!-- Formulaire création -->
      <form v-if="showCreateForm" class="mt-6 space-y-4 text-left">
        <div>
          <label class="block text-gray-400 mb-1">Nom complet</label>
          <input
            v-model="name"
            type="text"
            placeholder="Ex : Alex Dupont"
            class="w-full bg-[#0b1722] border border-cyan-600/40 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-gray-400 mb-2">Je suis :</label>
          <div class="flex gap-3">
            <button
              type="button"
              @click="userRole = 'freelance'"
              :class="[
                'flex-1 py-2 rounded border transition-all',
                userRole === 'freelance'
                  ? 'bg-cyan-600/60 text-white border-cyan-500'
                  : 'bg-white/10 border-cyan-600/30'
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
                  ? 'bg-cyan-600/60 text-white border-cyan-500'
                  : 'bg-white/10 border-cyan-600/30'
              ]"
            >
              🏢 Recruteur
            </button>
          </div>
        </div>

        <button
          type="button"
          @click="registerNewUser"
          class="btn-primary w-full border border-cyan-400 rounded-full py-3 hover:bg-cyan-600/20 transition-all"
        >
          {{ walletAddress ? "Créer mon compte" : "Connecter mon wallet" }}
        </button>

        <button
          type="button"
          @click="showCreateForm = false"
          class="text-cyan-400 hover:underline w-full mt-2 text-center"
        >
          ⬅ Retour
        </button>
      </form>

      <div v-if="showNoWallet" class="mt-4 text-sm text-center text-gray-400">
        <p>Wallet non détecté.</p>
        <p class="text-cyan-400 font-semibold">Installe MetaMask ou Phantom</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
::placeholder {
  color: #bbb;
}
.btn-primary {
  background: linear-gradient(90deg, #00bcd4, #0081cb);
  color: white;
  font-weight: 600;
}
</style>
