import { cn } from "@/utils";
export const AppointmentTableStatusCell = ({getValue}) => {
    const status = getValue();

    return (
        <div className="max-w-30">
            <p 
            className={cn("text-xs lg:text-sm font-medium w-fit px-2 py-0.5 rounded-lg", 
            status == "Odwołana" && "bg-[#FF383C] text-white",
            status == "Zarezerwowana" &&  "bg-[#52B66E] text-white",
            status == "Oczekująca" &&  "bg-yellow-500 text-white")}
            >
                {status}
            </p>
        </div>
    )
}