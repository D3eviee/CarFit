"use client"
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { AppointmentDateCell } from "@/components/dashboard/appointments/appointments-date-cell"
import { AppointmentTablePriceCell } from "@/components/dashboard/appointments/appointments-table-price-cell"
import { AppointmentTableStatusCell }  from "@/components/dashboard/appointments/appointments-table-status-cell"
import { AppointmentNameCell } from "@/components/dashboard/appointments/appointments-name-cell";
import { AppointmentPhoneCell } from "@/components/dashboard/appointments/appointments-phone-cell";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { Error } from "@/components/error";
import { AppointmentsTableFilters } from "@/components/dashboard/appointments/appointments-table-filters";
import { useModalStore } from "@/lib/store";
import { getAppointmentsTableData } from "@/app/dashboard/appointments/actions";
import { DashboardAppointmentsDetailsModal } from "@/components/modals/dashboard/appointments/dashboard-appointments-details-modal";

export const AppointmentsTable = () => {
  // Modal state
  const openModal = useModalStore(store => store.openModal)

  //data
  const {data: appointmentsData, status: appointmentsStatus} = useQuery({
    queryKey: ["getAppointmentsTableData"],
    queryFn: async () => {
      const response = await getAppointmentsTableData()
      if(!response.success) return null
      return response.data
    }
  })

  const columns = [
    {
      accessorKey: "clientName",
      header: "Imię i nazwisko",
      cell: AppointmentNameCell 
    },
    {
      accessorKey: "clientPhone",
      header: "Telefon",
      cell: AppointmentPhoneCell,
      enableSorting: false
    },
    {
      accessorKey: "reservationStart",
      header: "Data",
      cell: AppointmentDateCell 
    },
    {
      accessorKey: "charge",
      header: "Koszt",
      cell: AppointmentTablePriceCell
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      cell: AppointmentTableStatusCell
    },
  ]

  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>() 

  const table = useReactTable({
    data: appointmentsData ?? [],
    columns,
    // state: {
    //   columnFilters,
    // },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  
  if(appointmentsStatus === "pending") return <Spinner/>
  if(appointmentsStatus === "error") return <Error/>

  return (
    <div className="w-full h-full relative flex flex-col gap-3 overflow-hidden">
      {/* SEARCH AND FILTERS */}
      <AppointmentsTableFilters/>

      {/* TABLE */}
      <div className="w-full h-full overflow-scroll">
        <table className="w-full h-fit border-[0.5px] border-[#D4D4D4]">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => 
                    <tr key={headerGroup.id} className="bg-[#F2F2F7] text-[#2B2B2B] font-medium text-xs lg:text-sm">
                        {headerGroup.headers.map((header) => 
                            <th key={header.id} className="text-left border-l-[0.5px] border-l-[#D4D4D4] first-of-type:border-l-0">
                                <div className="px-3 p-2 lg:px-3 lg:py-1.5">{flexRender(header.column.columnDef.header, header.getContext())}</div>
                            </th>
                        )}
                    </tr>
                )}
            </thead>
            
            <tbody>
                {table.getRowModel().rows.map((row) => 
                    <tr key={row.id} 
                        className="even:bg-[#F2F2F7]" 
                        onClick={() => openModal(<DashboardAppointmentsDetailsModal appointmentData={row.original}/> )}
                    >
                        {row.getVisibleCells().map(cell => 
                            <td key={cell.id}>
                                <div className="px-2 p-2.5 lg:px-3 lg:py-1.5 text-[#191919]">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    
    {/* TABLE PAGES */}
    <div className="w-full absolute bottom-10 left-5 flex items-center justify-start gap-1">
        <div className="flex flex-row gap-3"> 
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="text-xs px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"> 
                <ChevronLeft/> 
          </button> 
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="text-xs px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50" > 
            <ChevronRight/> 
          </button> 
        </div>
        <p className="text-sm text-[#333] font-light">{`Strona ${table.getState().pagination.pageIndex + 1} z ${table.getPageCount()}`}</p>
      </div>
    </div>
  )
}