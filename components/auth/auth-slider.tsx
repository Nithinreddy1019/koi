"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"



export const AuthSlider = () => {

    const textList = [
        {
            title: "Meet people",
            content: "Meet, talk and interact with people"
        },
        {
            title: "Like, Follow & Share",
            content: "Like posts, follow different people and share posts"
        },
        {
            title: "Message & Call",
            content: "Message your friends and call to know whereabouts."
        }
    ];

    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        if(current === textList.length-1) {
            setCurrent(0);
            return
        }
        setCurrent(curr => curr+1)
    }

    return (
        <div className="h-full w-full bg-blue-900/80">
            <div className="h-full w-full p-2 relative">
                <div className="rounded-[100%] bg-blue-800 bg-opacity-10 lg:h-[680px] lg:w-[680px] xl:h-[900px] xl:w-[900px] relative -top-60 -right-60">
                    <div className="w-2/3 h-2/3 rounded-full bg-blue-700 bg-opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <div className="w-1/2 h-1/2 rounded-full bg-blue-700 bg-opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-l-2 border-blue-300 border-dashed">
                            <Button
                                className="bg-white rounded-full w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-white hover:scale-105 transition-all duration-300 group"
                                onClick={handleNext}
                            >
                                <ArrowRight className="text-primary "/>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 left-16 h-full">
                    <div className="relative top-4 flex item-center gap-x-2">
                        <Image 
                            src={"/koi-trans.png"}
                            alt="logo"
                            height={35}
                            width={35}
                            className="bg-white rounded-xl"
                        />
                        <h3 className="font-semibold text-white text-2xl">Koi</h3>
                    </div>
                    <div className="relative top-36 text-white max-w-[350px]">
                        <p className="text-xs py-2 transition-all">{textList[current].title}</p>
                        <h3 className="text-3xl">{textList[current].content}</h3>

                        <div className="w-full flex items-center justify-start gap-x-2 mt-8">
                            {textList.map((data, index) => (
                                <button
                                    className={cn("w-1.5 h-1.5 rounded-full border bg-white/50 transition-all duration-200", current === index && ("w-4 h-2 transition-all duration-200"))}
                                    onClick={() => setCurrent(index)}
                                >

                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Add Images */}
            </div>
        </div>
    )
}