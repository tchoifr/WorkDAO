import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useWalletStore = defineStore('wallet', () => {
  const state = reactive({
    address: '',
    connected: false,
  })

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[]
      state.address = accounts[0]
      state.connected = true
    } else {
      alert('MetaMask non détecté. Installez l’extension pour continuer.')
    }
  }

  return { state, connectWallet }
})
