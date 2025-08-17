import { Category } from "@/lib/types";
import { BookingServicesCategories } from "./booking-service-categories";
import { useAppointmentStore } from "@/lib/store";

export const BookingServices = ({categoriesData}:{categoriesData: Category[]}) => {
  const selectedService = useAppointmentStore(store => store.selectedServices)[0]
 const defaultCategoryId = selectedService
  ? categoriesData.find(category =>
      category.services.some(service => service.id === selectedService)
    )?.id
  : categoriesData[0].id;


  return (
    <div className="h-full w-full flex flex-col gap-5">
      <h1 className="text-[#191919] text-2xl leading-none font-semibold">Wybierz usługi</h1>
      <BookingServicesCategories categoriesData={categoriesData} defaultSelectedCategory={defaultCategoryId}/>
    </div>
  );
}

