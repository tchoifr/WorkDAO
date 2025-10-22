import { ref, computed, type Ref } from "vue"

// Langue par défaut = anglais (avec détection navigateur si FR)
const browserLang = navigator.language.startsWith("fr") ? "fr" : "en"
const defaultLang = (localStorage.getItem("lang") as "en" | "fr") || browserLang

// ✅ Typage fort : "en" | "fr"
const currentLang: Ref<"en" | "fr"> = ref(defaultLang)

export function useLanguage() {
  const setLanguage = (lang: "en" | "fr") => {
    currentLang.value = lang
    localStorage.setItem("lang", lang)
  }

  const isEnglish = computed(() => currentLang.value === "en")

  return { currentLang, setLanguage, isEnglish }
}
