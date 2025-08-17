import { Service } from "@/lib/types";
import { ModalBackButton } from "../buttons/modal-back-button";
import { displayAppointmentTime } from "@/utils";

export const ServiceDetailsModal = ({service}: {service:Service}) =>  {
  const {name, description, duration, price} = service

  return (  
    <div className="h-[320px] overflow-scroll bg-white rounded-2xl w-[85%] sm:w-[420px] md:w-[520px]">
      <div className="flex flex-col gap-5 h-full">
        <div className="w-full z-10 fixed p-4 md:absolute md:bg-[#FFF] sm:w-[420px] md:w-[520px] md:rounded-t-2xl">
          <ModalBackButton />
        </div>
        <div className="mt-20 flex flex-col gap-5 px-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-main-black text-xl font-semibold leading-6">{name}</h1>
            <div className="w-full flex flex-row gap-4">
              <p className="flex justify-center items-center text-sm bg-[#1E8BB8] text-white px-4 rounded-lg">{price} PLN</p>
              <p className="flex justify-center items-center text-sm bg-[#6366F1] text-white px-4 rounded-lg ">{displayAppointmentTime(duration)}</p>
            </div>
          </div>
        
          <p className="text-[#363638] text-md leading-6">{description}</p>
        </div>
      </div>
    </div>
  )
}