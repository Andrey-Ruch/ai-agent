import Image from "next/image";
import Link from "next/link";
import { StaticImageData } from "next/image";

interface AssistantCardProps {
  imgSrc: StaticImageData;
  name: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  index: number;
}

export default function AssistantCard({
  imgSrc,
  name,
  description,
  buttonText,
  buttonLink,
  index,
}: AssistantCardProps) {
  return (
    <div
      className="flex flex-col min-w-80 h-auto rounded-xl p-7 shadow-lg bg-white"
      aria-labelledby={`assistant-name-${index}`}
    >
      <div className="relative w-32 h-32 mx-auto">
        <Image
          src={imgSrc}
          alt={`${name} - Assistant`}
          fill
          className="rounded-full object-cover"
          sizes="128px"
          priority={index < 2}
        />
      </div>
      <h3
        id={`assistant-name-${index}`}
        className="mt-3 text-xl font-medium text-main"
      >
        {name}
      </h3>
      <p className="flex-grow mt-3 text-slate-500">{description}</p>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <Link
          href={buttonLink}
          className="rounded-3xl bg-main px-3.5 py-2.5 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-main/90"
          aria-label={`Choose ${name} as your assistant`}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
