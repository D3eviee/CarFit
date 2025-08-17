import { ReactNode } from "react";

export default function UserProfileContainerWrapper({children}:{children:ReactNode}){
    return (
        <div className="w-full p-4 bg-[#F2F2F7] inset-shadow-glass ring-1 ring-[#F2F2F7] ring-offset-2 rounded-3xl shadow-inner-glass">
            {children}
        </div>
  )
}