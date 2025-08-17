export const BusinessPageProfitsSectionItem = ({title, content}:{title: string, content:string}) => {
  return (
    <div className="max-w-[370px] min-w-[370px] h-[240px]  flex flex-col justify-between p-8 bg-[#f5f5f7] rounded-4xl shadow-md">
      <h1 className="bg-gradient-to-r from-[#ff6a00] via-[#ff3b82] to-[#3b82f6] bg-clip-text text-transparent text-lg font-semibold md:text-xl md:font-bold">{title}</h1>
      <p className="text-middle text-[#333] font-normal md:font-semibold md:text-md">{content}</p>
    </div>
  )
}
