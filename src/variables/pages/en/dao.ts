export const daoTextsEn = {
  header: {
    title: "🏛️ WorkDAO Governance",
    description: `
      The <b>WorkDAO</b> is the decentralized decision-making body that governs,
      secures, and evolves the entire Work ecosystem.  
      Each vote, mission, and
      <span class="text-[#00BFFF] font-semibold">$WORK</span> token contributes
      to building a transparent, autonomous, and community-led economy.`
  },

  accessRules: {
    title: "⚖️ Governance Participation Rules",
    list: [
      "✅ Governance access is granted only after a <b>verified smart contract</b> agreement between two users.",
      "💎 To vote or submit proposals, members must have performed at least one <b>$WORK staking</b> transaction.",
      "⚔️ In the event of a dispute, <b>15% of staked $WORK</b> is redistributed among the voting arbitrators.",
      "🚫 Fraudulent or illegal activity results in <b>account suspension</b> and <b>frozen $WORK assets</b>."
    ]
  },

  charter: {
    title: "📜 WorkDAO Governance Charter",
    rules: [
      {
        title: "1. General Principles",
        text: "The DAO governs the decentralized freelance ecosystem, managing its evolution, dispute resolution, and upgrades through transparent on-chain smart contracts."
      },
      {
        title: "2. Membership",
        text: "Any verified user can join the DAO. Entry options include: (A) Soulbound token obtained after a validated transaction, or (B) Holding at least 100 $WORK tokens. A hybrid model may combine both conditions for greater inclusivity."
      },
      {
        title: "3. Member Rights & Responsibilities",
        list: [
          "Submit proposals for protocol upgrades, governance rules, or new platform features.",
          "Vote on key parameters such as treasury allocation, arbitrator elections, and system policies.",
          "Access complete transparency on DAO budgets, votes, and governance reports.",
          "Act ethically and report any fraud, abuse, or malicious activity."
        ]
      },
      {
        title: "4. Voting Mechanism",
        text: `
          All votes are conducted <b>on-chain</b> to ensure fairness and transparency.  
          - Governance models: 1 member = 1 vote (Soulbound) or weighted voting based on $WORK holdings (with a cap).  
          - Quorum: 20% of active members or 10% of total token supply.  
          - Standard vote duration: 7 days.  
          - Emergency votes: can pause a smart contract for up to 72 hours.`
      },
      {
        title: "5. Dispute Resolution",
        text: `
          Disputes are managed by a <b>decentralized arbitration pool</b> using verifiable on-chain procedures:<br><br>
          <ol class='list-decimal ml-6 space-y-1'>
            <li>Submission of a dispute case by a user.</li>
            <li>Random selection of a <b>jury of 5 arbitrators</b>.</li>
            <li>Review of submitted evidence (stored on-chain or via IPFS).</li>
            <li>Majority vote determines fund allocation or sanctions.</li>
          </ol>
          <br />
          <b>Arbitrator Rewards:</b><br />
          - Paid in stablecoins + additional <b>$WORK bonuses</b> for active contribution.<br />
          - Dishonest or inactive arbitrators face <b>slashing penalties</b> and lose part of their stake or reputation score.
        `
      },
      {
        title: "6. Treasury & Funding Allocation",
        text: `
          The DAO Treasury receives <b>1% of all transactions</b> made on the platform.  
          Funds are distributed as follows:  
          - 50% → Arbitration & Security  
          - 30% → Technical Development  
          - 20% → Growth & Community  
          Any expense exceeding <b>5,000 $WORK</b> requires DAO-wide approval via vote.`
      },
      {
        title: "7. Transparency & Audit",
        text: "Every DAO decision, vote, and fund movement is permanently recorded on-chain. All smart contracts are audited, and quarterly transparency reports are published publicly via IPFS."
      },
      {
        title: "8. Scalability & Continuous Evolution",
        text: `
          The DAO evolves through <b>formal proposals (DIP)</b> that may include:  
          - Transition between Soulbound and $WORK-based governance  
          - Multi-chain deployment  
          - Creation of sub-DAOs  
          - Updates to voting or staking mechanisms`
      },
      {
        title: "9. Accessibility & Global Inclusion",
        text: "All DAO documentation and voting interfaces are available in English, French, and Spanish. Regional sub-DAOs ensure equal representation and fair participation worldwide."
      },
      {
        title: "10. Conclusion",
        text: `
          The <b>WorkDAO Charter</b> defines the foundation of a transparent, decentralized, and collaborative governance model.  
          It empowers members to shape the future of the Work ecosystem collectively.  
          <br><br><i>“One Work. One Network. One DAO.”</i>`
      }
    ]
  },

  proposals: {
    title: "📢 Active Governance Proposals",
    items: [
      "🕒 Proposal #32: Adjust treasury fund allocation (ends in 3 days)",
      "🕒 Proposal #31: Introduce a new decentralized arbitrator selection process (ends in 2 days)"
    ],
    note: "Only members with active staking or a Soulbound membership token can create or vote on proposals."
  },

  votes: {
    title: "🗳️ Recent Voting Results",
    description: "Validated voting outcomes from active DAO members, following on-chain verification and quorum requirements.",
    list: [
      "✔️ Proposal #30: Increase staking rewards → <span class='text-[#00BFFF]'>Approved (128 valid votes)</span>",
      "❌ Proposal #29: Reduce quorum threshold → <span class='text-red-400'>Rejected (42 valid votes)</span>",
      "🕒 Proposal #28: Integrate Base Network → <span class='text-yellow-400'>Pending (voting closes soon)</span>"
    ],
    note: "A minimum quorum of 20% is required for proposal validation. All results are permanently recorded on-chain."
  }
}
