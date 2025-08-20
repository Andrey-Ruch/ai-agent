import { Resources } from "../types";
import laptop from "@/public/images/homepage/laptop.jpg";
import support from "@/public/images/homepage/support.jpg";
import stamp from "@/public/images/homepage/stamp.jpg";
import printing from "@/public/images/homepage/printing.jpg";

export const esResources: Resources = {
  direction: "ltr",
  nav: {
    pricing: "Precios",
    chapterManagement: "Gestión de Capítulos",
    bookManagement: "Gestión de Libros",
    booksManagement: "Mis Libros",
    home: "Inicio",
  },
  home: {
    title: "Captura las historias de tu vida",
    description:
      "Agatha funciona con tecnología avanzada que te permite compartir la historia de tu vida, ya sea hablando o escribiendo — sin necesidad de experiencia previa…",
    buttonText: "Comenzar",
    assistants: "Elige tu asistente",
    contactUs: "Contáctanos",
    email: "Correo electrónico",
    emailValue: "contact@agatha.com",
    phone: "Teléfono",
    phoneValue: "(123) 456-7890",
    address: "Dirección",
    addressValue: "Ave 123, Tel-Aviv, Israel",
  },
  cover: {
    title: "Diseño de Portada",
    description:
      "Personaliza la portada de tu libro con las opciones a continuación",
    backText: "Atrás",
    titleText: "Título",
    subtitleText: "Subtítulo",
    backgroundColorText: "Color de Fondo",
    coverPhotoText: "Foto de Portada",
    optionalText: "(Opcional)",
    backCoverTitleText: "Título de Contraportada",
    backCoverDescriptionText: "Descripción de Contraportada",
    save: "Guardar",
    cancel: "Cancelar",
    coverPhoto: "Foto de Portada",
    exportAsPDF: "Exportar como PDF",
    designYourCover: "Diseña tu portada",
    directionText: "Dirección",
  },
  covers: {
    editCover: "Editar Portada",
    previewBook: "Vista Previa del Libro",
    deleteBook: "Eliminar Libro",
    orderBook: "Pedir Libro",
    addChapter: "Añadir Capítulo",
    chapters: "Capítulos",
  },
  books: {
    editBook: "Editar Libro",
    myBooks: "Mis Libros",
    createBook: "Crear Libro",
    chapters: "Capítulos",
  },
  bookSummary: {
    needGender: true,
    first: " Capítulo ",
    second: ". ",
    third: " Actualmente estoy trabajando en el capítulo ",
    forth: ", Estos son los capítulos: ",
    male: " masculino ",
    female: " femenino ",
    char: "E",
  },
  languageMenu: {
    title: "Idioma",
    en: "English",
    he: "עברית",
    es: "Español",
  },
  accessability: {
    title: "Menú de Accesibilidad",
    contrastHigh: "Alto Contraste",
    contrastNormal: "Contraste Normal",
    biggerText: "Texto Más Grande",
    smallerText: "Texto Más Pequeño",
    startAnimations: "Iniciar Animaciones",
    stopAnimations: "Detener Animaciones",
    showImages: "Mostrar Imágenes",
    hideImages: "Ocultar Imágenes",
    textAlignLeft: "Alinear Texto a la Izquierda",
    textAlignCenter: "Centrar Texto",
    textAlignRight: "Alinear Texto a la Derecha",
    textAlignClear: "Borrar Alineación de Texto",
    lineHeight: "Altura de Línea",
    pageStructure: "Estructura de Página",
    tabTitles: "Títulos",
    tabLinks: "Enlaces",
    tabParagraphs: "Párrafos",
  },
  pdf: {
    title: "Tu Libro",
    description: "Resumen del Libro",
    buttonText: "Generar PDF",
    btnGenerating: "Generando PDF...",
    pagesNumber: " páginas",
    openPDF: "Abrir como PDF",
  },
  editor: {
    apply: "Aplicar a este capítulo",
    chat: "Chat",
    editor: "Editor",
    chapters: "Capítulos",
    title: "título",
    save: "Guardar Capítulo",
    select: "Seleccionar",
    close: "Cerrar",
    enterMessage: "Escribe tu mensaje",
    confirm: "¿Apruebas este texto?",
    failed:
      "Lo siento, estamos experimentando dificultades. Por favor, inténtalo de nuevo más tarde.",
    char: "E",
    helloMessage1: "___ hola, mi nombre es ",
    helloMessage2: " ,estoy empezando a escribir una nueva historia personal ",
    helloMessage3: ", estoy trabajando en el capítulo: ",
    helloMessage4: ". Estoy usando el formato de Una nueva historia personal ",
    helloMessage5: ". esto es lo que he escrito: ",
    helloMessage6: ". por favor responde en idioma ",
    helloMessage7: ". ¿cómo deberíamos continuar? puedes presentarte por el nombre:",
    createSummary:
      "___ este es el capítulo por favor resúmelo, no es necesario responder, luego llama a la función provide_summary y devuelve el resumen allí: ",
    apprrove: "Aprobar",
    reject: "Rechazar",
    helpPrompt: "Por favor, ayúdame a escribir mi historia personal. Estoy trabajando en el capítulo: ",
    helpRequired: "Sí, por favor",
    chapterLabel: "Capítulo",
    saveButton: "Guardar Capítulo",
  },
  homepageCards: {
    cards: [
      {
        imgSrc: laptop,
        title:
          "Tecnología innovadora – Cuenta tu historia con voz o por escrito",
        description:
          "Agatha funciona con tecnología avanzada que te permite compartir la historia de tu vida hablando o escribiendo—no se necesita experiencia previa…",
      },
      {
        imgSrc: support,
        title: "Guía paso a paso y acompañamiento durante todo el proceso",
        description:
          "Agatha te guiará en cada etapa del proceso de escritura—paso a paso—desde la idea inicial hasta recibir tu libro impreso.",
      },
      {
        imgSrc: stamp,
        title:
          "Edición profesional – Hacer que escribir tu historia personal sea fácil y alcanzable",
        description:
          "Agatha incluye herramientas de edición profesional para pulir y mejorar tu historia personal, asegurando claridad, coherencia y una narrativa atractiva.",
      },
      {
        imgSrc: printing,
        title: "Impresión de alta calidad y entrega a domicilio",
        description:
          "Tu libro terminado se imprime con calidad premium y se entrega directamente en tu hogar—perfectamente preparado para compartir con tus seres queridos y preservar tu legado para las generaciones futuras.",
      },
    ],
    // c1title: "Tecnología innovadora – Cuenta tu historia con voz o por escrito",
    // c1description: "Agatha funciona con tecnología avanzada que te permite compartir la historia de tu vida hablando o escribiendo—no se necesita experiencia previa…",
    // c2title: "Guía paso a paso y acompañamiento durante todo el proceso",
    // c2description: "Agatha te guiará en cada etapa del proceso de escritura—paso a paso—desde la idea inicial hasta recibir tu libro impreso.",
    // c3title: "Edición profesional – Hacer que escribir tu historia personal sea fácil y alcanzable",
    // c3description: "Agatha incluye herramientas de edición profesional para pulir y mejorar tu historia personal, asegurando claridad, coherencia y una narrativa atractiva.",
    // c4title: "Impresión de alta calidad y entrega a domicilio",
    // c4description: "Tu libro terminado se imprime con calidad premium y se entrega directamente en tu hogar—perfectamente preparado para compartir con tus seres queridos y preservar tu legado para las generaciones futuras."
  },
};
