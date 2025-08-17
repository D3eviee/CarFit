import Link from "next/link"

export const BusinessTrySection = () => {
  return (
    <div className="pt-20 ">
       <Link href="business/sign-in">
            <div className="w-fit px-8 py-3 rounded-2xl mx-auto bg-[#0271E3] text-white shadow-xl active:scale-xs hover:bg-[#1382F2] sm:px-13 sm:py-5">
                Dołącz za darmo
            </div>
        </Link>
    </div>
  )
}
