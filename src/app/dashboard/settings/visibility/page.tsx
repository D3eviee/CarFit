'use client'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { DashboardSettingsBreadcrumb } from '@/components/dashboard/settings/dashboard-settings-breadcrumb';
import { DasboardSettingsSideMenu } from '@/components/dashboard/settings/dashboard-settings-side-menu';
import { Spinner } from '@/components/spinner';
import { Error } from '@/components/error';
import { SettingsPageHeader } from '@/components/dashboard/settings/settings-page-header';
import { getDataForPublicityCheck } from '../actions';
import { DashboardSettingsVisibilityToggle } from '@/components/dashboard/settings/visibility/dashboard-settings-visibility-toggle';
import { DashboardSettingsVisibilityRequirements } from '@/components/dashboard/settings/visibility/dashboard-settings-visibility-requirements';

export default function VisibilitySetting() {
  const [openView, setOpenView] = useState<string>("visibility")
  const pages = [{title: "Szczegóły", view:"visibility"}]
  
  const {data: visibilityData, status: settingsStatus} = useQuery({
    queryKey: ["getDataForPublicityCheck"],
    queryFn: async () => {
      const visibility = await getDataForPublicityCheck()
      return visibility
    }
  }) 

  if(settingsStatus =="pending" || visibilityData == undefined) return <Spinner/>
  if(settingsStatus =="error") return <Error/>

  const imageCount = visibilityData.images
  const serviceCount = visibilityData.services
  const isToggleDisabled = !(imageCount >= 3 && serviceCount >= 1)

  return (
    <div className='flex flex-col gap-5'>
      <DashboardSettingsBreadcrumb parentPage='Ustawienia' thisPage='Widoczność'/>
      
      <div className="w-full flex flex-col gap-8 md:flex-row">
        <DasboardSettingsSideMenu changeViewFn={setOpenView} openView={openView} pages={pages}/>
        <div className="w-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsPageHeader title="Ustawienia widoczności" description="Pozwól klientom na znalezienie swojego serwisu."/>
          <div className="w-full bg-white flex flex-col gap-10 p-4 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-2xl">
            <DashboardSettingsVisibilityRequirements imageCount={imageCount} serviceCount={serviceCount}/>            

            <div className='flex flex-row gap-5 px-3'>
              <p className='text-md text-[#191919 '>Publikuj</p>
              <DashboardSettingsVisibilityToggle isDisabled={isToggleDisabled} isPublic={visibilityData.isPublic} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



    
