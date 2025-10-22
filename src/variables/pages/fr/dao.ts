export const daoTextsFr = {
  header: {
    title: "🏛️ Gouvernance WorkDAO",
    description: `
      Le <b>WorkDAO</b> est l’organe décisionnel décentralisé qui gouverne,
      sécurise et fait évoluer l’ensemble de l’écosystème Work.  
      Chaque vote, mission et
      <span class="text-[#00BFFF] font-semibold">$WORK</span> contribue
      à construire une économie transparente, autonome et dirigée par sa communauté.`
  },

  accessRules: {
    title: "⚖️ Règles de participation à la gouvernance",
    list: [
      "✅ L’accès à la gouvernance est accordé uniquement après la signature d’un <b>contrat intelligent vérifié</b> entre deux utilisateurs.",
      "💎 Pour voter ou soumettre des propositions, les membres doivent avoir effectué au moins une opération de <b>staking $WORK</b>.",
      "⚔️ En cas de litige, <b>15 % des $WORK mis en staking</b> sont redistribués entre les arbitres votants.",
      "🚫 Toute activité frauduleuse ou illégale entraîne la <b>suspension du compte</b> et le <b>gel des fonds $WORK</b>."
    ]
  },

  charter: {
    title: "📜 Charte de Gouvernance WorkDAO",
    rules: [
      {
        title: "1. Principes généraux",
        text: "Le DAO administre l’écosystème décentralisé des freelances, en gérant son évolution, la résolution des litiges et les mises à jour via des contrats intelligents transparents et on-chain."
      },
      {
        title: "2. Adhésion",
        text: "Tout utilisateur vérifié peut rejoindre le DAO. Les modes d’entrée incluent : (A) un jeton Soulbound obtenu après une transaction validée, ou (B) la détention d’au moins 100 $WORK. Un modèle hybride peut combiner les deux pour plus d’inclusivité."
      },
      {
        title: "3. Droits et responsabilités des membres",
        list: [
          "Soumettre des propositions pour les mises à jour du protocole, les règles de gouvernance ou les nouvelles fonctionnalités de la plateforme.",
          "Voter sur les paramètres clés tels que la répartition de la trésorerie, les élections d’arbitres ou les politiques du système.",
          "Accéder à une transparence totale sur les budgets du DAO, les votes et les rapports de gouvernance.",
          "Agir de manière éthique et signaler toute fraude, abus ou activité malveillante."
        ]
      },
      {
        title: "4. Mécanisme de vote",
        text: `
          Tous les votes sont effectués <b>on-chain</b> afin de garantir l’équité et la transparence.  
          - Modèles de gouvernance : 1 membre = 1 vote (Soulbound) ou vote pondéré selon les avoirs en $WORK (avec un plafond).  
          - Quorum : 20 % des membres actifs ou 10 % de l’offre totale de jetons.  
          - Durée standard d’un vote : 7 jours.  
          - Votes d’urgence : possibilité de suspendre un contrat intelligent jusqu’à 72 heures.`
      },
      {
        title: "5. Résolution des litiges",
        text: `
          Les litiges sont gérés par un <b>pool d’arbitrage décentralisé</b> selon des procédures vérifiables on-chain :<br><br>
          <ol class='list-decimal ml-6 space-y-1'>
            <li>Dépôt du dossier de litige par un utilisateur.</li>
            <li>Sélection aléatoire d’un <b>jury de 5 arbitres</b>.</li>
            <li>Analyse des preuves soumises (stockées on-chain ou via IPFS).</li>
            <li>Le vote majoritaire détermine la répartition des fonds ou les sanctions.</li>
          </ol>
          <br />
          <b>Récompenses des arbitres :</b><br />
          - Paiement en stablecoins + <b>bonus en $WORK</b> pour la participation active.<br />
          - Les arbitres malhonnêtes ou inactifs subissent une <b>pénalité (slashing)</b> et perdent une partie de leur mise ou de leur réputation.
        `
      },
      {
        title: "6. Trésorerie et répartition des fonds",
        text: `
          La trésorerie du DAO reçoit <b>1 % de toutes les transactions</b> effectuées sur la plateforme.  
          Répartition des fonds :  
          - 50 % → Arbitrage & Sécurité  
          - 30 % → Développement technique  
          - 20 % → Croissance & Communauté  
          Toute dépense supérieure à <b>5 000 $WORK</b> nécessite une approbation via vote DAO.`
      },
      {
        title: "7. Transparence et audit",
        text: "Chaque décision, vote et mouvement de fonds du DAO est enregistré de manière permanente on-chain. Tous les contrats intelligents sont audités, et des rapports de transparence trimestriels sont publiés publiquement via IPFS."
      },
      {
        title: "8. Scalabilité et évolution continue",
        text: `
          Le DAO évolue grâce à des <b>propositions formelles (DIP)</b> pouvant inclure :  
          - Transition entre la gouvernance Soulbound et celle basée sur $WORK  
          - Déploiement multi-chaîne  
          - Création de sous-DAO  
          - Amélioration des mécanismes de vote ou de staking`
      },
      {
        title: "9. Accessibilité et inclusion mondiale",
        text: "Toute la documentation du DAO et les interfaces de vote sont disponibles en anglais, français et espagnol. Des sous-DAO régionaux garantissent une représentation équitable et une participation juste à travers le monde."
      },
      {
        title: "10. Conclusion",
        text: `
          La <b>Charte WorkDAO</b> établit les fondations d’un modèle de gouvernance transparent, décentralisé et collaboratif.  
          Elle permet aux membres de façonner collectivement l’avenir de l’écosystème Work.  
          <br><br><i>“Un Work. Un Réseau. Un DAO.”</i>`
      }
    ]
  },

  proposals: {
    title: "📢 Propositions de gouvernance actives",
    items: [
      "🕒 Proposition #32 : Ajustement de la répartition des fonds de la trésorerie (se termine dans 3 jours)",
      "🕒 Proposition #31 : Mise en place d’un nouveau système décentralisé de sélection des arbitres (se termine dans 2 jours)"
    ],
    note: "Seuls les membres disposant d’un staking actif ou d’un jeton Soulbound peuvent créer ou voter des propositions."
  },

  votes: {
    title: "🗳️ Résultats récents des votes",
    description: "Résultats validés des votes des membres actifs du DAO, après vérification on-chain et respect du quorum.",
    list: [
      "✔️ Proposition #30 : Augmentation des récompenses de staking → <span class='text-[#00BFFF]'>Approuvée (128 votes valides)</span>",
      "❌ Proposition #29 : Réduction du seuil de quorum → <span class='text-red-400'>Rejetée (42 votes valides)</span>",
      "🕒 Proposition #28 : Intégration du réseau Base → <span class='text-yellow-400'>En attente (vote en cours)</span>"
    ],
    note: "Un quorum minimum de 20 % est requis pour la validation d’une proposition. Tous les résultats sont enregistrés de manière permanente on-chain."
  }
}
