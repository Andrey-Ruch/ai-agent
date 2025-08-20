import { FileWithPreview } from "@/interfaces/uploadImage";
import { Resources } from "@/locales/types";
import { Book } from "@/interfaces/book";

export type ColorClass = `bg-${string}` | `text-${string}`;

export type CoverPhoto = {
  url: string;
  file: FileWithPreview | null;
  isRemoved: boolean;
};

export type CoverState = {
  title: string;
  subtitle: string;
  byline: string;
  backgroundColor: ColorClass; // ColorClass;
  textColor: ColorClass; // ColorClass;
  coverPhoto: CoverPhoto;
  backCover: {
    title: string;
    description: string;
  };
};

export type ColorOption = {
  id: number;
  colorClass: ColorClass;
  name: string;
};

export type FormField = {
  id: string;
  label: string;
  icon: React.ReactNode;
  optional?: boolean;
  type: "text" | "color" | "photo";
  value?: string;
  setValue?: (value: string) => void;
  options?: ColorOption[];
  selectedValue?: string;
  // setSelectedValue?: (value: string) => void;
  setSelectedValue?: (value: ColorClass) => void;
  optionalText?: string;
};

export type BookCoverDesignerProps = {
  initialTitle?: string;
  initialSubtitle?: string;
  initialByline?: string;
  initialCoverPhoto?: string;
  initialBackgroundColor?: ColorClass;
  initialTextColor?: ColorClass;
  initialBackCoverTitle?: string;
  initialBackCoverDescription?: string;
  resources: Resources;
  onSave?: (coverData: {
    title: string;
    subtitle: string;
    byline: string;
    backgroundColorClass: ColorClass;
    textColorClass: ColorClass;
    coverPhoto?: string;
    backCoverTitle: string;
    backCoverDescription: string;
    direction?: "ltr" | "rtl"; // Added for language direction
  }) => Promise<void> | void;
};

export interface CoverProps {
  resources: Resources;
  initialBook: Book;
  email: string;
}

export interface CoverData {
  title: string;
  subtitle: string;
  byline: string;
  backgroundColorClass: string;
  textColorClass: string;
  coverPhoto?: string;
  backCoverTitle: string;
  backCoverDescription: string;
  direction?: "ltr" | "rtl"; // Added for language direction
}

export interface BookResponse {
  data: {
    book: {
      title: string;
      subTitle: string;
      coverPhoto: string;
      coverColor: string;
      backCoverTitle: string;
      backCoverDescription: string;
      user: {
        name: string;
      };
      direction?: "ltr" | "rtl"; // Added for language direction
    };
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
