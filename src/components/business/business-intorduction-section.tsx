import { BookCheck, LucideEdit, User2 } from "lucide-react"

export const BusinessIntorductionSection = () => {
  return (
    <div className="w-full px-4 py-16 flex flex-col lg:py-25 md:px-12 lg:gap-14 xl:px-35 2xl:px-45 lg:h-full tems-center justify-between gap-10 md:gap-16">
        <h1 className="text-2xl tracking-tight lg:text-3xl font-bold text-pretty text-center w-full">Jak to działa?</h1>

        <div className="w-full flex flex-row gap-10 flex-wrap justify-around md:flex-row md:flex-nowrap">
            <div className="w-full flex flex-col p-4 bg-[#f5f5f7] rounded-4xl inset-shadow-glass text-center gap-8 transition-all duration-150 ease-in-out hover:scale-[1.02] lg:p-8">
                <div className="flex flex-col gap-2">
                    <User2 stroke="url(#gradient)" className="stroke-[url(#gradient)] mx-auto w-14 h-14"/>
                    <svg style={{position: 'absolute', width: 0, height: 0}}>
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ff6a00" />
                            <stop offset="50%" stopColor="#ff3b82" />
                            <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <h1 className="bg-gradient-to-r from-[#ff6a00] via-[#ff3b82] to-[#3b82f6] bg-clip-text text-transparent text-lg font-semibold md:text-xl md:font-bold">Utwórz konto</h1>
                </div>
                <p className="text-middle text-[#333] font-normal md:font-semibold md:text-md">W ciągu kilku minut utworzysz swój profil. Profil umożliwia ci stworzenie wizytówki twojego biznesu oraz obsługę rezerwacji oniline. Całkowicie za darmo.</p>
            </div>

            <div className="w-full flex flex-col p-4 bg-[#f5f5f7] rounded-4xl inset-shadow-glass text-center gap-8 transition-all duration-150 ease-in-out hover:scale-[1.02] lg:p-8">
                <div className="flex flex-col gap-2">
                    <LucideEdit size={50} stroke="url(#gradient)" className="stroke-[url(#gradient)] mx-auto w-14 h-14"/>
                    <svg style={{position: 'absolute', width: 0, height: 0}}>
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ff6a00" />
                            <stop offset="50%" stopColor="#ff3b82" />
                            <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <h1 className="bg-gradient-to-r from-[#ff6a00] via-[#ff3b82] to-[#3b82f6] bg-clip-text text-transparent text-lg font-semibold md:text-xl md:font-bold">Spersonalizauj profil</h1>
                </div>
                <p className="text-middle text-[#333] font-normal md:font-semibold md:text-md">Po utworzeniu profilu, przygotuj wizytówkę swojego biznesu, dając możliwość klientom zapozniania z usługami, które oferuje twój serwis.</p>
            </div>
            
            <div className="w-full flex flex-col p-4 bg-[#f5f5f7] rounded-4xl inset-shadow-glass text-center gap-8 transition-all duration-150 ease-in-out hover:scale-[1.02] lg:p-8">
                <div className="flex flex-col gap-2">
                    <BookCheck size={50} stroke="url(#gradient)" className="stroke-[url(#gradient)] mx-auto w-14 h-14"/>
                    <svg style={{position: 'absolute', width: 0, height: 0}}>
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#ff6a00" />
                            <stop offset="50%" stopColor="#ff3b82" />
                            <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <h1 className="bg-gradient-to-r from-[#ff6a00] via-[#ff3b82] to-[#3b82f6] bg-clip-text text-transparent text-lg font-semibold md:text-xl md:font-bold">Przyjmuj rezerwajce</h1>
                </div>
                <p className="text-middle text-[#333] font-normal md:font-semibold md:text-md">Po skonfigurowaniu profilu, zacznij przyjmować rezerwacje, zyskaj dostęp do analiz i rozwijaj swój biznes.</p>
            </div>
        </div>
    </div>
  )
}
