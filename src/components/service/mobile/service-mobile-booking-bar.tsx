'use client'
import { usePathname, useRouter } from "next/navigation";

export const ServiceMobileBookingBar = ({serviceCount}:{serviceCount:number}) => {
    const path = usePathname();
    const router = useRouter();
    const handleRedirect = () => router.replace(`${path}/booking`);
    
    return (
      <div className="fixed z-50 bottom-0 w-full py-1.5 px-4 flex justify-between items-center bg-[#F2F2F7] inset-shadow-glass border-t-[0.5px] border-t-[#D4D4D4]">
        <p className="text-sm text-[#191919] font-light">Oferuje {serviceCount} usług</p>
        <div 
          className="w-fit px-10 py-3 rounded-2xl bg-linear-to-b from-[#313131] to-[#141414] shadow-md text-white hover:bg-[#333333] text-sm text-center hover:cursor-pointer active:scale-95 transition-all duration-200" 
          onClick={handleRedirect}>
            Zarezerwuj
        </div>
      </div>
  );
};
