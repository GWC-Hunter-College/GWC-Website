import CareerArtwork from "../../assets/initiatives/career.png";
import LeetcodeArtwork from "../../assets/initiatives/leetcode.png";
import SpotlightArtwork from "../../assets/initiatives/spotlight.png";
import TradingCardsArtwork from "../../assets/initiatives/trading-cards.png";

export type InitiativeCategory = "Career" | "Community";

export type Initiative = {
  title: string;
  image: string;
  imageAlt: string;
  status: "Active";
  category: InitiativeCategory;
};

export const initiativeCategories: InitiativeCategory[] = ["Career", "Community"];

export const initiatives: Initiative[] = [
  {
    title: "Collectible Trading Cards",
    image: TradingCardsArtwork,
    imageAlt: "Three collectible playing cards",
    status: "Active",
    category: "Community",
  },
  {
    title: "Career Development QnA",
    image: CareerArtwork,
    imageAlt: "Briefcase representing career development",
    status: "Active",
    category: "Career",
  },
  {
    title: "Student Spotlight",
    image: SpotlightArtwork,
    imageAlt: "Spotlight representing the student spotlight initiative",
    status: "Active",
    category: "Community",
  },
  {
    title: "Leetcode Leaderboard",
    image: LeetcodeArtwork,
    imageAlt: "Browser window with code symbols",
    status: "Active",
    category: "Career",
  },
];
