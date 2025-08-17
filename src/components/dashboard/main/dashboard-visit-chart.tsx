import { getLastMonthReservationChartData } from '@/app/dashboard/actions';
import { Error } from '@/components/error';
import { Spinner } from '@/components/spinner';
import { cn } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const DashboardVisitChart = () => {
  const rangeTypes = [{type: "w"}, {type: "m"}]
  const [chartType, setChartRange] = useState("w")
  
  const {data, status} = useQuery({
    queryKey: ["getMonthReservationsChartData" ],
    queryFn: async () => {
      const reservationsResponse = await getLastMonthReservationChartData()
      if(!reservationsResponse.success) return null
      return reservationsResponse.data
    }
  })

  if(status == "pending") return <Spinner/>
  if(status == "error") return <Error/>

  const activeChartData = chartType == "w" ? data.week : data.month

  return (
    <div className="w-full lg:h-1/2 p-4 flex flex-col gap-4 ring-[0.5px] ring-[#D4D4D4] shadow-lg rounded-2xl">
      <div className="flex flex-col gap-4">
        {/* headers */}
        <div className='flex flex-row justify-between items-center'>
          <p className="text-[#191919] text-md font-medium">Wizyty</p>
          
          {/* range selector */}
          <div className="box-border flex bg-[#F2F2F7] border-black rounded-xl p-0.5">
            {rangeTypes.map((type, index) => 
              <p 
                key={index} 
                className={cn("w-12 flex justify-center items-center rounded-lg text-sm  hover:cursor-pointer", chartType == type.type && "bg-[#FFF] ring-[0.2px] ring-[#CCCCCC]")}
                onClick={()=>{setChartRange(type.type)}}  
              >
                {type.type.toUpperCase()}
              </p>
            )}
          </div>
        </div>
        
        <div className='w-full flex flex-col gap-3'>
          {/* NUMBER OF APPOINTMENTS IN THE RANGE */}
          <div className="flex flex-row items-center gap-1">
            <p className="text-[#333] font-medium text-md">Dzisiaj: </p>
            <p className="text-black font-semibold text-md"> Wizyty</p>
          </div>

          {/* CHART */}
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={activeChartData} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}  className='w-full text-xs'>
            <XAxis dataKey="day" scale="point" padding={{ left: 10, right: 10 }}/>
            <YAxis type="number" allowDecimals={false} dataKey="visits"/>
            <Tooltip  content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{ backgroundColor: 'white', padding: '8px', border: '1px solid #ccc', borderRadius: '6px' }}>
                    <p className="m-0 text-xs">{label}</p>
                    <p className="m-0 text-xs">Zarezerwowane: {payload[0].value}</p>
                    <p className="m-0 text-xs">Odwołane: {payload[1].value}</p>
                  </div>
                )}
                return null
              }}/>
              <Bar stackId={1} dataKey="visits" fill="#1674F0" barSize={chartType == "w" ? 25 : 5}/>
              <Bar stackId={1} dataKey="cancelled" fill="red" barSize={chartType == "w" ? 25 : 5}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
