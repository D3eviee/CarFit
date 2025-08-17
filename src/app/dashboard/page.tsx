'use client'
import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "./actions";
import { DashboardReservationList }  from "@/components/dashboard/main/dashboard-reservation-list";
import { DashboardVisitChart } from "@/components/dashboard/main/dashboard-visit-chart";
import { DashboardTopServicesChart } from "@/components/dashboard/main/dashboard-top-services-chart";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";

export default function Dashboard() {
  const {data: todayReservationsData, status:todayReservationsDataStatus} = useQuery({
    queryKey: ["getTodayReservations"],
    queryFn: async () => {
      const response = await getTodayAppointments()
      if(response.success) return response.data
      return null
    }
  })

  if(todayReservationsDataStatus == "pending") return <Spinner/>
  if(todayReservationsDataStatus == "error") return <Error/>

  return (
    <div className="w-full h-full flex flex-col gap-4 lg:flex-row">
      {todayReservationsData && <DashboardReservationList reservations={todayReservationsData}/>}

      <div className="w-full flex flex-col gap-5 h-full">
        <DashboardVisitChart/>
        <DashboardTopServicesChart/>
      </div>
    </div>
  );
}
