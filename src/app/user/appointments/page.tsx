import UserAppointmentList from "@/components/user/appointments/user-appointment-list";

export default function Appointments(){
  return (
    <div className='w-full flex flex-col gap-8 px-4 md:px-12 xl:px-40 2xl:px-60'>
      <div className='flex flex-col gap-1'>
        <p className="text-2xl font-semibold text-main-black">Wizyty</p>
        <p className="text-sm font-light text-main-black">Przeglądaj i zarządzaj swoimi wizytami</p>
      </div>

      <UserAppointmentList/>
    </div>
  )
}