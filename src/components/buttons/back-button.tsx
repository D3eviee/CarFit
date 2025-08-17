"use client";
import { ChevronLeft } from "lucide-react";

type BackButtonProps = {
  onBackFn?: () => void
}

export const BackButton = ({onBackFn}:BackButtonProps) => {
  return (
    <div 
      className="w-fit bg-main-[#F2F2F7]/30 backdrop-blur-xs ring-1 ring-white shadow-sm rounded-full inset-shadow-glass p-2 hover:cursor-pointer hover:bg-[#FAFAFA]/30 hover:scale-105 active:scale-95 transition duration-75 ease-in"
      onClick={onBackFn}
    >
      <ChevronLeft color={"#191919"} size={25} strokeWidth={1.5}/>
    </div>
  )
}
