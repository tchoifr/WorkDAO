import { defineStore } from "pinia"

// Import FR
import { footerTextsFr } from "../variables/components/fr/footer"
import { navbarTextsFr } from "../variables/components/fr/navbar"
import { daoTextsFr } from "../variables/pages/fr/dao"
import { homeTextsFr } from "../variables/pages/fr/home"
import { loginTextsFr } from "../variables/pages/fr/login"
import { stakingTextsFr } from "../variables/pages/fr/staking"

// Import EN
import { footerTextsEn } from "../variables/components/en/footer"
import { navbarTextsEn } from "../variables/components/en/navbar"
import { daoTextsEn } from "../variables/pages/en/dao"
import { homeTextsEn } from "../variables/pages/en/home"
import { loginTextsEn } from "../variables/pages/en/login"
import { stakingTextsEn } from "../variables/pages/en/staking"

export const useWorkStore = defineStore("work", {
  state: () => ({
    lang: "fr" as "fr" | "en",
    texts: {
      footer: footerTextsFr,
      navbar: navbarTextsFr,
      dao: daoTextsFr,
      home: homeTextsFr,
      login: loginTextsFr,
      staking: stakingTextsFr,
    },
  }),

  actions: {
    switchLang(lang: "fr" | "en") {
      this.lang = lang
      if (lang === "en") {
        this.texts = {
          footer: footerTextsEn,
          navbar: navbarTextsEn,
          dao: daoTextsEn,
          home: homeTextsEn,
          login: loginTextsEn,
          staking: stakingTextsEn,
        }
      } else {
        this.texts = {
          footer: footerTextsFr,
          navbar: navbarTextsFr,
          dao: daoTextsFr,
          home: homeTextsFr,
          login: loginTextsFr,
          staking: stakingTextsFr,
        }
      }
    },

    // 🧠 Fonction intelligente locale
    askR2D2(question: string): string {
      const q = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      const allTexts = JSON.stringify(this.texts).toLowerCase()

      // Liste de mots-clés à surveiller
      const topics: Record<string, string> = {
        staking: "Le staking permet de sécuriser le réseau et d'obtenir des récompenses annuelles de 5% en $WORK.",
        gouvernance: "La gouvernance du WorkDAO repose sur la transparence et les votes on-chain.",
        dao: "Le WorkDAO est une organisation décentralisée qui gère l'écosystème freelance de manière autonome.",
        recompense: "Les récompenses sont distribuées en tokens $WORK et en stablecoins pour les arbitres actifs.",
        vote: "Chaque membre peut voter sur les propositions selon son staking ou son token Soulbound.",
        arbitre: "Les arbitres sont sélectionnés aléatoirement pour résoudre les litiges via un vote vérifiable on-chain.",
        fiable: "Le WorkDAO est audité régulièrement et toutes les décisions sont enregistrées on-chain, assurant une transparence totale.",
        securite: "La sécurité du WorkDAO repose sur des smart contracts audités et un mécanisme d’arbitrage décentralisé.",
        membre: "Tout utilisateur vérifié peut devenir membre en possédant un token Soulbound ou au moins 100 $WORK.",
        token: "Le token $WORK est utilisé pour voter, participer à la gouvernance et recevoir des récompenses.",
      }

      // 1️⃣ Vérifie si un mot-clé correspond à une réponse connue
      for (const [keyword, answer] of Object.entries(topics)) {
        if (q.includes(keyword)) return answer
      }

      // 2️⃣ Sinon, essaie de trouver une phrase du texte contenant les mots de la question
      const words = q.split(" ").filter((w) => w.length > 3)
      const match = words.find((w) => allTexts.includes(w))
      if (match) {
        // Extrait un bout de texte proche du mot trouvé
        const index = allTexts.indexOf(match)
        const snippet = allTexts.slice(Math.max(0, index - 100), index + 200)
        return (
          "Voici ce que j’ai trouvé dans la documentation WorkDAO : <br><br>" +
          snippet.replace(/["{}[\],]/g, " ").slice(0, 400) +
          "..."
        )
      }

      // 3️⃣ Si rien n’est trouvé
      return (
        "Je n’ai pas trouvé cette information dans la documentation WorkDAO 🧐<br>" +
        "Essayez de reformuler votre question avec des mots comme <b>staking</b>, <b>DAO</b>, <b>vote</b> ou <b>récompense</b>."
      )
    },
  },
})
