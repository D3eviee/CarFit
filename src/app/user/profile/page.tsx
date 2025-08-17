'use client'
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import UserProfileHeader from "@/components/user/profile/user-profile-header";
import UserProfileStats from "@/components/user/profile/user-profile-stats";
import UserProfileData from "@/components/user/profile/user-profile-data";
import UserProfileSecurity from "@/components/user/profile/user-profile-security";
import UserProfileDeleteProfileButton from "@/components/user/profile/user-profile-delete-profile-button";
import { getClientProfileData } from "./actions";

export default function Profile(){
  const {data: userProfileData, status: userProfileDataStatus} = useQuery({
    queryKey: ["userProfileData"],
    queryFn: async () => {
      const response =  await getClientProfileData()
      if(!response.success) return null
      return response.data
    }
  })

  if(userProfileDataStatus == "pending") return <Spinner/>
  if(userProfileDataStatus == "error") return <Error/>

  return (
    <div className="pb-4 h-full flex flex-col gap-5 px-4 sm:px-[100px] md:px-[150px] lg:px-[300px] xl:px-[450px] 2xl:px-[500px]">
      <UserProfileHeader userData={userProfileData}/>  
      <UserProfileStats reservationsData={userProfileData.Reservation}/>     
      <UserProfileData userData={userProfileData}/>
      <UserProfileSecurity/>
      <UserProfileDeleteProfileButton/>
    </div>
  )
}