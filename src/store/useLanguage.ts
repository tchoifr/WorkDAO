import { ref, computed } from "vue"

// 🌐 Détection automatique de la langue du navigateur
const browserLang = navigator.language.startsWith("fr") ? "fr" : "en"

// 🏁 Langue par défaut (localStorage prioritaire, sinon navigateur)
const defaultLang = (localStorage.getItem("lang") as "en" | "fr") || browserLang

// ✅ État global réactif
const currentLang = ref<"en" | "fr">(defaultLang)

// 💡 Hook réutilisable
export function useLanguage() {
  const setLanguage = (lang: "en" | "fr") => {
    currentLang.value = lang
    localStorage.setItem("lang", lang)
  }

  const isEnglish = computed(() => currentLang.value === "en")

  // 🧠 Retourne les propriétés réactives (sans .value dans le template)
  return {
    currentLang,
    setLanguage,
    isEnglish,
  }
}
