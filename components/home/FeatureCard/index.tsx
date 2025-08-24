// import Image from "next/image";
import { StaticImageData } from "next/image";
import ResponsiveImg from "@/components/ui/ResponsiveImg";
interface FeatureCardProps {
  imgSrc: string | StaticImageData;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({
  imgSrc,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <div
      className="mt-12 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-4xl"
      aria-labelledby={`feature-title-${index}`}
    >
      <div className="flex flex-col md:flex-row md:h-72">
        <div className="w-full h-56 md:h-auto md:w-1/2 md:shrink-0 relative">
          <ResponsiveImg
            title={title}
            className="object-cover"
            mobile={{
              width: 800,
              height: 250,
              src: imgSrc,
            }}
            desktop={{
              width: 1200,
              height: 500,
              src: imgSrc,
            }}
            style={{
              height: "100%",
            }}
          />

          {/* <Image
            className="object-cover"
            src={imgSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          /> */}
        </div>
        <div className="p-6 md:p-10 flex flex-col h-full md:h-auto flex-grow" >
          <h3
            id={`feature-title-${index}`}
            className="block text-2xl leading-tight font-medium text-main mb-3"
          >
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-slate-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
