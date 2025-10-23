export const daoTextsFr = {
  header: {
    title: "🏛️ Gouvernance WorkDAO",
    description: `
      Le <b>WorkDAO</b> est une organisation décentralisée qui donne du pouvoir aux freelances du monde entier.  
      Il gouverne, sécurise et fait évoluer l’écosystème Work grâce à un système d’arbitrage communautaire  
      transparent, équitable et orienté vers la justice.
    `
  },

  accessRules: {
    title: "⚖️ Règles de participation à la gouvernance",
    list: [
      "✅ L’accès à la gouvernance est accordé via un <b>Jeton Soulbound (SBT)</b> non transférable délivré aux utilisateurs vérifiés.",
      "💎 Le <b>jeton $WORK</b> est utilisé pour le staking, les récompenses et la participation à l’écosystème.",
      "🗳️ Le <b>vote n’est autorisé qu’en cas de litige</b> entre membres afin d’assurer un arbitrage équitable.",
      "👑 Pour devenir <b>Gouverneur</b>, un membre doit <b>staker au moins 10 $ en $WORK</b> et avoir <b>réussi au moins une mission</b>.",
      "🚫 Toute activité frauduleuse ou malveillante entraîne une <b>exclusion temporaire</b> du DAO."
    ]
  },

  charter: {
    title: "📜 Charte de Gouvernance du WorkDAO",
    rules: [
      // 🧩 Bloc 1
      {
        title: "1. Mission",
        text: `
          Le <b>WorkDAO</b> est un écosystème décentralisé conçu pour les freelances.  
          Chaque membre contribue à sa croissance et à sa sécurité à travers un  
          <b>système de résolution des litiges</b> communautaire, transparent et équitable.
        `
      },

      // 🧩 Bloc 2
      {
        title: "2. Adhésion",
        text: `
          Chaque membre vérifié reçoit un <b>Jeton Soulbound (SBT)</b> comme preuve unique  
          d’identité et d’appartenance au DAO.  
          Le <b>jeton $WORK</b> soutient l’économie du réseau — utilisé pour le staking,  
          les récompenses et les dépôts d’arbitrage.
        `
      },
      {
        title: "3. Propositions (DIP)",
        text: `
          Durant la première phase, les <b>DAO Improvement Proposals (DIP)</b> sont gérées  
          par l’équipe fondatrice.  
          Les membres peuvent toutefois soumettre des <b>suggéstions communautaires</b>  
          pour améliorer le système de litiges ou le modèle économique du DAO.  
          Chaque mise à jour doit être validée par les gouverneurs actifs avant déploiement on-chain.
        `
      },

      {
        title: "4. Arbitrage & Sécurité",
        text: `
          Les litiges sont résolus par un <b>jury aléatoire de 5 membres vérifiés</b> détenant un SBT  
          et ayant misé une petite quantité de $WORK en garantie de bonne foi.  
          Les décisions sont <b>publiques, enregistrées on-chain</b> et appliquées par contrats intelligents.  
          Les arbitres honnêtes sont récompensés, tandis que les comportements abusifs  
          entraînent des pénalités ou suspensions.
        `
      },

      {
        title: "5. Transparence",
        text: `
          Toutes les décisions et arbitrages du DAO sont <b>publiquement enregistrés on-chain</b>.  
          Des <b>rapports trimestriels</b> publiés via IPFS garantissent une transparence  
          complète sur les activités et la gouvernance.
        `
      },

      {
        title: "6. Évolution",
        text: `
          Le DAO évolue progressivement grâce aux <b>propositions validées</b>  
          et aux retours de la communauté.  
          Les prochaines étapes incluent le <b>multi-chaîne</b>, de nouveaux modèles de staking  
          et la création de <b>sous-DAO spécialisés</b>.
        `
      },

      {
        title: "7. Esprit du WorkDAO",
        text: `
          Plus qu’un protocole, le <b>WorkDAO</b> est une communauté d’indépendants  
          unie par la transparence, la collaboration et la liberté.  
          <br><br><i>« Un Work. Un Réseau. Un DAO. »</i>
        `
      }
    ]
  },

  proposals: {
    title: "📢 Arbitrages actifs",
    items: [
      "🕒 Litige #02 : Contestation d’une mission — <b>jury en délibération</b>",
      "🕒 Litige #03 : Désaccord sur le paiement — <b>en cours</b>"
    ],
    note: "Seuls les membres disposant d’un SBT actif et d’un stake minimum de 10 $ en $WORK peuvent participer aux votes d’arbitrage."
  },

  votes: {
    title: "🗳️ Résultats récents des arbitrages",
    description: "Dernières résolutions de litiges vérifiées on-chain et validées par les gouverneurs.",
    list: [
      "✔️ Litige #01 : Résolu en faveur du freelance → <span class='text-[#00BFFF]'>Approuvé par 5 gouverneurs</span>",
      "🕒 Litige #02 : En attente de résolution → <span class='text-yellow-400'>Vote du jury en cours</span>"
    ],
    note: "Tous les résultats d’arbitrage sont enregistrés de manière permanente on-chain pour une transparence totale."
  }
};
