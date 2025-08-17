export const DashboardSettingsWorkingDaysGridItem = ({ day }) => {
    return (
      <div className="flex justify-between items-center py-4 px-2 rounded-xl bg-[#F9F9F9] border-[#D4D4D4] border-[0.5px]">
        <p className="text-sm text-[#333] font-normal">{day.dayOfWeek}</p>
        <p className="text-sm text-[#111] font-light">{day.isOpen ? `${day.open} - ${day.close}` : "Zamknięte"}</p>
      </div>
    );
}