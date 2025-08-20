export interface Book {
    _id: string;
    title: string;
    subTitle: string; 
    coverColor: string;
    coverPhoto: string;
    user: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    imagesPath?: string[]; // Array of image URLs
    
    direction: "ltr" | "rtl"; // Added for language direction

  }
  
  export interface BookWithChapters {
    id: string;
    title: string;
    subTitle: string; 
    coverColor: string;
    coverPhoto: string;
    chaptersCount: number;
   
    direction: "ltr" | "rtl"; // Added for language direction
  }
  
  export interface ApiResponse {
    message: string;
    books: Book[];
    count: number;
  }