const ZKP2PProjectLogo = "/assets/zkp2p.webp";
const ProofOfTwitterLogo = "/assets/Twitter.png";
const AccountRecoveryLogo = "/assets/Recovery.png";
const BlueprintRegistryLogo = "/assets/Blueprint.png";
const EmailWalletLogo = "/assets/EmailWallet.png";
const ZKWhistleblowLogo = "/assets/ZKWhistleblow.png";

export const PROJECTS = [
  {
    title: "Account Recovery",
    description:
      "Recover any Safe wallet or smart wallet via email addresses",
    imgSrc: AccountRecoveryLogo,
    link: "https://recovery.zk.email"
  },
  {
    title: "Blueprint Registry",
    description:
      "List of community submitted ZK Email blueprints to prove different kinds of emails",
    imgSrc: BlueprintRegistryLogo,
    link: "https://registry.zk.email"
  },
  {
    title: "ZKP2P",
    description:
      "Peer to peer decentralized marketplaces on Ethereum. Trade domains with Namecheap emails and onramp/offramp via UPI, Garanti, and more.",
    imgSrc: ZKP2PProjectLogo,
    link: "https://zkp2p.xyz"
  },
  {
    title: "Safe 2FA",
    description: "Confirm any multisig transaction via an email.",
    imgSrc: ZKWhistleblowLogo,
    link: "https://zk.email/blog/2fa"
  },
  {
    title: "Decentralized Oauth Login",
    description: "Authorize any session key to scoped wallet access via emails.",
    imgSrc: ZKWhistleblowLogo,
    link: "https://oauth.emailwallet.org"
  },
  {
    title: "Proof of Twitter",
    description:
      "Prove you own a Twitter (X) username on-chain, via any email from Twitter/X.",
    imgSrc: ProofOfTwitterLogo,
    link: "https://registry.zk.email/bb6b1400-8882-48db-a473-76daefef510b"
  },
  {
    title: "Email Wallet",
    description: "Send or receive assets just by sending an email.",
    imgSrc: EmailWalletLogo,
    link: "https://emailwallet.org"
  },
  {
    title: "ZK Proof of Github",
    description: "Prove you own a github account.",
    imgSrc: ZKWhistleblowLogo,
    link: "https://registry.zk.email/526bb307-61ec-4c1d-8cd9-d393727b60c0"
  },
  {
    title: "Nozee Proof of Organization",
    description: "Prove you own an @domain account, and anonymously post from it.",
    imgSrc: ZKWhistleblowLogo,
    link: "https://www.nozee.xyz"
  },
  {
    title: "DKIM Archive",
    description: "Archives over a million old DKIM keys and selectors for various domains.",
    imgSrc: ZKWhistleblowLogo,
    link: "https://archive.zk.email"
  },
];
