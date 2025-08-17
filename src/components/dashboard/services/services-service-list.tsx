import { ReactNode } from "react";

type ServicesServiceListProps = {
  children: ReactNode
  categoryName: string
}

export const ServicesServiceList = ({categoryName, children}: ServicesServiceListProps) =>  {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-[#2B2B2B] text-md font-medium leading-none p-2 border-[0.5px] border-[#D4D4D4] py-3 rounded-xl shadow-md" >{categoryName}</p>
      <div className="flex flex-col gap-2.5">
        {children}
      </div>
    </div>
  )
}