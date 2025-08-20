/**
 * ResponsiveImg component that renders an image which adapts to screen size.
 * It uses the Next.js Image component for optimized image rendering.
 * 
 * @component
 * @param {ResponsiveImgProps} props - The properties for the ResponsiveImg component.
 * @param {Object} props.mobile - The properties for the mobile version of the image.
 * @param {string | StaticImport} props.mobile.src - The source of the mobile image.
 * @param {number} props.mobile.width - The width of the mobile image.
 * @param {number} props.mobile.height - The height of the mobile image.
 * @param {Object} props.desktop - The properties for the desktop version of the image.
 * @param {string | StaticImport} props.desktop.src - The source of the desktop image.
 * @param {number} props.desktop.width - The width of the desktop image.
 * @param {number} props.desktop.height - The height of the desktop image.
 * @param {string} props.title - The alt text for the image.
 * @param {string} [props.className] - Additional class names for the image.
 * @param {boolean} [props.isFill=false] - Whether the image should fill its container.
 * 
 * @returns {JSX.Element} The rendered ResponsiveImg component.
 * 
 * @example
 * <ResponsiveImg
 *   mobile={{ src: '/images/mobile.jpg', width: 300, height: 200 }}
 *   desktop={{ src: '/images/desktop.jpg', width: 600, height: 400 }}
 *   title="Responsive Image"
 *   className="custom-class"
 *   isFill={false}
 * />
 */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ResponsiveImgProps } from "@/interfaces/basic";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const ResponsiveImg: React.FC<ResponsiveImgProps> = (props) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSmallScreen(window.innerWidth < 768);

      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Set the image properties based on the screen size
  // If isFill is true, the image will fill its container
  // Otherwise, the image will have a fixed width and height
  // The image source will be the mobile version if the screen size is small
  // Otherwise, it will be the desktop version
  const imgProps: Omit<React.ComponentProps<typeof Image >, "src"> & {
    src: string | StaticImport;
  } = {
    src: (isSmallScreen ? props.mobile.src : props.desktop.src) as string,
    alt: props.title+"",
    className: props.className + (props.isFill ? " important-relative" : ""),
    width: props.isFill
      ? undefined
      : isSmallScreen
      ? props.mobile.width
      : props.desktop.width,
    height:  props.isFill
      ? undefined
      : isSmallScreen
      ? (props.mobile.height )
      : (props.desktop.height ),
    // layout: props.isFill ? "fill" : undefined,
    fill: props.isFill,
    style: props.isFill ? { objectFit: "contain" } : props.style,
    priority: true,
  };

return (
    <>
         <Image {...imgProps} alt={imgProps.alt}/>
    </>
);
};
export default ResponsiveImg;