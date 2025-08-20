import { CSSProperties } from "react";

export interface ResponsiveImgProps {
    title: string;
    className?: string;
    isFill?: boolean;
    mobile: { width?: number; height?: number; src: string  | import("next/dist/shared/lib/get-img-props").StaticImport;};
    desktop: { width?: number; height?: number; src: string  |import("next/dist/shared/lib/get-img-props").StaticImport;};
    style?: CSSProperties ;
  }