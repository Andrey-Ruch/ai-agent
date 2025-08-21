import { bookWithChapters } from "@/interfaces/book";
import logToFile, { logType } from "../logToFile";
import { Page } from "puppeteer";

export async function gerateTableOfContents(book : bookWithChapters, page : Page, tableOfContents: { pageNumber: number; title: string, romanNumber:string, chaptherNumber: number }[], currentPage: number) {
   // Count pages for each chapter  
  for (const chapter of book.chapters) {
        try {
          // const chapterSelector = `h2.chapter-title:has-text("${chapter.title}")`;
          const chapterSelector = `#c_${chapter._id}`;
          const element = await page.$(chapterSelector);
          if (element) {
            tableOfContents.push({
              pageNumber: currentPage,
              title: chapter.title,
              romanNumber: toRoman(tableOfContents.length + 1),
              chaptherNumber: tableOfContents.length + 1
            });
  
            // Get the height of this chapter's content and calculate pages
            const chapterContent = await page.$(
              `${chapterSelector} + .chapter-content`
            );
            if (chapterContent) {
              const boundingBox = await chapterContent.boundingBox();
              const pageHeight = 297; // A4 height in mm
              const contentHeight = boundingBox ? boundingBox.height : 0;
              const pagesInChapter = Math.ceil(contentHeight / pageHeight);
              currentPage += pagesInChapter;
            }
          }
        } catch (error) {
          logToFile("Error counting pages: " + error, logType.error);
        }
      }
  return tableOfContents;
}

export function toRoman(num: number): string {
  if (num < 1 || num > 3999) return 'Out of range';

  const romanNumerals: { value: number, symbol: string }[] = [
    { value: 1000, symbol: 'M' },
    { value: 900,  symbol: 'CM' },
    { value: 500,  symbol: 'D' },
    { value: 400,  symbol: 'CD' },
    { value: 100,  symbol: 'C' },
    { value: 90,   symbol: 'XC' },
    { value: 50,   symbol: 'L' },
    { value: 40,   symbol: 'XL' },
    { value: 10,   symbol: 'X' },
    { value: 9,    symbol: 'IX' },
    { value: 5,    symbol: 'V' },
    { value: 4,    symbol: 'IV' },
    { value: 1,    symbol: 'I' },
  ];

  let result = '';
  for (const { value, symbol } of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}