import Image from 'next/image';
import oklejanie from "../../../../public/car_image.png"
import { ChevronRight } from 'lucide-react';

type CategoryItemProps = {
  categoryName: string;
  onClick: () => void;
}

export function BusinessOnboardingCategoryItem({categoryName, onClick = () => {}}:CategoryItemProps) {
  return(
    <div 
      onClick={onClick}
      className="w-full px-2 py-3 flex flex-row justify-between items-center rounded-xl hover:cursor-pointer hover:bg-[#F2F2F8] active:scale-95"
    >
      <div className='flex flex-row gap-3 items-center'>
        <div className="relative h-12 w-12 flex gap-3 items-center ">
          <Image src={oklejanie} alt="Category image" fill className='aspect-square rounded-full'/>
        </div>
        <p className="text-sm text-[#363638]">{categoryName}</p>
      </div>
      <ChevronRight strokeWidth="1px" color='#8A8A8A'/>
    </div>
  )
}