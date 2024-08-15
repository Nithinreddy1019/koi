import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"



export const AuthSlider = () => {
    return (
        <div className="h-full w-full bg-blue-900/80">
            <div className="h-full w-full p-2 relative">
                <div className="rounded-[100%] bg-blue-800 bg-opacity-10 lg:h-[680px] lg:w-[680px] xl:h-[900px] xl:w-[900px] relative -top-60 -right-60">
                    <div className="w-2/3 h-2/3 rounded-full bg-blue-700 bg-opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <div className="w-1/2 h-1/2 rounded-full bg-blue-700 bg-opacity-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-l-2 border-blue-300 border-dashed">
                            <Button
                                className="bg-white rounded-full w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:bg-white hover:scale-105 transition-all duration-300 group"
                            >
                                <ArrowRight className="text-primary "/>
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="absolute top-0">Hello</p>
            </div>
        </div>
    )
}