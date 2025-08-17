import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { AppointmentsTable } from "@/components/dashboard/appointments/appointments-table";

export default function Appointments() {
  return (
    <div className="h-full flex flex-col gap-10 w-full relative overflow-hidden">
      <DashboardPageHeader 
        title="Wizyty" 
        subtitle="Znajdziesz tu listę wszystkich wizyt. Przeglądaj i zarządzaj wizytami"
      />

      <AppointmentsTable/>
    </div>
  )
}