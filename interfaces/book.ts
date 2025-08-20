// export interface book {
//     text: string;
//     chapter: string ;

// import exp from "constants"

//   }
export type books = Book[];

export type chapters = chapter[];

export interface chapter {
  _id: string;
  title: string;
  book: string;
  content: string;
  chapterNumber: number;
  // images?: string[];
  summary: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: BookStatus;
}

export interface SwiperBookProps {
  pageImages: string[];
}

export interface Book {
  _id: string;
  title: string;
  subTitle: string; 
  backCoverTitle: string;
  backCoverDescription: string;
  user: bookUser;
  coverPhoto: string;
  coverColor: string;
  createdAt: string;
  updatedAt: string;
  language: string;
  direction: "ltr" | "rtl"; // Added for language direction
  __v: number;
  status: BookStatus;
  threadId?: string;
  imagesPath?: string[]; // Array of image URLs
}

export interface bookUser {
  _id: string;
  name: string;
  email?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface bookWithChapters {
  book: Book;
  chapters: chapter[];
}

export interface BookChapter {
  title: string;
  content: string;
  // images?: chapterImage[];
}

export interface chapterImage {
  url: string;
  caption?: string;
}

export enum BookStatus {
  Draft = "draft",
  Published = "published",
  Deleted = "deleted",
  New = "new",
}

export interface BookData {
  cover: string;
  title: string;
  author: string;
  language?: string;
  chapters: BookChapter[];
  color?: string;
  threadId?: string;
  status: BookStatus;
}
