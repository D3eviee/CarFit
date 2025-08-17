'use client'
import { InputHTMLAttributes } from "react";

type TextInputProps = {
  id: string;
} & InputHTMLAttributes<HTMLInputElement>

export default function TextInput({id, ...props  }:TextInputProps) {
  return (
    <input
        id={id}
        {...props}
        className="w-full bg-[#F6F7FB] px-2 py-1.5 text-md text-[#191919] rounded-lg border outline-none border-transparent focus:border-[#CCC]"
    />
  )
}