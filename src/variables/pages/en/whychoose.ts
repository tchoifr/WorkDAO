export interface WhyChooseSection {
  header: {
    title: string
    description: string
  }
  card: {
    title: string
    points: string[]
    note: string
  }
}

// ✅ On ajoute un typage strict avec index signature pour TypeScript
export const whyChooseTextsEn: Record<string, WhyChooseSection> = {
  decentralized: {
    header: {
      title: "🌍 Decentralized Freedom",
      description: `
        In WorkDAO, no corporation or government dictates your work.
        All interactions, contracts, and payments are handled by smart contracts,
        ensuring total transparency and equality.`
    },
    card: {
      title: "How Decentralization Empowers You",
      points: [
        "Each contract is stored and verified on the blockchain — no manual oversight.",
        "You connect directly with clients and collaborators, no intermediaries.",
        "DAO rules are written in code, not controlled by companies.",
        "Payments are automatic, unstoppable once terms are met.",
        "Anyone, anywhere can join and participate freely."
      ],
      note: "Your freedom is coded — not granted. No one can take it away."
    }
  },

  securedByBlockchain: {
    header: {
      title: "💰 Secured by Blockchain",
      description: `
        Every transaction in WorkDAO is immutable, traceable, and verified.
        The blockchain ensures trust without needing a central authority.`
    },
    card: {
      title: "Security at the Core",
      points: [
        "Smart contracts guarantee payment once milestones are reached.",
        "No risk of fraud — everything is cryptographically recorded.",
        "Your data and identity remain under your control.",
        "Audits and open-source code ensure transparency.",
        "Security isn’t a feature — it’s the foundation of WorkDAO."
      ],
      note: "Immutable, transparent, unstoppable — that’s real trust."
    }
  },

  rewarding: {
    header: {
      title: "🪙 Rewarding Ecosystem",
      description: `
        WorkDAO values contribution. Every completed task, idea, or vote
        earns you $WORK tokens — your share of the ecosystem.`
    },
    card: {
      title: "Earning Beyond Money",
      points: [
        "Earn $WORK tokens for work, proposals, and governance participation.",
        "Stake tokens to access premium missions or DAO rights.",
        "Contribute to the community and earn reputation NFTs.",
        "Collaborate, build, and grow with other skilled members.",
        "Value is shared, not extracted."
      ],
      note: "$WORK is more than a token — it’s your voice and your power."
    }
  },

  daoGovernance: {
    header: {
      title: "⚖️ DAO Governance",
      description: `
        Decisions at WorkDAO are made by its members. Through token-weighted
        voting, proposals, and transparency, you help shape the future of work.`
    },
    card: {
      title: "Transparent Collective Power",
      points: [
        "Every member can create or vote on proposals.",
        "Voting power scales with contribution and $WORK staking.",
        "Community-driven arbitration replaces centralized judgment.",
        "All decisions are recorded publicly on-chain.",
        "Governance is not bureaucracy — it’s democracy powered by code."
      ],
      note: "You don’t work for WorkDAO — you are WorkDAO."
    }
  },

  noMiddlemen: {
    header: {
      title: "🚫 No Middlemen",
      description: `
        Forget traditional freelancing platforms taking cuts and control.
        WorkDAO connects freelancers and clients directly, peer to peer.`
    },
    card: {
      title: "Fair Work, Fair Pay",
      points: [
        "Zero platform fees — 100% of what you earn is yours.",
        "Smart contracts automate trust without intermediaries.",
        "Work relationships are transparent and verifiable.",
        "The DAO doesn’t own your labor — you do.",
        "A global network built on fairness, not fees."
      ],
      note: "You earn it, you keep it — that’s true decentralization."
    }
  },

  sovereignIdentity: {
    header: {
      title: "🧠 Sovereign Digital Identity",
      description: `
        Your profile, reputation, and skills exist on-chain through
        identity NFTs — owned by you, portable across the Web3 world.`
    },
    card: {
      title: "Identity Reimagined",
      points: [
        "Your professional history is stored as verifiable credentials.",
        "NFT-based profiles prevent manipulation and fake resumes.",
        "No platform can delete or modify your achievements.",
        "Privacy and transparency coexist through cryptographic proof.",
        "Your digital identity evolves with your work — forever yours."
      ],
      note: "You are not your profile — you are your verified legacy."
    }
  },

  globalMarketplace: {
    header: {
      title: "💼 Global Free Marketplace",
      description: `
        WorkDAO connects talent and opportunity worldwide,
        without borders, currencies, or intermediaries.`
    },
    card: {
      title: "One Planet, One Workforce",
      points: [
        "Hire or collaborate with anyone, anywhere in seconds.",
        "Payments and contracts function across borders seamlessly.",
        "No banks, no conversion fees — just value exchange.",
        "Open to all languages, skills, and cultures.",
        "A borderless, unstoppable economy of creators."
      ],
      note: "Talent has no borders — now your work doesn’t either."
    }
  },

  totalFreedom: {
    header: {
      title: "🕊 Total Freedom to Work",
      description: `
        WorkDAO gives you complete control — work when you want, with who you want,
        free from control, censorship, or exploitation.`
    },
    card: {
      title: "Work on Your Terms",
      points: [
        "No schedules, no approvals — you define your own mission flow.",
        "Smart contracts protect both sides without middle management.",
        "No one can censor your access or participation.",
        "Freedom to earn and express your creativity globally.",
        "Autonomy is not a dream — it’s your right."
      ],
      note: "Work should be free — not controlled."
    }
  },

  maximumSecurity: {
    header: {
      title: "🔐 Maximum Security",
      description: `
        WorkDAO architecture is designed for resilience, privacy,
        and fail-safe operations across every layer of the ecosystem.`
    },
    card: {
      title: "Your Safety Comes First",
      points: [
        "Zero single points of failure — decentralized infrastructure.",
        "Encrypted communication between members.",
        "Multi-signature wallets for shared governance funds.",
        "Smart contracts audited and open-source.",
        "You own your keys, you own your security."
      ],
      note: "Security is freedom — and in WorkDAO, you own both."
    }
  },

  communityRevolution: {
    header: {
      title: "🔥 The Community Revolution",
      description: `
        WorkDAO is not a company — it’s a movement. A collective of creators,
        developers, and dreamers redefining how humans collaborate.`
    },
    card: {
      title: "A New Era of Work",
      points: [
        "Every member is a co-owner of the ecosystem.",
        "We build tools, not hierarchies.",
        "Together we design fairer, freer systems of collaboration.",
        "Innovation comes from the crowd, not the boardroom.",
        "This isn’t the future of work — it’s the work of the future."
      ],
      note: "WorkDAO is the rebellion of creators — united by code and purpose."
    }
  }
}
