'use client'

type TextLabelProps = {
    htmlFor: string
    text: string
}
export default function TextLabel({ htmlFor, text }:TextLabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-[#191919] text-sm pl-1">{text}</label>
  )
}