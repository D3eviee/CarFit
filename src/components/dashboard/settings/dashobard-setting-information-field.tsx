type EditableFieldProps = {
  fieldName: string
  fieldValue?: string
}

export const DashobardSettingInformationField = ({ fieldName, fieldValue,}: EditableFieldProps) =>  {
  
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[#111] text-sm font-normal">{fieldName}</p>
      <p className="text-[#555] text-sm font-light">{fieldValue || "Brak"}</p>
    </div>
  )
}

