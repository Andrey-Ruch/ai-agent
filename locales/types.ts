export type AvailableLocale = "en-US" | "he-IL" | "es-ES";

export interface NavResources {
  chapterManagement: string;
  bookManagement: string;
  booksManagement: string;
  home: string;
  pricing: string;
}

export interface HomeResources {
  title: string;
  description: string;
  buttonText: string;
  assistants: string;
  contactUs: string;
  email: string;
  emailValue: string;
  phone: string;
  phoneValue: string;
  address: string;
  addressValue: string;
}

export interface PdfResources {
  title: string;
  description: string;
  buttonText: string;
  btnGenerating: string;
  pagesNumber: string;
  openPDF: string;
}

export interface HomepageCards {
  cards: HomePageCard[];
}

export interface HomePageCard {
  imgSrc: string | import("next/image").StaticImageData;
  title: string;
  description: string;
}

export interface Cover {
  title: string;
  description: string;
  backText: string;
  titleText: string;
  subtitleText: string; 
  backgroundColorText: string;
  coverPhotoText: string;
  optionalText: string;
  save: string;
  cancel: string;
  backCoverTitleText: string;
  backCoverDescriptionText: string;
  coverPhoto: string;
  exportAsPDF: string;
  designYourCover: string;
  directionText: string;
}
export interface Books{
  editBook: string;
  myBooks: string;
  createBook: string;
  chapters: string;
}

export interface CoversResources {
  editCover: string;
  previewBook: string;
  deleteBook: string;
  orderBook: string;
  addChapter: string;
  chapters: string;
}

export interface BookSummary {
  needGender: boolean;
  first: string;
  second: string;
  third: string;
  forth: string;
  male: string;
  female: string;
  char: string;
}

export interface LanguageMenu {
  title: string;
  en: string;
  he: string;
  es: string;
}

export interface Accessability {
  title: string;
  contrastHigh: string;
  contrastNormal: string;
  biggerText: string;
  smallerText: string;
  startAnimations: string;
  stopAnimations: string;
  hideImages: string;
  showImages: string;
  textAlignLeft: string;
  textAlignCenter: string;
  textAlignRight: string;
  textAlignClear: string;
  lineHeight: string;
  pageStructure: string;
  tabTitles: string;
  tabLinks: string;
  tabParagraphs: string;
}

export interface BookEditorResources {
  apply: string;
  chat: string;
  editor: string;
  chapters: string;
  close: string;
  select: string;
  save: string;
  enterMessage: string;
  title: string;
  confirm: string;
  failed: string;
  char: string;
  helloMessage1: string;
  helloMessage2: string;
  helloMessage3: string;
  helloMessage4: string;
  helloMessage5: string;
  helloMessage6: string;
  helloMessage7: string;
  createSummary: string;
  apprrove: string;
  reject: string;
  helpPrompt: string;
  helpRequired: string;
  chapterLabel: string;
  saveButton: string;
}

export interface Resources {
  direction: "ltr" | "rtl";
  nav: NavResources;
  home: HomeResources;
  covers: CoversResources;
  bookSummary: BookSummary;
  languageMenu: LanguageMenu;
  accessability: Accessability;
  pdf: PdfResources;
  editor: BookEditorResources;
  homepageCards: HomepageCards;
  cover: Cover;
  books: Books;
}
