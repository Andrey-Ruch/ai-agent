import { StaticImageData } from "next/image";
import anastasijaAvatar from "@/public/images/homepage/assistant1.jpg";
import ronAvatar from "@/public/images/homepage/assistant3.jpg";
import emmaAvatar from "@/public/images/homepage/assistant4.jpg";
import santiagoAvatar from "@/public/images/homepage/assistant5.jpg";
import laylaAvatar from "@/public/images/homepage/assistant6.jpg";
import mathieuAvatar from "@/public/images/homepage/Ron.png";

export interface AssistantData {
  imgSrc: StaticImageData;
  name: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export const assistantsData: AssistantData[] = [
  {
    imgSrc: mathieuAvatar,
    name: "Mathieu",
    description:
      "Bonjour, je suis Mathieu, votre écrivain personnel ! Je vous accompagne dans l'écriture de vos histoires – écouter, poser des questions, éditer et transformer vos souvenirs en un livre émouvant et significatif. Allons-y !",
    buttonText: "Allons-y!",
    buttonLink: "/dashboard?agentConfig=ghostwriter"//"/chat/book/fr-FR",
  },
  {
    imgSrc: emmaAvatar,
    name: "Emma",
    description:
      "Hello, I'm Emma, your personal writer! I'm here to guide you in writing your stories – listening, asking, editing, and turning cherished memories into a meaningful book.",
    buttonText: "Let's begin!",
    buttonLink: "/dashboard?agentConfig=ghostwriter"//"/chat/book/en-US",
  },
  {
    imgSrc: anastasijaAvatar,
    name: "Анастасия",
    description:
      "Привет, я Анастасия, ваша личная писательница! Я здесь, чтобы помочь вам написать вашу историю – слушать, задавать вопросы, редактировать и превращать воспоминания в значимую книгу.",
    buttonText: "Давайте начнём!",
    buttonLink: "/dashboard?agentConfig=ghostwriter"//"/chat/book/ru-RU",
  },
  {
    imgSrc: ronAvatar,
    name: "Ron",
    description:
      "שלום, אני רון, הכותב האישי שלך! אני כאן ללוות אותך במסע כתיבת הסיפורים שלך – להקשיב, לשאול, לערוך, ולהפוך זיכרונות יקרים לספר מרגש ומשמעותי. בוא נתחיל!",
    buttonText: "!בוא נתחיל",
    buttonLink: "/dashboard?agentConfig=ghostwriter"//"/chat/book/he-IL",
  },
  {
    imgSrc: santiagoAvatar,
    name: "Santiago",
    description:
      "Hola! Soy Santiago, tu escritor personal. Te acompaño en la escritura de tus historias – escuchando, preguntando, editando y transformando recuerdos preciados en un libro especial.",
    buttonText: "Comencemos!",
    buttonLink: "/dashboard?agentConfig=ghostwriter"//"/chat/book/es-ES",
  },
  {
    imgSrc: laylaAvatar,
    name: "ليلى",
    description:
      "مرحبًا، أنا ليلى، كاتبتك الشخصية! أرافقك في رحلة كتابة قصصك – أستمع، أسأل، أحرر، وأحول ذكرياتك الثمينة إلى كتاب مؤثر ومليء بالمعاني.",
    buttonText: "لنبدأ!",
    buttonLink: "/dashboard?agentConfig=ghostwriter"//"/chat/book/ar-AE",
  },
];
