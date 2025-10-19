<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold mb-4 text-indigo-700">💰 Paiements</h2>
    <table class="w-full bg-white shadow rounded-lg">
      <thead class="bg-indigo-100 text-gray-700">
        <tr>
          <th class="p-3 text-left">Date</th>
          <th class="p-3 text-left">Mission</th>
          <th class="p-3 text-left">Montant</th>
          <th class="p-3 text-left">Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in payments" :key="p.id" class="border-t hover:bg-gray-50">
          <td class="p-3">{{ p.date }}</td>
          <td class="p-3">{{ p.mission }}</td>
          <td class="p-3 text-indigo-600 font-semibold">{{ p.amount }} $WORK</td>
          <td class="p-3">
            <span
              :class="p.status === 'Terminé' ? 'text-green-600' : 'text-yellow-600'"
              class="font-semibold"
              >{{ p.status }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
const payments = [
  { id: 1, date: "2025-10-01", mission: "Smart Contract ERC-721", amount: 320, status: "Terminé" },
  { id: 2, date: "2025-10-07", mission: "Intégration MetaMask", amount: 180, status: "En attente" },
]
</script>
