'use client'
import { useDashboardMobileCalendarTypeStore } from "@/lib/store";
import { DashboardCalendarMobileDayView } from "./dashboard-calendar-mobile-day-view";
import { DashboardCalendarMobileListView } from "./dashboard-calendar-mobile-list-view";
import { DashboardCalendarAddApppointmentButton } from "../dashboard-calendar-add-appointment-button";
import { DashboardCalendarMobileType } from "./dashboard-calendar-mobile-type";

export const DashboardCalendarMobile = () => {
  // ZUSTAND STORE FOR MANAGING CALENDAR TYPE 
  const mobileCalendarType = useDashboardMobileCalendarTypeStore(store => store.mobileCalendarType)

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden lg:hidden">
      {/* TOP MENU */}
      <div className="w-full flex flex-row items-center justify-between">
        <DashboardCalendarMobileType/>
        <DashboardCalendarAddApppointmentButton/>
      </div>

      <div className="w-full h-full min-h-0 overflow-hidden">
        {mobileCalendarType == "list" && <DashboardCalendarMobileListView/> }
        {mobileCalendarType == "single-day" && <DashboardCalendarMobileDayView/> }
      </div>
    </div>
  );
}