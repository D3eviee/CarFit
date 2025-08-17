import Link from "next/link";
import NavbarDashboardMenuButton from "./dashboard-mobile-navbar-menu-button";

export default async function DashboardMobileNavbar(){
    return(
        <nav className="w-full fixed flex flex-row justify-between items-center py-3 px-4 bg-white inset-shadow-glass z-99 lg:hidden">
            <Link href="/">
                <h3 className="text-[#191919] text-xl font-medium leading-4 tracking-tight">CarFit</h3>
            </Link>
            <NavbarDashboardMenuButton/>
        </nav> 
    )
}