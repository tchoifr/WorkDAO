export const daoTextsFr = {
  header: {
    title: "🏛️ Gouvernance WorkDAO",
    description: `
      Le <b>WorkDAO</b> est une organisation décentralisée qui donne du pouvoir aux freelances du monde entier.  
      Il gouverne, sécurise et fait évoluer l’ensemble de l’écosystème Work grâce à des décisions collectives,  
      un vote transparent on-chain et une participation communautaire équitable.
    `
  },

  accessRules: {
    title: "⚖️ Règles de participation à la gouvernance",
    list: [
      "✅ L’accès à la gouvernance est accordé via un <b>Jeton Soulbound (SBT)</b> non transférable délivré aux utilisateurs vérifiés.",
      "💎 Le jeton <b>$WORK</b> est utilisé pour le staking, les récompenses et la participation à l’écosystème.",
      "🗳️ Chaque membre vérifié dispose d’un droit de vote égal (1 membre = 1 voix).",
      "🚫 Toute activité frauduleuse ou malveillante entraîne une <b>exclusion temporaire</b> du DAO."
    ]
  },

  charter: {
    title: "📜 Charte de Gouvernance du WorkDAO",
    rules: [
      {
        title: "1. Mission",
        text: `
          Le <b>WorkDAO</b> est un écosystème décentralisé conçu pour les freelances.  
          Chaque membre contribue à sa croissance, à sa sécurité et à son évolution  
          par des décisions collectives, équitables et transparentes, directement sur la blockchain.
        `
      },
      {
        title: "2. Adhésion",
        text: `
          Chaque membre vérifié reçoit un <b>Jeton Soulbound (SBT)</b> comme preuve unique d’identité  
          et de droit de vote au sein du DAO.  
          Le jeton <b>$WORK</b> soutient l’économie du réseau — utilisé pour le staking, les récompenses  
          et le financement des propositions.
        `
      },
      {
        title: "3. Gouvernance",
        text: `
          - <b>1 membre = 1 voix</b>, garanti par le SBT.  
          - Les membres peuvent <b>déléguer leur vote</b> à un représentant de confiance.  
          - Quorum minimal : <b>10 % des membres actifs</b>.  
          - Durée standard d’un vote : <b>7 jours</b> (ou <b>72h</b> pour les urgences).
        `
      },
      {
        title: "4. Propositions (DIP)",
        text: `
          Les membres peuvent soumettre des <b>DAO Improvement Proposals (DIP)</b> pour proposer des mises à jour ou des améliorations.  
          Chaque proposition doit obtenir au moins <b>60 % d’approbation</b> pour être adoptée par le DAO.
        `
      },
      {
        title: "5. Arbitrage & Sécurité",
        text: `
          Les litiges sont résolus par un <b>jury aléatoire de 5 membres vérifiés</b> détenant un SBT  
          et une petite mise en staking de $WORK comme garantie de bonne foi.  
          Les décisions sont publiques, enregistrées on-chain et appliquées via des contrats intelligents.  
          Les arbitres honnêtes sont récompensés, tandis que les comportements abusifs sont sanctionnés.
        `
      },
      {
        title: "6. Trésorerie",
        text: `
          Le DAO reçoit <b>1 % de toutes les transactions</b> effectuées dans l’écosystème Work.  
          L’utilisation des fonds est décidée collectivement par la communauté via un vote on-chain,  
          garantissant une flexibilité totale durant la phase de lancement du projet.
        `
      },
      {
        title: "7. Transparence",
        text: `
          Toutes les décisions, votes et transactions du DAO sont <b>publiques et vérifiables on-chain</b>.  
          Des <b>rapports trimestriels</b> seront publiés via IPFS afin de garantir une transparence financière  
          et organisationnelle complète.
        `
      },
      {
        title: "8. Évolution",
        text: `
          Le DAO évolue continuellement grâce aux propositions de la communauté (DIP),  
          permettant d’introduire des améliorations telles que le déploiement multi-chaîne,  
          de nouveaux modèles de staking ou la création de sous-DAO spécialisés.
        `
      },
      {
        title: "9. Inclusion",
        text: `
          Le WorkDAO est un <b>réseau mondial et inclusif</b>.  
          Toute la documentation et les interfaces sont disponibles en <b>anglais, français et espagnol</b>.  
          Les sous-DAO régionaux assurent une participation équitable et une représentation locale.
        `
      },
      {
        title: "10. Esprit du WorkDAO",
        text: `
          Plus qu’un protocole, le WorkDAO est une <b>communauté d’indépendants</b>  
          unie par la transparence, la collaboration et la liberté.  
          <br><br><i>« Un Work. Un Réseau. Un DAO. »</i>
        `
      }
    ]
  },

proposals: {
  title: "📢 Propositions de Gouvernance Actives",
  items: [
    "🕒 Proposition #02 : Lancer le cadre initial de gestion de trésorerie (se termine dans 4 jours)",
    "🕒 Proposition #03 : Mettre en place des récompenses de staking pour les membres vérifiés (se termine dans 2 jours)"
  ],
  note: "Seuls les membres disposant d’un Jeton Soulbound (SBT) actif peuvent créer ou voter sur les propositions."
},

votes: {
  title: "🗳️ Résultats Récents des Votes",
  description: "Derniers résultats de vote vérifiés on-chain et validés par la communauté.",
  list: [
    "✔️ Proposition #01 : Adoption de la Charte officielle de Gouvernance du WorkDAO → <span class='text-[#00BFFF]'>Approuvée (142 votes valides)</span>",
    "🕒 Proposition #02 : Cadre de gestion de trésorerie → <span class='text-yellow-400'>En cours (clôture prochaine)</span>"
  ],
  note: "Un quorum minimal de 10 % des membres actifs est requis pour valider une proposition. Tous les résultats sont enregistrés de manière permanente on-chain."
}

}
