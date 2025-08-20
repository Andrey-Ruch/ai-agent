import { StaticImageData } from "next/image";
import book1 from "@/public/images/homepage/book1.png";
import book2 from "@/public/images/homepage/book2.png";
import book3 from "@/public/images/homepage/book3.png";
import book4 from "@/public/images/homepage/book4.png";
import book5 from "@/public/images/homepage/book5.png";

export interface BookData {
  src: StaticImageData;
  alt: string;
}

export const booksData: BookData[] = [
  { src: book1, alt: "Book 1" },
  { src: book2, alt: "Book 2" },
  { src: book3, alt: "Book 3" },
  { src: book4, alt: "Book 4" },
  { src: book5, alt: "Book 5" },
];
