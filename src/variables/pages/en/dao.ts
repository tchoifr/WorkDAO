export const daoTextsEn = {
  header: {
    title: "🏛️ WorkDAO Governance",
    description: `
      The <b>WorkDAO</b> is a decentralized organization empowering freelancers worldwide.  
      It governs, secures, and evolves the entire Work ecosystem through collective decisions,  
      transparent on-chain voting, and fair community participation.
    `
  },

  accessRules: {
    title: "⚖️ Governance Participation Rules",
    list: [
      "✅ Membership is granted via a non-transferable <b>Soulbound Token (SBT)</b> issued to verified users.",
      "💎 The <b>$WORK token</b> is used for staking, rewards, and ecosystem participation.",
      "🗳️ Each verified member has an equal voting right (1 member = 1 vote).",
      "🚫 Any fraudulent or malicious activity leads to <b>temporary exclusion</b> from the DAO."
    ]
  },

  charter: {
    title: "📜 WorkDAO Governance Charter",
    rules: [
      {
        title: "1. Mission",
        text: `
          The <b>WorkDAO</b> is a decentralized ecosystem built for freelancers.  
          Every member contributes to its growth, security, and evolution through transparent,  
          fair, and collective decision-making on-chain.
        `
      },
      {
        title: "2. Membership",
        text: `
          Each verified member receives a <b>Soulbound Token (SBT)</b> as a unique proof of identity  
          and voting right within the DAO.  
          The <b>$WORK token</b> supports the network’s economy — used for staking, rewards, and funding proposals.
        `
      },
      {
        title: "3. Governance",
        text: `
          - <b>1 member = 1 vote</b>, guaranteed by the SBT.  
          - Members can <b>delegate their vote</b> to a trusted representative.  
          - Minimum quorum: <b>10% of active members</b>.  
          - Standard voting period: <b>7 days</b> (or <b>72h</b> for emergencies).
        `
      },
      {
        title: "4. Proposals (DIP)",
        text: `
          Members may submit <b>DAO Improvement Proposals (DIPs)</b> to suggest updates or improvements.  
          Each proposal requires at least <b>60% approval</b> to be adopted by the DAO.
        `
      },
      {
        title: "5. Arbitration & Security",
        text: `
          Disputes are resolved by a <b>random jury of 5 verified members</b> holding an SBT  
          and a small amount of staked $WORK as a security deposit.  
          Decisions are public, recorded on-chain, and enforceable via smart contracts.  
          Honest arbitrators are rewarded; dishonest behavior leads to slashing or suspension.
        `
      },
      {
        title: "6. Treasury",
        text: `
          The DAO receives <b>1% of all transactions</b> made across the Work ecosystem.  
          Fund allocation decisions are made collectively by the community through on-chain votes,  
          ensuring full flexibility during the project’s early growth phase.
        `
      },
      {
        title: "7. Transparency",
        text: `
          All DAO decisions, votes, and transactions are <b>publicly recorded on-chain</b>.  
          <b>Quarterly reports</b> will be published via IPFS to guarantee full financial and governance transparency.
        `
      },
      {
        title: "8. Evolution",
        text: `
          The DAO continuously evolves through community proposals (DIPs),  
          allowing for improvements such as multi-chain deployment, staking models,  
          or the creation of specialized sub-DAOs.
        `
      },
      {
        title: "9. Inclusion",
        text: `
          WorkDAO is a <b>global and inclusive network</b>.  
          All documentation and interfaces are available in <b>English, French, and Spanish</b>.  
          Regional sub-DAOs ensure fair participation and local representation.
        `
      },
      {
        title: "10. Spirit of WorkDAO",
        text: `
          More than a protocol, WorkDAO is a <b>community of independents</b>  
          united by transparency, collaboration, and freedom.  
          <br><br><i>“One Work. One Network. One DAO.”</i>
        `
      }
    ]
  },
proposals: {
  title: "📢 Active Governance Proposals",
  items: [
    "🕒 Proposal #02: Launch the initial treasury management framework (ends in 4 days)",
    "🕒 Proposal #03: Implement staking rewards for verified members (ends in 2 days)"
  ],
  note: "Only members with an active Soulbound Token (SBT) can create or vote on proposals."
},

votes: {
  title: "🗳️ Recent Voting Results",
  description: "Latest DAO voting outcomes verified on-chain and validated by the community.",
  list: [
    "✔️ Proposal #01: Adopt the official WorkDAO Governance Charter → <span class='text-[#00BFFF]'>Approved (142 valid votes)</span>",
    "🕒 Proposal #02: Treasury management framework → <span class='text-yellow-400'>Pending (voting ends soon)</span>"
  ],
  note: "A minimum quorum of 10% of active members is required for proposal validation. All results are permanently recorded on-chain."
}

}
