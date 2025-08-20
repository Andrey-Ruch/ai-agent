import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface Book {
  src: StaticImageData;
  alt: string;
}

interface BooksRowProps {
  books: Book[];
}

const BooksRow: React.FC<BooksRowProps> = ({ books }) => {
  return (
    <div
      className="flex justify-evenly overflow-x-auto space-x-8 px-4 py-8"
      role="region"
      aria-label="Book showcase"
    >
      {books.map((book, index) => (
        <div
          key={index}
          className="relative h-40 w-32 sm:h-48 sm:w-36 md:h-56 md:w-40 lg:h-64 lg:w-48 flex-shrink-0"
        >
          <Image
            src={book.src}
            alt={book.alt}
            fill
            sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, (max-width: 1024px) 160px, 192px"
            priority={index < 3}
          />
        </div>
      ))}
    </div>
  );
};

export default BooksRow;
