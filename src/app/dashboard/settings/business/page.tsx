'use client'
import { useQuery } from '@tanstack/react-query';
import { getSettingsDataForBusiness } from '../../actions';
import { useState } from 'react';
import { DashboardSettingsBreadcrumb } from '@/components/dashboard/settings/dashboard-settings-breadcrumb';
import { SettingsViewTitle } from '@/components/dashboard/settings/settings-view-title';
import { DasboardSettingsSideMenu } from '@/components/dashboard/settings/dashboard-settings-side-menu';
import { Spinner } from '@/components/spinner';
import { Error } from '@/components/error';
import { DashboardSettingsBusinessDetails } from '@/components/dashboard/settings/business/dashboard-settings-business-details';
import { DashboardSettingsBusinessLocation } from '@/components/dashboard/settings/business/dashboard-settings-business-location';
import { DashboardSettingsBusinessLinks } from '@/components/dashboard/settings/business/dashboard-settings-business-links';

export default function BusinessSettings() {
  const [openView, setOpenView] = useState<string>("details")

  const {data: settings, status: settingsStatus} = useQuery({
    queryKey: ["getBusinessInformationForSettings"],
    queryFn: async () => {
      const settingData = await getSettingsDataForBusiness()
      return settingData
    }
  }) 

  const pages = [
    {title: "Szczegóły", view:"details"}, 
    {title: "Lokalizacja", view:"locations"}, 
    {title: "Linki", view:"links"}
  ]

  if(settingsStatus =="pending" || settings == undefined) return <Spinner/>
  if(settingsStatus =="error") return <Error/>

  const settingsBusinessDetailsViewData = {businessName: settings.name, language: "Polski", country: "Polska", currency: "PLN" }
  const settingsBusinessLocationViewData = {town: settings.town, district: settings.district, street: settings.street, zipcode: settings.zipcode }
  const linksData = {facebookUrl: settings.facebookUrl, instagramUrl: settings.instagramUrl, websiteUrl: settings.websiteUrl}

  return (
    <div className='flex flex-col gap-5'>
      <DashboardSettingsBreadcrumb parentPage='Ustawienia' thisPage='Serwis'/>
      
      <div className="w-full flex flex-col gap-8 md:flex-row">
        <DasboardSettingsSideMenu changeViewFn={setOpenView} openView={openView} pages={pages}/>
        <div className="w-full flex flex-col gap-5 lg:max-w-1/2">
          <SettingsViewTitle openView={openView}/> 
          {openView == "details" && <DashboardSettingsBusinessDetails settings={settingsBusinessDetailsViewData}/>}
          {openView == "locations" && <DashboardSettingsBusinessLocation locationData={settingsBusinessLocationViewData}/>}
          {openView == "links" && <DashboardSettingsBusinessLinks links={linksData}/>}
        </div>
      </div>
    </div>
  )
}