'use client'
import { cn } from "@/utils"
import { BusinessPageProfitsSectionItem } from "./business-profits-section-item"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const items = [
    {
        head:"Rejestracje poza godzinami pracy", 
        body:"Nie trać wizyt, które klienci umawiają poza Twoimi godzinami pracy. Pozwól klientom rezerwować wizyty o dowolnej porze 24/7."
    },
    {
        head:"Pokaż swoje usługi i buduj zaufanie", 
        body:"Prezentuj swoje usługi w przejrzysty sposób, pozwól klientom łatwo poznać ofertę i zyskać pewność, że wybierają sprawdzone rozwiązania."
    },
    {
        head:"Oszczędzaj czas i skup się na klientach", 
        body:"Zyskaj więcej czasu, dając klientom możliwość samodzielnego umawiania wizyt online nawet wtedy kiedy jesteś zajęty."
    },
    {
        head:"Wszystko w jednym miejscu", 
        body:"Zintegruj wszystkie aspekty zarządzania biznesem w jednym miejscu, aby mieć pełną kontrolę i wygodę działania."
    }
]

export const BusinessPageProfitsSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const updateButtons = () => {
        const container = scrollRef.current
        if (!container) return
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 1)
    }

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollRef.current
        if (!container) return
        let amount = 410
        
        if (window.innerWidth >= 768){ amount = 283}

        container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
    }

    useEffect(() => {
        updateButtons()
        const container = scrollRef.current
        if (!container) return
        container.addEventListener('scroll', updateButtons)
        return () => container.removeEventListener('scroll', updateButtons)
    }, [])

    return (
        <div className="w-full py-14 flex flex-col gap-10 lg:py-25 md:px-12 lg:gap-14 xl:px-35 2xl:px-45 overflow-hidden">
            <div 
                ref={scrollRef}
                className="w-full flex flex-row gap-10 overflow-hidden md:overflow-scroll scrollbar-none first-of-type:pl-4 pr-4 p-4"
            >
                {items.map((item, index) => (
                    <BusinessPageProfitsSectionItem  
                        key={index} 
                        title={item.head} 
                        content={item.body}
                    />
                ))}
            </div>
            
            {/* SLIDER NAVIGATION */}
            <div className='flex flex-row gap-5 justify-end px-4'>
                <button
                    onClick={() => scroll('left')}
                    className={cn(
                        "flex justify-center items-center bg-[#E8E8ED] shadow-md duration-300 rounded-full w-9 h-9 active:scale-95",
                        !canScrollLeft && 'opacity-40 pointer-events-none'
                    )}
                >
                    <ChevronLeft color="#767679" strokeWidth={2.5} className='mr-0.5'/>
                </button>
                <button
                    onClick={() => scroll('right')}
                    className={cn(
                        "flex justify-center items-center bg-[#E8E8ED] duration-300 rounded-full w-9 h-9 active:scale-95",
                        !canScrollRight && 'opacity-40 pointer-events-none'
                    )}
                >
                    <ChevronRight color="#767679" strokeWidth={2.5} className='ml-0.5'/>
                </button>
            </div>
        </div>
    )
}
