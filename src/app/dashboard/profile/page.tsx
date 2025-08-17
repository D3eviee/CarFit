'use client'
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/spinner"
import { Error } from "@/components/error"
import { DashboardProfileDeleteAccountButton } from "@/components/dashboard/profile/profile-delete-account-button"
import { getBusinessProfileInformation } from "@/actions/dashboard/actions"
import { DashboardProfileHeader } from "@/components/dashboard/profile/dashboard-profile-header"
import { DashboardProfileData } from "@/components/dashboard/profile/dashboard-profile-data"
import { DashboardProfileSecurity } from "@/components/dashboard/profile/dashbaord-profile-security"

export default function DashboardProfile () {
    const [error, setError] = useState<string>()
    
    const {data: profileData, status} = useQuery({
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
        <div className="flex flex-col gap-5 lg:w-4/5 xl:w-[55%]">
            {/* profile header */}
            <DashboardProfileHeader image={profileData.image} owner={profileData.owner} createdAt={profileData.createdAt}/>
            <DashboardProfileData email={profileData.email} owner={profileData.owner}/>
            <DashboardProfileSecurity/>
            <DashboardProfileDeleteAccountButton/>
        </div>
    )
}