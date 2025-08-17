import { getTopServicesChartData } from '@/app/dashboard/actions';
import { Error } from '@/components/error';
import { Spinner } from '@/components/spinner';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, ResponsiveContainer} from 'recharts';

export const DashboardTopServicesChart = () => {
  const {data, status} = useQuery({
    queryKey: ["getTopServicesChartData"],
    queryFn: async () => {
      const topServicesResponse = await getTopServicesChartData()
        if(!topServicesResponse.success) return null
        return topServicesResponse.data
      }
    })

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  return (
    <div className="w-full lg:h-1/2 p-4 flex flex-col gap-4 ring-[0.5px] ring-[#D4D4D4] shadow-lg rounded-2xl">
      <p className="text-[#191919] text-md font-medium">Najczęściej rezerwowane usługi</p>

      { data.length == 0 
        ? <p className='text-center py-30 text-[#363638] text-sm'>Brak rezerwacji</p> 
        : <ResponsiveContainer width="100%" height={330} className="p-1 rounded-xl">
            <PieChart>
              <Pie data={data} nameKey={"name"} dataKey={"count"} cx="50%" cy="50%" outerRadius={100} fill="#FF383C" />
            </PieChart>
          </ResponsiveContainer>
      }      
    </div>
  )
}
