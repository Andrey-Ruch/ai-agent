import { StaticImageData } from "next/image";
import laptop from "@/public/images/homepage/laptop.jpg";
import support from "@/public/images/homepage/support.jpg";
import stamp from "@/public/images/homepage/stamp.jpg";
import printing from "@/public/images/homepage/printing.jpg";

export interface FeatureCardData {
  imgSrc: StaticImageData;
  title: string;
  description: string;
}

// Data structure with keys for internationalization
export const featureCardsData: FeatureCardData[] = [
  {
    imgSrc: laptop,
    title: "Innovative Technology – Tell Your Story by Voice or in Writing",
    description:
      "Agatha is powered by advanced technology that allows you to share your life story either by speaking or writing—no prior experience needed…",
  },
  {
    imgSrc: support,
    title: "Step-by-Step Guidance and Support Throughout the Journey",
    description:
      "Agatha will guide you through every stage of the writing process—step by step—from the initial idea to receiving your printed book.",
  },
  {
    imgSrc: stamp,
    title:
      "Professional Editing – Making Personal Story Writing Simple and Achievable",
    description:
      "Agatha contains professional editing tools to refine and enhance your personal story, ensuring clarity, coherence, and engaging storytelling.",
  },
  {
    imgSrc: printing,
    title: "High-Quality Printing and Home Delivery",
    description:
      "Your finished book is printed in premium quality and delivered directly to your home—perfectly prepared for sharing with your loved ones and preserving your legacy for generations to come.",
  },
];
