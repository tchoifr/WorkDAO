export const daoTextsEn = {
  header: {
    title: "🏛️ WorkDAO Governance",
    description: `
      The <b>WorkDAO</b> is a decentralized organization empowering freelancers worldwide.  
      It governs, secures, and evolves the Work ecosystem through a transparent  
      and community-driven arbitration system focused on fairness and justice.
    `
  },

  accessRules: {
    title: "⚖️ Governance Participation Rules",
    list: [
      "✅ Governance access is granted through a non-transferable <b>Soulbound Token (SBT)</b> issued to verified users.",
      "💎 The <b>$WORK token</b> is used for staking, rewards, and participation in the ecosystem.",
      "🗳️ <b>Voting is only allowed in case of disputes</b> between members to ensure fair and community-driven arbitration.",
      "👑 To become a <b>Governor</b>, a member must <b>stake at least $10 in $WORK</b> and have successfully <b>completed at least one mission</b> within the ecosystem.",
      "⚖️ In the event of a <b>dispute</b>, <b>15% of the $WORK</b> from the mission — <b>previously held in escrow</b> — is automatically allocated to compensate the arbitrators. A <b>jury of 5 Governors</b> is randomly selected from eligible members. Upon resolution, these <b>15% are evenly distributed</b>, granting <b>3% of the total amount to each Governor</b> as a reward for their role in maintaining fairness and network integrity.",
      "🚫 Any fraudulent or malicious activity results in a <b>temporary exclusion</b> from the DAO and may lead to the loss of associated staking."
    ]
  },
  charter: {
    title: "📜 WorkDAO Governance Charter",
    rules: [
      {
        title: "Mission",
        text: `
          The <b>WorkDAO</b> is a decentralized ecosystem built for freelancers.  
          Every member contributes to its growth and security through a  
          transparent and fair <b>dispute resolution system</b> powered by the community.
        `
      },

      {
        title: "Membership",
        text: `
          Each verified member receives a <b>Soulbound Token (SBT)</b> as a unique proof of identity  
          and belonging within the DAO.  
          The <b>$WORK token</b> supports the network’s economy — used for staking, rewards,  
          and arbitration deposits.
        `
      },
      {
        title: "Proposals (DIP)",
        text: `
          During the initial phase, <b>DAO Improvement Proposals (DIPs)</b> are managed by the core team.  
          Community members may submit <b>suggestions</b> for improving dispute resolution mechanisms  
          or the DAO’s economic model.  
          Each update must be validated by active governors before deployment on-chain.
        `
      },

      {
        title: "Arbitration & Security",
        text: `
          Disputes are resolved by a <b>random jury of 5 verified members</b> holding an SBT  
          and staking a small amount of $WORK as a good faith guarantee.  
          Decisions are <b>public, on-chain, and enforced via smart contracts</b>.  
          Honest arbitrators are rewarded, while abusive behavior results in penalties or suspension.
        `
      },
      {
        title: "Transparency",
        text: `
          All arbitration results and DAO actions are <b>publicly recorded on-chain</b>.  
          <b>Quarterly reports</b> published via IPFS ensure complete financial  
          and governance transparency.
        `
      },

      {
        title: "Evolution",
        text: `
          The DAO progressively evolves through <b>validated proposals</b> and  
          community feedback.  
          Future developments include <b>multi-chain deployment</b>, improved staking models,  
          and the creation of specialized sub-DAOs.
        `
      },

      {
        title: "Spirit of WorkDAO",
        text: `
          More than a protocol, WorkDAO is a <b>community of independents</b>  
          united by transparency, collaboration, and freedom.  
          <br><br><i>“One Work. One Network. One DAO.”</i>
        `
      }
    ]
  },

  proposals: {
    title: "📢 Active Arbitrations",
    items: [
      "🕒 Dispute #02: Mission completion contested — <b>jury deliberating</b>",
      "🕒 Dispute #03: Payment disagreement — <b>in progress</b>"
    ],
    note: "Only members with an active SBT and a minimum $10 stake in $WORK can participate in arbitration votes."
  },

  votes: {
    title: "🗳️ Recent Arbitration Results",
    description: "Latest verified dispute resolutions recorded on-chain and validated by the governors.",
    list: [
      "✔️ Dispute #01: Resolved in favor of the freelancer → <span class='text-[#00BFFF]'>Approved by 5 governors</span>",
      "🕒 Dispute #02: Pending resolution → <span class='text-yellow-400'>Jury voting ongoing</span>"
    ],
    note: "All arbitration results are permanently recorded on-chain for full transparency."
  }
};
