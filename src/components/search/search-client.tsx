'use client'
import SearchResultGrid from "@/components/search/search-result-grid";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Error } from "@/components/error";
import { Spinner } from "@/components/spinner";
import { getSearchedBusinesses, getSearchedBusinessesByLocation, getSearchedBusinessesByType, getSearchedBusinessesByTypeAndCategory } from "@/app/search/actions";

export const SearchClient = () =>  {
  const params = useSearchParams()
  const location = params.get("location")
  const type = params.get("category")

  const { data, status } = useQuery({
    queryKey: ["getSearchedData", location, type],
    queryFn: async () => {
      if (location && type) return (await getSearchedBusinessesByTypeAndCategory(location, type)).data
      else if (location) return (await getSearchedBusinessesByLocation(location)).data
      else if (type) return (await getSearchedBusinessesByType(type)).data
      else return (await getSearchedBusinesses()).data
    }
  })

  if (status === "pending") return <Spinner />
  if (status === "error") return <Error />

  return (
    <div className='w-full flex flex-col gap-8 px-4 md:px-12 xl:px-40 2xl:px-60'>
      <div className='flex flex-col gap-1'>
        <h1 className="text-2xl font-semibold text-[#191919]">Dostępne serwisy</h1>
        <h2 className="text-md text-[#363638] font-light">{location && `${location} - `}{type && `${type}`}</h2>
      </div>
      {data.length == 0 
        ? <p className="py-20 text-md text-center text-[#8A8A8A]">Brak wyników</p> 
        : <SearchResultGrid data={data} /> 
      }
    </div>
  )
}
