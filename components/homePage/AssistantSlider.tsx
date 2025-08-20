'use client'

import AssistantCard from './AssistantCard'
// import { useEffect, useState } from 'react'
import { StaticImageData } from 'next/image'

interface AssistantProps {
    imgSrc: StaticImageData
    name: string
    description: string
    buttonText: string
    buttonLink: string
}

export default function AssistantSlider({
    assistants,
    title,
}: {
    assistants: Array<AssistantProps>
    title: string
}) {
    // const [mobile, setMobile] = useState(false)

    // useEffect(() => {
    //   if (typeof window !== "undefined") {
    //     setMobile(window.innerWidth < 680);

    //     const handleResize = () => {
    //       setMobile(window.innerWidth < 680);
    //     };

    //     window.addEventListener("resize", handleResize);

    //     return () => {
    //       window.removeEventListener("resize", handleResize);
    //     };
    //   }
    // }, []);

    return (
        <>
            <h2 className="text-balance text-2xl sm:text-5xl font-semibold mb-8 text-main">
                {title}
            </h2>
            <div
                className="flex justify-evenly overflow-x-auto overflow-hidden space-x-8 mx-4 py-8 items-stretch"
                aria-label="Assistant selection carousel">
                {assistants.map((assistant, index) => (
                    <AssistantCard
                        key={index}
                        imgSrc={assistant.imgSrc}
                        name={assistant.name}
                        description={assistant.description}
                        buttonText={assistant.buttonText}
                        buttonLink={assistant.buttonLink}
                        index={index}
                    />
                ))}
            </div>
        </>
    )
}
