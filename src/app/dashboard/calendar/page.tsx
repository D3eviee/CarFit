import { DashboardCalendar } from "@/components/dashboard/calendar/desktop/dashboard-calendar";
import { DashboardCalendarMobile } from "@/components/dashboard/calendar/mobile/dashboard-calendar-mobile";

export default function CalendarPage() {
  return (
    <div className="w-full h-full overflow-y-hidden">
      {/* MOBIEL VIEW */}
      <DashboardCalendarMobile/>

      {/* DESKTOP VIEW */}
      <DashboardCalendar/>
    </div>
  );
}