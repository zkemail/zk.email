const ZKP2PProjectLogo = "/assets/zkp2p.webp";
const ProofOfTwitterLogo = "/assets/Twitter.png";
const AccountRecoveryLogo = "/assets/Recovery.png";
const BlueprintRegistryLogo = "/assets/Blueprint.png";
const EmailWalletLogo = "/assets/EmailWallet.png";
const ZKWhistleblowLogo = "/assets/ZKWhistleblow.png";
const ArchiveLogo = "/assets/ArchiveLogo.png";
const GithubLogo = "/assets/GithubLogo.png";
const Safe2FALogo = "/assets/Safe2FA.png";

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
    imgSrc: Safe2FALogo,  
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
    link: "https://registry.zk.email/0fe3a285-dc6e-4843-b9f6-5f3c27cd3847"
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
    imgSrc: GithubLogo,
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
    imgSrc: ArchiveLogo,
    link: "https://archive.zk.email"
  },
];
