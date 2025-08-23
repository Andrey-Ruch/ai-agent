import { bookWithChapters } from '@/interfaces/book'
// import { toRoman } from "./gerateTableOfContents";
import { getResources } from '@/locales'

export function generateBookHTML(
    book: bookWithChapters,
    tableOfContents: {
        pageNumber: number
        title: string
        romanNumber: string
        chaptherNumber: number
    }[],
    nickName: string,
    language: string
): string {
    const AUTHOR = language === 'he-IL' ? 'מאת' : 'Author'
    const resources = getResources(language)
    // <h2 class="book-author">${AUTHOR}: ${nickName}</h2>
    console.log('Generating HTML for book:', book.book.title, AUTHOR, nickName, language)
    const TABLE_OF_CONTENTS = language === 'he-IL' ? 'תוכן עניינים' : 'Table of Contents'

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700&display=swap">
          <style>
            @font-face {
              font-family: 'Frank Ruhl Libre';
              src: url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700&display=swap');
            }
            
            body {
              font-family: 'Frank Ruhl Libre', serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              direction: ${language === 'he-IL' ? 'rtl' : 'ltr'};
            }
            img {
              max-width: 100% !important;
              height: auto;
              margin: 10px auto;
            }
            
            .chapter {
              margin-bottom: 40px;
              page-break-after: always;
            }
            
            .chapter-title {
              font-family: 'Frank Ruhl Libre', serif;
              font-weight: 700;
              font-size: 24px;
              margin-bottom: 20px;
              text-align: center;

              display: flex;
              justify-content: space-between;
              align-items: center;
             
              padding: 0 20px;

            }
  
            .book-title {
              font-family: 'Frank Ruhl Libre', serif;
              font-weight: 700;
              font-size: 48px;
              margin-bottom: 60px;
              text-align: center;
            }
              .book-author {
             font-family: 'Frank Ruhl Libre', serif;
              font-weight: 700;
              font-size: 24px;
              margin-bottom: 20px;
              text-align: center;
            }
  
            .chapter-content {
              font-family: 'Frank Ruhl Libre', serif;
              font-weight: 400;
              text-align: justify;
              margin-bottom: 20px;
            }
            
            .chapter-image {
              max-width: 100%;
              height: auto;
              margin: 20px 0;
              display: block;
            }
  
            .toc-entry {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin: 10px 0;
              padding: 0 20px;
            }
  
            .toc-dots {
              border-bottom: 1px dotted #000;
              flex: 1;
              margin: 0 10px;
            }
            .hidden
            {
              display: none;
              }
            @media print {
              body {
                font-family: 'Frank Ruhl Libre', serif;
              }
            }
          </style>
        </head>
        <body>
          <div class="chapter">
        
            <h1 class="book-title">${book.book.title}</h1>
            <h2 class="book-title">${book.book.subTitle}</h2>
          </div>
          
          <div class="chapter">
            <h2 class="chapter-title">${TABLE_OF_CONTENTS}</h2>
            ${tableOfContents
                .map(
                    (chapter) => `
              <div class="toc-entry">
                <span>${chapter.title}</span>
                <span class="toc-dots"></span>
                <span> ${resources.editor.chapterLabel} ${chapter.chaptherNumber}</span>
              </div>
            `
                )
                .join('')}
          </div>
  
          ${book.chapters
              .map(
                  (chapter) => `
            <div class="chapter">
              <h2 id="c_${chapter._id}" class="chapter-title">
            ${chapter.title}
              </h2>
              <div class="chapter-content">${chapter.content}</div>
              
            </div>
          `
              )
              .join('')}
        </body>
      </html>
    `
}
// ${
//               chapter.images
//               ?.map(
//                 (image) => `
//               <img class="chapter-image" src="${image}" alt="Chapter illustration" />
//             `
//               )
//               .join("")}
