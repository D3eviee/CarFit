import { DashboardCalendarMobileEventList } from "./dashboard-calendar-mobile-event-list";
import { DashboardCalendarMobileMonth } from "./dashboard-calendar-mobile-month";

export const DashboardCalendarMobileListView = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      <DashboardCalendarMobileMonth />
      <div className="grow min-h-0">
        <DashboardCalendarMobileEventList/>
      </div>
    </div>
  );
}