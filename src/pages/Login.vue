<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center bg-no-repeat relative"
    :style="{ backgroundImage: `url(${background})` }"
  >
    <!-- Overlay optionnel pour foncer un peu l’image -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <!-- Card -->
    <div
      class="relative z-10 bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-80 text-center flex flex-col items-center"
    >
      <div class="flex flex-col items-center mb-6">
        <img :src="logo" alt="Logo" class="w-14 h-14 mb-2" />
        <h2 class="text-xl font-semibold text-[#00BFFF]">Connexion</h2>
      </div>

      <!-- Formulaire -->
      <form @submit.prevent="handleLogin" class="flex flex-col space-y-4 w-full">
        <input
          v-model="email"
          type="email"
          placeholder="Adresse e-mail"
          class="px-4 py-2 rounded-md bg-white/20 focus:bg-white/30 text-white placeholder-gray-300 focus:outline-none"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          class="px-4 py-2 rounded-md bg-white/20 focus:bg-white/30 text-white placeholder-gray-300 focus:outline-none"
          required
        />

        <button
          type="submit"
          class="bg-[#00BFFF] hover:bg-[#33CCFF] text-black font-semibold rounded-md py-2 transition shadow-[0_0_10px_#00BFFF]"
        >
          Se connecter
        </button>
      </form>

      <!-- Séparateur -->
      <div class="flex items-center my-6 w-full">
        <div class="flex-1 h-px bg-white/20"></div>
        <span class="px-2 text-sm text-white/60">ou</span>
        <div class="flex-1 h-px bg-white/20"></div>
      </div>

      <!-- Bouton Google -->
      <button
        @click="loginWithGoogle"
        class="w-full flex items-center justify-center gap-2 border border-white/30 py-2 rounded-md hover:bg-white/10 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          class="w-5 h-5"
        />
        <span>Connexion avec Google</span>
      </button>

      <!-- Lien inscription -->
      <p class="text-sm text-white/70 mt-6">
        Pas encore de compte ?
        <RouterLink to="/register" class="text-[#00BFFF] hover:underline">
          Créer un compte
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/logo.png'
import background from '../assets/connect.jpg'

const email = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Tentative de connexion :', email.value)
}

const loginWithGoogle = async () => {
  try {
    console.log('Connexion via Google...')
  } catch (error) {
    console.error('Erreur Google Auth:', error)
  }
}
</script>

<style scoped>
::placeholder {
  color: #bbb;
}
</style>
