import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { SettingGridItem } from "@/components/dashboard/settings/setting-grid-item";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardPageHeader 
        title="Ustawienia" 
        subtitle="Zarządzaj informacjami o swojej firmie, konfiguruj opcje marketingowe, kalendarz, zarządzaj uprawnieniami pracowników"
      />
      
      <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:gap-8 lg:w-4/5">
        <SettingGridItem 
          title="Widoczność" 
          description="Pozwól klientom na znalezienie swojego serwisu"
          route="settings/visibility" 
        />
        <SettingGridItem 
          title="Biznes" 
          description="Zarządzaj szczegóły dotyczących swojej firmy"
          route="settings/business" 
        />
        <SettingGridItem 
          title="Dni pracy" 
          description="Zarządzaj dniami i godzinami działania biznesu" 
          route="settings/working-days"
        />
        <SettingGridItem 
          title="Galeria" 
          description="Zarządzaj zdjęciami na swojej stronie" 
          route="settings/gallery"
        />
        </div>
    </div>
  )
}

