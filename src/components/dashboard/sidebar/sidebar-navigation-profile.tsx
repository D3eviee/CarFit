'use client'
import { useQuery } from "@tanstack/react-query"
import { Error } from "../../error"
import { Spinner } from "../../spinner"
import { useState } from "react"
import Image from "next/image"
import default_picture from "@/../public/ananymous_image.jpg"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils"
import { getBusinessProfileInformation } from "@/actions/dashboard/actions"
import { useDashboardSidebar } from "@/lib/store"

export const SidebarNavigationProfile = () => {
  const isMenuOpen = useDashboardSidebar(store => store.isMenuOpen)
  const path = usePathname()
  const [error, setError] = useState<string>()

  const {data, status} = useQuery({
    queryKey: ["getBusinessProfileInformation"],
    queryFn: async () => {
      const result = await getBusinessProfileInformation()
      if (!result.success) setError(result.message)
      return result.data
    }
  })

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error message={error}/>

  return (
      <Link href="/dashboard/profile" >
        <div className={cn("inset-shadow-glass w-full flex flex-row items-center p-2 gap-2 bg-[#F2F2F7] rounded-xl hover:cursor-pointer hover:bg-[#F9F9F9] active:scale-[0.98]", 
          path == "/dashboard/profile" && "bg-white")}
        >
          <div className={cn("relative aspect-square rounded-full overflow-hidden ring-1 ring-white", isMenuOpen ? "w-12" : "w-8 mx-auto")}>
            <Image 
              src={data.image || default_picture} 
              alt='Profile image' 
              fill
              className="object-cover"
            /> 
          </div>
          {isMenuOpen && <p className="w-full text-small text-[#191919]">{data.name}</p>}
        </div>
      </Link>
  )
}

