import { ReactNode } from "react"

export const LandingSectionLayoutProvider = ({children, sectionHeader }:{children: ReactNode, sectionHeader:string}) =>  {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
        <h3 className="text-xl text-[#191919] font-medium lg:font-semibold lg:text-2xl">{sectionHeader}</h3>
        {children}
    </div>
    )
}
