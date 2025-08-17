'use client'
import { useQuery } from '@tanstack/react-query'; 
import { DashboardSettingsGalleryGridItem } from '@/components/dashboard/settings/gallery/dashboard-setting-gallery-grid-item';
import { Spinner } from '@/components/spinner';
import { Error } from '@/components/error';
import { getBusinessGalleryImages } from '@/app/dashboard/settings/actions';

export const DashboardSettingsGalleryGrid = () => {
  const {data: userImages, status: userImagesStatus} = useQuery({
    queryKey: ["getBusinessGalleryImages"],
    queryFn: async () => {
      const respose =  await getBusinessGalleryImages()
      if(!respose.success) return null
      return respose.data
    }
  })

  if(userImagesStatus == "pending") return <Spinner/>
  if(userImagesStatus == "error") return <Error/>

  return (
    <div className='w-full h-fit grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {(userImages && userImages.length > 0) && userImages.map(photo => 
        <DashboardSettingsGalleryGridItem key={photo.id} photoUrl={photo.photoUrl} id={photo.id}/>
      )}
    </div>     
  )
}