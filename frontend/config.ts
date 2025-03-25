import Paper from "@/assets/placeholders/paper.jpg";
import Placeholder2 from "@/assets/placeholders/bear-2.png";
import Placeholder3 from "@/assets/placeholders/bear-3.png";
import SShiftLogo from "@/assets/placeholders/sshift-logo.png";
import { COLLECTION_ADDRESS, SOCIAL_X, SOCIAL_DISCORD, SOCIAL_TELEGRAM, SOCIAL_HOMEPAGE } from "./constants";

export const config: Config = {
  collection_id: COLLECTION_ADDRESS,

  // Removing one or all of these socials will remove them from the page
  socials: {
    twitter: SOCIAL_X,
    discord: SOCIAL_DISCORD,
    homepage: SOCIAL_HOMEPAGE,
    telegram: SOCIAL_TELEGRAM,
  },

  defaultCollection: {
    name: "Pages from the 📒",
    description: "Draw. Write, Mint. Grow the Collection. Join our ever-growing community of digital artists, dreamers, and storytellers. Each NFT begins with a blank page—then becomes a permanent entry in the ledger of human expression.",
    image: Paper,
  },

  ourStory: {
    title: "Community Canvas",
    subTitle: "Create Together",
    description:
      "This is a community-driven NFT collection where every piece is hand-drawn by members like you. Express yourself, create art that matters to you, and become part of our collective digital gallery.",
    discordLink: SOCIAL_DISCORD,
    images: [Paper, Placeholder2, Placeholder3],
  },

  ourTeam: {
    title: "Created By",
    members: [
      {
        name: "Singularity Shift Ltd",
        role: "Creator",
        img: SShiftLogo
      },
      {
        name: "SpielCrypto",
        role: "Creator",
        img: Placeholder2
      },
    ],
  },

  faqs: {
    title: "F.A.Q.",

    questions: [
      {
        title: "What is Community Canvas?",
        description:
          "Community Canvas is a user-generated NFT collection where members can draw their own artwork and mint it as an NFT for a fee in 📒. Each piece becomes part of our ever-growing community gallery.",
      },
      {
        title: "How do I create my own artwork?",
        description:
          "Once the drawing feature is launched, you'll be able to use our built-in drawing tool to create your artwork. Connect your wallet, create your masterpiece, and mint it to join the collection.",
      },
      {
        title: "How much does it cost to mint?",
        description:
          "Minting your artwork costs a small fee paid in 📒. This fee helps maintain the platform and ensures the quality of the collection.",
      },
    ],
  },
};

export interface Config {
  collection_id: string;

  socials?: {
    twitter?: string;
    discord?: string;
    homepage?: string;
    telegram?: string;
  };

  defaultCollection?: {
    name: string;
    description: string;
    image: string;
  };

  ourTeam?: {
    title: string;
    members: Array<ConfigTeamMember>;
  };

  ourStory?: {
    title: string;
    subTitle: string;
    description: string;
    discordLink: string;
    images?: Array<string>;
  };

  faqs?: {
    title: string;
    questions: Array<{
      title: string;
      description: string;
    }>;
  };
}

export interface ConfigTeamMember {
  name: string;
  role: string;
  img: string;
  socials?: {
    twitter?: string;
    discord?: string;
  };
}
