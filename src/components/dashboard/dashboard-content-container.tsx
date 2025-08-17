import { ReactNode } from "react";

export default function DashboardContentContainer({children}: {children: ReactNode}){
    return(
        <div className="w-full h-full flex flex-col grow min-h-0 px-4 py-4 mt-14 lg:px-4 lg:pb-8 lg:pt-12 lg:mt-0 xl:px-10 overflow-hidden">
            {children}
        </div>
    )
}

