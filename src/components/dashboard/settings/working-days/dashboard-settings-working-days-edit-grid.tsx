import {DashboardSettingsWorkingDaysEditGridItem} from "./dashboard-settings-working-days-edit-grid-item";

export const DashboardSettingsWorkingDaysEditGrid = ({days}:{days:string[]}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {days.map((day)=> <DashboardSettingsWorkingDaysEditGridItem key={day} day={day} />)}
    </div>
  )
}
