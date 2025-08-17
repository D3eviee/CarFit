'use client'
import { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { useModalStore } from "@/lib/store";

type EditableFieldProps = {
  fieldName: string
  fieldValue: string
  editModal: ReactNode
}

export const SettingBusinessInformationEditable = ({fieldName, fieldValue, editModal} : EditableFieldProps) =>  {
  const openModal = useModalStore(store => store.openModal)
  const handleOpeningModal = () =>  openModal(editModal)

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[#111] text-sm font-normal">{fieldName}</h1>
      <div className="flex items-start justify-between py-1">
        <p className="text-[#555] text-sm font-light">{fieldValue}</p>
          <Pencil size={16} strokeWidth={2} className="text-[#111] cursor-pointer" onClick={handleOpeningModal}/>
      </div>
    </div>
  )
}

