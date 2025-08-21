import { getBooksByAuthor, getChaptersByBook } from "@/lib/connectDB";
import {
    bookWithChapters,
    books,
    // chapter,
    BookStatus,
  } from "@/interfaces/book";
import logToFile, { logType } from "../logToFile";

const emptyBook = {
    book: {
      _id: "",
      title: "",
      subTitle: "",
      user: { _id: "", name: "" },
      coverPhoto: "",
      coverColor: "",
      createdAt: "",
      updatedAt: "",
      language: "",
      __v: 0,
      status: BookStatus.Draft,
      backCoverTitle: "",
      backCoverDescription: "",
   
      direction: "ltr" as "ltr" | "rtl", // Default direction

    },
    chapters: [],
  };
  export const getBookByMailAndID = async (
    userID: string,
    bookID: string
  ): Promise<bookWithChapters> => {
    try {
      // logToFile(
      //   `getBookByMailAndID called with userID: ${userID}, bookID: ${bookID}`,
      //   logType.error
      // );
      const authorBooks: books = await getBooksByAuthor(userID);
      // logToFile("books: " + JSON.stringify(authorBooks), logType.debug);
      const book = authorBooks.find((b) => b._id == bookID);
  
      if (!book) {
        logToFile(`Book with ID ${bookID} not found for user ${userID}`, logType.error);
        return emptyBook;
      }
  

      const bookWithChapters:bookWithChapters = await getChaptersByBook(book._id);
  
      logToFile(
        "bookWithChapters: " + JSON.stringify(bookWithChapters),
        logType.info
      );
      return bookWithChapters;
    } catch (error) {
      logToFile("Error getFirstBook: " + error, logType.error);
      return emptyBook;
    }
  }
 export const getFirstBookByMail = async (
    userID: string
  ): Promise<bookWithChapters> => {
    try {
      logToFile(`getFirstBookByMail called with userID: ${userID}`, logType.error);
      const authorBooks: books = await getBooksByAuthor(userID);
      const firstBook = authorBooks[0];
  
      const bookWithChapters:bookWithChapters = await getChaptersByBook(firstBook._id);
  
      // const bookWithChapters: bookWithChapters = {
      //   book: firstBook,
      //   chapters: chapters,
      // };
      logToFile(
        "bookWithChapters: " + JSON.stringify(bookWithChapters),
        logType.info
      );
      return bookWithChapters;
    } catch (error) {
      logToFile("Error getFirstBook: " + error, logType.error);
      return emptyBook;
    }
  };
  