<template>
  <section class="p-6">
    <h2 class="text-xl font-semibold text-indigo-700 mb-6">📝 Créer une annonce</h2>

    <div class="bg-white rounded-lg shadow p-6 space-y-4">
      <input type="text" placeholder="Titre du poste" class="border w-full px-3 py-2 rounded" />
      <textarea placeholder="Description du poste..." rows="5" class="border w-full px-3 py-2 rounded"></textarea>
      <input type="number" placeholder="Budget en $WORK" class="border w-full px-3 py-2 rounded" />
      <button class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Publier</button>
    </div>
  </section>
</template>
