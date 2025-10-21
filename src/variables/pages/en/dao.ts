export const daoTextsEn = {
  header: {
    title: "🏛️ WorkDAO Governance",
    description: `The <b>WorkDAO</b> is a decentralized governance system that regulates,
    secures, and evolves the Work ecosystem.  
    Every vote, mission, and
    <span class="text-[#00BFFF] font-semibold">$WORK</span> token strengthens
    collective trust and autonomy.`
  },

  accessRules: {
    title: "⚖️ Governance Access Rules",
    list: [
      "✅ Governance is accessible only after a <b>validated contract</b> between two users.",
      "💎 Members must have completed at least one <b>$WORK staking</b> to vote or propose.",
      "⚔️ In case of dispute, <b>15% of staked $WORK</b> is redistributed to voting governors.",
      "🚫 Illegal activity leads to <b>account suspension</b> and <b>frozen $WORK</b> funds."
    ]
  },

  charter: {
    title: "📜 WorkDAO Governance Charter",
    rules: [
      {
        title: "1. General Principles",
        text: "The DAO governs the decentralized freelance platform, defining its evolution, rules, and arbitration through on-chain smart contracts."
      },
      {
        title: "2. Membership",
        text: "Any active user may join. Option A: Soulbound token after validated transactions. Option B: Holding at least 100 $WORK tokens. Hybrid models combine both."
      },
      {
        title: "3. Member Rights & Duties",
        list: [
          "Propose protocol upgrades or new features.",
          "Vote on DAO parameters, arbitrator selection, and treasury spending.",
          "Access full transparency on DAO reports and treasury balances.",
          "Act ethically and report fraud or abuse."
        ]
      },
      {
        title: "4. Voting System",
        text: "On-chain voting ensures transparency. 1 member = 1 vote (Soulbound) or weighted by $WORK holdings (capped). Quorum: 20% of active members or 10% of token supply. Each vote lasts 7 days. Emergency votes can pause a contract for 72 hours."
      },
      {
        title: "5. Dispute Arbitration",
        text: `
          Disputes are resolved by a <b>pool of DAO arbitrators</b> through a transparent on-chain process:<br><br>
          <ol class='list-decimal ml-6 space-y-1'>
            <li>Filing of the dispute by a user.</li>
            <li>Random selection of a <b>jury of 5 arbitrators</b>.</li>
            <li>Analysis of submitted evidence stored on-chain or via IPFS.</li>
            <li>Majority vote determines fund attribution.</li>
          </ol>
          <br />
          <b>Rewards:</b><br />
          - Arbitrators are paid in stablecoins and receive additional <b>$WORK bonuses</b>.<br />
          - Unethical or inactive arbitrators are <b>penalized (slashing)</b> and lose part of their stake or reputation.
        `
      },
      {
        title: "6. Treasury & Funding",
        text: "1% of all transactions fund the DAO Treasury. 50% Arbitration & Security, 30% Technical Development, 20% Growth & Community. Expenses above 5,000 $WORK require DAO approval."
      },
      {
        title: "7. Transparency & Audit",
        text: "All DAO decisions and transactions are recorded on-chain. Smart contracts are audited and reports published quarterly via IPFS."
      },
      {
        title: "8. Scalability & Evolution",
        text: "The DAO evolves through formal proposals (DIP): Soulbound→$WORK migration, multi-chain deployment, hybrid governance, sub-DAOs."
      },
      {
        title: "9. Accessibility & Inclusion",
        text: "Documents available in English, French, and Spanish. Regional sub-DAOs ensure equitable participation worldwide."
      },
      {
        title: "10. Conclusion",
        text: "The WorkDAO Charter forms the foundation of a transparent, decentralized, and community-driven ecosystem. <br><br><i>“One Work, One Network, One DAO.”</i>"
      }
    ]
  },

  proposals: {
    title: "📜 Active Proposals",
    items: [
      "🕒 Proposal #32: Adjust treasury allocation (ends in 3 days)",
      "🕒 Proposal #31: Add new arbitrator selection system (ends in 2 days)"
    ],
    note: "Only members with active staking or a Soulbound token can create proposals."
  },

  votes: {
    title: "🗳️ Voting History",
    description: "Verified DAO votes from active members (weighted and quorum-based).",
    list: [
      "✔️ Proposal #30: Increase staking rewards → <span class='text-[#00BFFF]'>Approved (128 valid votes)</span>",
      "❌ Proposal #29: Reduce quorum → <span class='text-red-400'>Rejected (42 valid votes)</span>",
      "🕒 Proposal #28: Integrate Base Network → <span class='text-yellow-400'>Pending (vote ends soon)</span>"
    ],
    note: "A minimum quorum of 20% is required, and all votes are validated on-chain."
  }
}
