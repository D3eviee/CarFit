type DashboardPageHeaderProps = {
    title: string
    subtitle: string
}

export const DashboardPageHeader = ({title, subtitle}:DashboardPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-[#191919] font-semibold leading-none md:text-3xl">{title}</h1>
        <h2 className="text-sm text-[#242426] font-light leading-5 md:text-base">{subtitle}</h2>
    </div>
  )
}
