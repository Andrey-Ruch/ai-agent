import { Resources } from "../types";
import laptop from "@/public/images/homepage/laptop.jpg";
import support from "@/public/images/homepage/support.jpg";
import stamp from "@/public/images/homepage/stamp.jpg";
import printing from "@/public/images/homepage/printing.jpg";

export const enResources: Resources = {
  direction: "ltr",
  nav: {
    pricing: "Pricing",
    chapterManagement: "Chapter Management",
    bookManagement: "My Book",
    booksManagement: "My Books",
    home: "Home",
  },
  home: {
    title: "Capture the stories of your life",
    description:
      "Agatha is powered by advanced technology that allows you to share your life story either by speaking or writing — no prior experience needed…",
    buttonText: "Get Started",
    assistants: "Choose your assistant",
    contactUs: "Contact Us",
    email: "Email",
    emailValue: "contact@agatha.com",
    phone: "Phone",
    phoneValue: "(123) 456-7890",
    address: "Address",
    addressValue: "Ave 123, Tel-Aviv, Israel",
  },
  cover: {
    title: "Cover Design",
    description: "Customize your book cover with the options below",
    backText: "Back",
    titleText: "Title",
    subtitleText: "Subtitle",
    backgroundColorText: "Background Color",
    coverPhotoText: "Cover Photo",
    optionalText: "(Optional)",
    backCoverTitleText: "Back Cover Title",
    backCoverDescriptionText: "Back Cover Description",
    save: "Save",
    cancel: "Cancel",
    coverPhoto: "Cover Photo",
    exportAsPDF: "Export as PDF",
    designYourCover: "Design your cover",
    directionText: "Direction",
  },
  covers: {
    editCover: "Edit Cover",
    previewBook: "Preview Book",
    deleteBook: "Delete Book",
    orderBook: "Order Book",
    addChapter: "Add Chapter",
    chapters: "Chapters",
    
  },
  books: {
    editBook: "Edit Book",
    myBooks: "My Books",
    createBook: "Create Book",
    chapters: "Chapters",
  },
  bookSummary: {
    needGender: false,
    first: " Chapter ",
    second: ". ",
    third: " I am currently working on chapter ",
    forth: ", These are the chapters: ",
    male: " male ",
    female: " female ",
    char: " ",
  },
  languageMenu: {
    title: "Language",
    en: "English",
    he: "עברית",
    es: "Español",
  },
  accessability: {
    title: "Accessibility Menu",
    contrastHigh: "High Contrast",
    contrastNormal: "Normal Contrast",
    biggerText: "Bigger Text",
    smallerText: "Smaller Text",
    startAnimations: "Start Animations",
    stopAnimations: "Stop Animations",
    showImages: "Show Images",
    hideImages: "Hide Images",
    textAlignLeft: "Text Align Left",
    textAlignCenter: "Text Align Center",
    textAlignRight: "Text Align Right",
    textAlignClear: "Text Align Clear",
    lineHeight: "Line Height",
    pageStructure: "Page Structure",
    tabTitles: "Titles",
    tabLinks: "Links",
    tabParagraphs: "Paragraphs",
  },
  pdf: {
    title: "Your Book",
    description: "Book Summary",
    buttonText: "Generate PDF",
    btnGenerating: "Generating PDF...",
    pagesNumber: " pages",
    openPDF: "Open as PDF",
  },
  editor: {
    apply: "Apply to this chapter",
    chat: "Chat",
    editor: "Editor",
    chapters: "Chapters",
    title: "title",
    save: "Save Chapter",
    select: "Select",
    close: "Close",
    enterMessage: "Enter your message",
    confirm: "Do you approve this text?",
    failed:
      "I am sorry, but we are experiencing difficulties. Please try again later.",
    char: "",
    helloMessage1: "___ hi, my name is  ",
    helloMessage2: " ,I am starting to write a new personal story",
    helloMessage3: ", I am working on the chapter: ",
    helloMessage4: ". I use the form of writing ",
    helloMessage5: ". this is what I wrote: ",
    helloMessage6: ". please respond in language ",
    helloMessage7:
      ". how should we continue? you can introduce yourself by the name:",
    createSummary:
      "___ this is the chapter please summarize it, no need to reply, then call provide_summary function and return the summary there: ",
    apprrove: "Approve",
    reject: "Reject",
    helpPrompt: "Do you need my help rewriting the selected text?",
    helpRequired: "Yes Please",
    chapterLabel: "Chapter",
    saveButton: "Save",
  },
  homepageCards: {
    cards: [
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
    ],

    // c1title: "Innovative Technology – Tell Your Story by Voice or in Writing",
    // c1description:
    //   "Agatha is powered by advanced technology that allows you to share your life story either by speaking or writing—no prior experience needed…",
    // c2title: "Step-by-Step Guidance and Support Throughout the Journey",
    // c2description:
    //   "Agatha will guide you through every stage of the writing process—step by step—from the initial idea to receiving your printed book.",
    // c3title:
    //   "Professional Editing – Making Personal Story Writing Simple and Achievable",
    // c3description:
    //   "Agatha contains professional editing tools to refine and enhance your personal story, ensuring clarity, coherence, and engaging storytelling.",
    // c4title: "High-Quality Printing and Home Delivery",
    // c4description:
    //   "Your finished book is printed in premium quality and delivered directly to your home—perfectly prepared for sharing with your loved ones and preserving your legacy for generations to come.",
  },
};
