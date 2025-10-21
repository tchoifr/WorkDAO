<template>
  <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div
      class="relative bg-[#0d0d0d] text-white rounded-2xl shadow-2xl p-8 w-[380px] flex flex-col items-center animate-fade-in"
    >
      <!-- Image du wallet -->
      <img
        :src="wallet"
        alt="Logo Wallet"
        class="w-40 h-40 mb-4 rounded-full shadow-lg border-2 border-[#8b5cf6] object-cover bg-gray-800"
      />

      <h2 class="text-lg font-semibold mb-2 tracking-wide">Connecter un wallet</h2>
      <p class="text-gray-400 text-sm mb-6 text-center max-w-xs leading-relaxed">
        Choisissez une option pour vous connecter à <b>WorkDAO</b>.
      </p>

      <!-- Boutons -->
      <button
        @click="connectMetaMask"
        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition mb-3 shadow-md hover:shadow-lg"
      >
        🦊 MetaMask
      </button>

      <button
        @click="connectPhantom"
        class="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium py-3 rounded-xl transition shadow-md hover:shadow-lg"
      >
        👻 Phantom
      </button>

      <!-- Bouton de fermeture -->
      <button
        @click="$emit('close')"
        class="absolute top-3 right-4 text-gray-500 hover:text-gray-300 text-xl"
      >
        ✖
      </button>

      <p class="text-gray-500 text-xs mt-6 italic">
        Votre mot de passe reste privé et sécurisé.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ethers } from 'ethers'
import wallet from '../../assets/wallet.jpg'
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js'

declare global {
  interface Window {
    ethereum?: any
    phantom?: any
  }
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'connected', data: { type: string; address: string }): void
}>()

// Connexion MetaMask
async function connectMetaMask() {
  try {
    const w = window as any
    if (!w.ethereum) {
      alert('Installe MetaMask pour continuer.')
      return
    }
    const provider = new ethers.BrowserProvider(w.ethereum)
    const accounts: string[] = await provider.send('eth_requestAccounts', [])
    if (!accounts?.[0]) return
    emit('connected', { type: 'MetaMask', address: accounts[0] })
  } catch (e) {
    console.error('Erreur MetaMask:', e)
  }
}

// Connexion Phantom
async function connectPhantom() {
  try {
    const provider = (window as any).phantom?.solana
    if (!provider?.isPhantom) {
      alert('Installe Phantom Wallet pour continuer.')
      return
    }
    const resp = await provider.connect()
    emit('connected', { type: 'Phantom', address: resp.publicKey.toString() })
  } catch (err) {
    console.error('Erreur Phantom:', err)
  }
}
</script>

<style scoped>
button:focus {
  outline: none;
}

/* Animation douce d’apparition */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.25s ease-out;
}
</style>
