<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold text-indigo-700 mb-6">⚙️ Paramètres</h2>

    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <label class="block">
        <span class="text-gray-700 font-medium">Nom complet</span>
        <input type="text" placeholder="Jean Dupont" class="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <label class="block">
        <span class="text-gray-700 font-medium">Email</span>
        <input type="email" placeholder="jean@entreprise.io" class="mt-1 block w-full border rounded px-3 py-2" />
      </label>

      <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Sauvegarder
      </button>
    </div>
  </section>
</template>
