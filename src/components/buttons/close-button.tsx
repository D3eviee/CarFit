"use client";
import { X } from "lucide-react";

type CloseButtonProps = {
  onCloseFn: () => void
}

export const CloseButton = ({onCloseFn}:CloseButtonProps) => {
  return (
    <div 
      className="w-fit bg-[#F2F2F7]/30 backdrop-blur-xs ring-1 ring-white rounded-full inset-shadow-glass p-2 hover:cursor-pointer hover:bg-[#FAFAFA]/30 hover:scale-105 active:scale-95 transition duration-75 ease-in"
      onClick={onCloseFn}
    >
      <X color={"#191919"} size={25} strokeWidth={1.5}/>
    </div>
  )
}
