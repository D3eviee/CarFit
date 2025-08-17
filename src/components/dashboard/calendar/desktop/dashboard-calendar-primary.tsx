'use client'
import { useBusinessCalendarNavigationStore } from "@/lib/store";
import { DashboardCalendarPrimaryCalendarTypeButton } from "./dashboard-calendar-primary-calendar-type-button";
import { DashboardCalendarPrimaryWeekView } from "./dashboard-calendar-primary-week-view";
import { DashboardCalendarAddApppointmentButton } from "../dashboard-calendar-add-appointment-button";
import { DashboardCalendarPrimaryDayView } from "./dashboard-calendar-primary-day-view";

export const DashboardCalendarPrimary = () => {
  //ZUSTAND STORE FOR MANAGING TYPE OF CALENDAR
  const calendarType = useBusinessCalendarNavigationStore(store => store.calendarType)

  return (
    <div className="w-full h-full flex-col gap-3 overflow-hidden md:flex">
      {/* TOP MENU */}
      <div className="w-full flex flex-row items-center justify-between">
        <DashboardCalendarPrimaryCalendarTypeButton/>
        <DashboardCalendarAddApppointmentButton/>
      </div>
      {/* CALENDAR */}
      <div className="w-full h-full min-h-0 overflow-hidden">
        {calendarType == "week" &&  <DashboardCalendarPrimaryWeekView/>}
        {calendarType == "day" && <DashboardCalendarPrimaryDayView/> }
      </div>
    </div>
  );
}