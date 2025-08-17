type SettingsPageHeaderProps = {
    title: string
    description: string
}
export const SettingsPageHeader = ({title, description}: SettingsPageHeaderProps) => {
  return (
    <div className="w-full bg-white flex flex-col gap-1 p-4 border-[0.5px] border-[#D4D4D4] shadow-lg rounded-2xl">
        <h2 className="text-md font-normal text-[#111]">{title}</h2>
        <p className="text-sm font-light text-[#333]">{description}</p>
    </div> 
  )
}
