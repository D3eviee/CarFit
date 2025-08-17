import { DashboardCalendarSecondary } from "./dashboard-calendar-secondary";
import { DashboardCalendarPrimary } from "./dashboard-calendar-primary";

export const DashboardCalendar = () => {
  return (
    <div className="w-full h-full overflow-y-hidden hidden lg:flex gap-3">
        <div className="w-full h-full lg:w-2/3 xl:w-9/12">
          <DashboardCalendarPrimary/>
        </div>
        <div className="h-full lg:w-1/3  xl:w-3/12 pt-[50px]">
          <DashboardCalendarSecondary/>
        </div>
      </div>
  )
}