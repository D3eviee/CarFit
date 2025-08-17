export const FormHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
    return(
        <div className="w-full flex flex-col gap-2 justify-center items-center">
            <p className="text-main-black text-2xl font-semibold leading-6">{title}</p>
            <p className="text-[#333] font-light text-center tracking-tight text-sm">{subtitle}</p>
        </div>
    )
}
