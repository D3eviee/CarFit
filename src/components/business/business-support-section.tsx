import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const BusinessSupportSection = () => {
  return (
    <div className="bg-[#F5F5F7] py-16 flex flex-col px-4 lg:flex-row  items-center lg:py-25 md:px-12 lg:gap-14 xl:px-35 2xl:px-45 tems-center justify-between gap-10 md:gap-16">
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left lg:gap-3">
             <h1 className="text-2xl tracking-tight lg:text-4xl font-bold text-pretty w-full">Nigdy nie zostaniesz sam -</h1>
             <h1 className="text-2xl tracking-tight lg:text-4xl font-bold text-pretty w-full">obsługa klienta 24/7</h1>
        </div>
        <div className="w-full lg:w-3/5">
            <Link href={"/support"}>
                <div className="flex flex-col bg-white w-fit gap-5 p-6 sm:p-10 rounded-4xl ring-[0.5px] ring-[#EEE] transition-all duration-200 ease-in-out hover:bg-[#F9F9F9] hover:ring-2 hover:ring-[#FFF] active:scale-[0.99]">
                    <div className="w-full flex flex-row justify-between">
                        <p className="text-2xl font-semibold text-main-black">Wsparcie CarFit</p>
                        <ArrowRight strokeWidth={2} color="#363638"/>
                    </div>
                    <p className="text-md text-main-black font-light sm:font-normal">Skontaktuj się z nami mailowo lub telefonicznie, a my zrobimy wszystko co w naszej mocy by Ci pomóc.</p>
                </div>
            </Link>
        </div>
    </div>
  )
}
