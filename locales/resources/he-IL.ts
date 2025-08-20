import { Resources } from "../types";
import laptop from "@/public/images/homepage/laptop.jpg";
import support from "@/public/images/homepage/support.jpg";
import stamp from "@/public/images/homepage/stamp.jpg";
import printing from "@/public/images/homepage/printing.jpg";

export const heResources: Resources = {
  direction: "rtl",
  nav: {
    pricing: "מחירון",
    chapterManagement: "ניהול פרק",
    bookManagement: "ניהול ספר",
    booksManagement: "הספרים שלי",
    home: "דף הבית",
  },
  home: {
    title: "תעד את סיפורי חייך",
    description:
      "אגתה מופעלת באמצעות טכנולוגיה מתקדמת שמאפשרת לך לשתף את סיפור חייך, בין אם בדיבור ובין אם בכתיבה — ללא צורך בניסיון קודם…",
    buttonText: "בואו נתחיל",
    assistants: "בחר את העוזר שלך",
    contactUs: "צור קשר",
    email: ' דוא"ל',
    emailValue: "contact@agatha.com",
    phone: "טלפון",
    phoneValue: "(123) 456-7890",
    address: "כתובת",
    addressValue: "שדרה 123, תל אביב, ישראל",
  },
  cover: {
    title: "עיצוב כריכה",
    description: "התאמה אישית של כריכת הספר שלך עם האפשרויות למטה",
    backText: "חזור",
    titleText: "כותרת",
    subtitleText: "כותרת משנה",
    backgroundColorText: "צבע רקע",
    coverPhotoText: "תמונת כריכה",
    optionalText: "(אופציונלי)",
    save: "שמור",
    cancel: "בטל",
    backCoverTitleText: "כותרת כריכה אחורית",
    backCoverDescriptionText: "תיאור כריכה אחורית",
    coverPhoto: "תמונת כריכה",
    exportAsPDF: "ייצא כ-PDF",
    designYourCover: "עצב את הכריכה שלך",
    directionText: "כיוון הכתיבה",
  },

  covers: {
    editCover: "ערוך כריכה",
    previewBook: "תצוגה מקדימה",
    deleteBook: "מחיקת ספר",
    orderBook: "הזמן ספר",
    addChapter: "הוסף פרק",
    chapters: "פרקים",
  },
  books: {
    editBook: "ערוך ספר",
    myBooks: "הספרים שלי",
    createBook: "צור ספר",
    chapters: "פרקים",
  },
  
  bookSummary: {
    needGender: true,
    first: " פרק ",
    second: " נא לפנות אליי בלשון ",
    third: " אני במהלך עבודה על פרק ,",
    forth: " אלו הפרקים: ,",

    male: " זכר ",
    female: " נקבה ",
    char: "ע",
  },
  languageMenu: {
    title: "שפה",
    en: "English",
    he: "עברית",
    es: "Español",
  },
  accessability: {
    title: "תפריט נגישות",
    contrastHigh: "ניגודיות גבוהה",
    contrastNormal: "ניגודיות רגילה",
    biggerText: "הגדל טקסט",
    smallerText: "הקטן טקסט",
    startAnimations: "הפעלת אנימציות",
    stopAnimations: "עצירת אנימציות",
    showImages: "הצגת תמונות",
    hideImages: "הסתרת תמונות",
    textAlignLeft: "ישור טקסט לשמאל",
    textAlignCenter: "ישור טקסט למרכז",
    textAlignRight: "ישור טקסט לימין",
    textAlignClear: "בטל ישור",
    lineHeight: "גובה",
    pageStructure: "מבנה הדף",
    tabTitles: "כותרת",
    tabLinks: "קישורים",
    tabParagraphs: "סעיפים",
  },
  pdf: {
    title: "הספר שלך מוכן",
    description: "הספר שלך מוכן להורדה",
    buttonText: "הורד את הספר שלך",
    btnGenerating: "מייצר את ה-PDF שלך...",
    pagesNumber: "מספר עמודים ",
    openPDF: "פתח כPDF",
  },
  editor: {
    apply: "החל על פרק זה",
    chat: "שיחה",
    editor: "ערוך",
    chapters: "פרקים",
    title: "כותרת",
    save: "שמור פרק",
    select: "בחר",
    close: "סגור",
    enterMessage: "הקלד הודעה",
    confirm: "האם אתה מאשר את הטקסט הזה?",
    failed: "סליחה, אבל אנחנו חווים קשיים. אנא נסה שוב מאוחר יותר.",
    char: "ע",
    helloMessage1: "___ הי, שמי  ",
    helloMessage2: " ,ואני בתהליך כתיבת סיפור אישי חדש ",
    helloMessage3: ", אני בעבודה על פרק: ",
    helloMessage4: ". אני כותב את הסיפור בצורת - ",
    helloMessage5: ". זה מה שכתבתי עד כה: ",
    helloMessage6: ". אנא הגב בשפה ",
    helloMessage7: ".  איך נמשיך? אתה יכול להציג את עצמך בשם:",
    createSummary:
      "___ זהו הפרק, אנא סכם אותו, אין צורך להשיב, לאחר מכן קרא לפונקציה provide_summary והחזר את הסיכום שם: ",
    apprrove: "אשר",
    reject: "דחה",
    helpPrompt: "האם אתה זקוק לעזרה בניסוח מחדש של הטקסט שנבחר?",
    helpRequired: "כן בבקשה",
    chapterLabel: "פרק",
    saveButton: "שמור",
  },
  homepageCards: {
    cards: [
      {
        imgSrc: laptop,
        title: "טכנולוגיה חדשנית – ספר את הסיפור שלך בקול או בכתב",
        description:
          "אגתה מופעלת על ידי טכנולוגיה מתקדמת שמאפשרת לך לשתף את סיפור חייך בדיבור או בכתיבה – בלי צורך בניסיון קודם...",
      },
      {
        imgSrc: support,
        title: "הדרכה וליווי צעד אחר צעד לאורך כל הדרך",
        description:
          "אגתה תלווה אותך בכל שלב בתהליך הכתיבה – שלב אחר שלב – מהרעיון הראשוני ועד קבלת הספר המודפס.",
      },
      {
        imgSrc: stamp,
        title: "עריכה מקצועית – הפיכת כתיבת סיפור אישי לפשוטה וברורה",
        description:
          "אגתה כוללת כלים לעריכה מקצועית שמלטשים ומשדרגים את הסיפור האישי שלך, תוך הבטחת בהירות, רצף סיפורי ועניין לקורא.",
      },
      {
        imgSrc: printing,
        title: "הדפסה באיכות גבוהה ומשלוח עד הבית",
        description:
          "הספר המוגמר שלך מודפס באיכות פרימיום ונשלח ישירות לביתך – מוכן לחלוקה לאהוביך ולשימור המורשת לדורות הבאים.",
      },
    ],
  },
  // c2title: "הדרכה וליווי צעד אחר צעד לאורך כל הדרך",
  // c1title: "טכנולוגיה חדשנית – ספר את הסיפור שלך בקול או בכתב",
  // c1description:
  //   "אגתה מופעלת על ידי טכנולוגיה מתקדמת שמאפשרת לך לשתף את סיפור חייך בדיבור או בכתיבה – בלי צורך בניסיון קודם...",
  // c2title: "הדרכה וליווי צעד אחר צעד לאורך כל הדרך",
  // c2description:
  //   "אגתה תלווה אותך בכל שלב בתהליך הכתיבה – שלב אחר שלב – מהרעיון הראשוני ועד קבלת הספר המודפס.",
  // c3title: "עריכה מקצועית – הפיכת כתיבת סיפור אישי לפשוטה וברורה",
  // c3description:
  //   "אגתה כוללת כלים לעריכה מקצועית שמלטשים ומשדרגים את הסיפור האישי שלך, תוך הבטחת בהירות, רצף סיפורי ועניין לקורא.",
  // c4title: "הדפסה באיכות גבוהה ומשלוח עד הבית",
  // c4description:
  //   "הספר המוגמר שלך מודפס באיכות פרימיום ונשלח ישירות לביתך – מוכן לחלוקה לאהוביך ולשימור המורשת לדורות הבאים.",
  // },
};
