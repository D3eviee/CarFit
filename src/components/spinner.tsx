import { Loader2Icon } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <Loader2Icon size={25} strokeWidth={1} color="#191919" className="animate-spin"/>
    </div>
  )
}