import Image from "next/image";
import { ModalBackButton } from "../buttons/modal-back-button";

type ServiceGalleryModalProps = {
  images:{
    id: string;
    businessId: string;
    photoUrl: string;
    priority: number; 
  }[]
}
export const ServiceGalleryModal = ({images}: ServiceGalleryModalProps) =>  {
  return (
    <div className="h-full w-full overflow-scroll bg-white md:rounded-2xl md:w-[85%] md:h-[80%] lg:w-[80%] xl:w-[65%] 2xl:w-[57%]">
      <div className="flex flex-col gap-5 h-full">
        <div className="w-full z-10 fixed p-4 md:absolute md:bg-[#FFF] md:shadow-small md:w-[85%] lg:w-[80%] xl:w-[65%] 2xl:w-[57%] md:rounded-t-2xl">
          <ModalBackButton/>
        </div>
        <div className="px-4 mt-20 flex flex-col gap-5 py-5">
          {/* TITLE */}
          <h1 className="text-main-black text-2xl font-bold leading-none">Galeria</h1>
          {/* IMAGES */}
          <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {images.map((image) => 
              <div key={image.id} className="rounded-xl overflow-clip relative w-full aspect-16/10 shadow-sm">
                <Image src={image.photoUrl} alt="gallery image" fill className="object-fill"/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}