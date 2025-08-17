import { DashboardCalendarSecondaryAppointmentList } from "./dashboard-calendar-secondary-appointment-list";
import { DashboardCalendarSecondaryMonthCalendar } from "./dashboard-calendar-secondary-month-calendar";

export const DashboardCalendarSecondary = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <DashboardCalendarSecondaryMonthCalendar />
      <div className="grow min-h-0">
        <DashboardCalendarSecondaryAppointmentList />
      </div>
    </div>
  );
}