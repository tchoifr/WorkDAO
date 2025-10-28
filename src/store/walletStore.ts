// 📁 src/store/walletStore.ts
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { UsersStore } from './usersStore'

export const useWalletStore = defineStore('wallet', () => {
  const state = reactive({
    address: '',
    connected: false,
  })

  async function connectWallet() {
    if (!window.ethereum) {
      alert('MetaMask non détecté. Installez l’extension pour continuer.')
      return
    }

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[]
    state.address = accounts[0]
    state.connected = true

    console.log('🦊 Wallet connecté :', state.address)

    // 🔹 Dès que connecté → on vérifie côté backend
    const userStore = UsersStore()
    const existingUser = await userStore.fetchUserByWallet(state.address)

    if (existingUser) {
      console.log('✅ Utilisateur existant chargé depuis le backend :', existingUser)
    } else {
      console.log('⚠️ Aucun utilisateur trouvé, inscription requise.')
      // ⚙️ Ici tu peux déclencher une modale d’inscription
      // par exemple : showRegisterModal.value = true
    }
  }

  return { state, connectWallet }
})
