'use client'
import { NavbarProfileProps } from "@/lib/types";
import NavbarMobileMenuOption from "./navbar-mobile-menu-option";
import { CloseButton } from "../buttons/close-button";
import { useMobileNavigationStore } from "@/lib/store";
import NavbarMobileMenuLogoutButton from "./navbar-mobile-menu-logout-button";

type NavbarMobileMenuProps = {
    userData: NavbarProfileProps
}

const noUserRoutes = [
    {label: "Dla biznesu", path: "/business"},
    {label: "Pomoc", path: "/support" },
    {label: "Zaloguj", path: "/sign-in" }
]

const clientRoutes = [
    {path: "/user/appointments", label: "Wizyty" },
    {path: "/user/profile", label: "Profil" },
    {path: "/user/support", label: "Pomoc" }
]

const businessRoutes = [
    {path: "/dashboard", label: "Dashboard" },
    {path: "/support", label: "Pomoc" },
]

export default function NavbarMobileMenu({userData}:NavbarMobileMenuProps) {
    const closeMenu = useMobileNavigationStore(store => store.closeMenu)

    return ( 
        <div className="h-svh w-full absolute top-0 left-0 flex flex-col gap-2 bg-white">
            <div className="w-full flex justify-end px-4 py-2">
                <CloseButton onCloseFn={closeMenu}/>
            </div>
            
            <div className="flex flex-col gap-2 px-3">
                {/* Generating routes for no signed user */}
                {userData.role == "NONAUTHORIZED" && 
                <>
                    {noUserRoutes.map((route, index) => <NavbarMobileMenuOption key={index} path={route.path} label={route.label}/>)}
                </>
                }
                
                {/* Generating routes for logged client */}
                {userData.role == "CLIENT" && 
                <>
                    {clientRoutes.map((route, index) => <NavbarMobileMenuOption key={index} path={route.path} label={route.label}/>)}
                </>
                }
                        
                {/* Generating routes for logged client */}
                {userData.role == "BUSINESS" && 
                <>
                    {businessRoutes.map((route, index) => <NavbarMobileMenuOption key={index} path={route.path} label={route.label}/>)}
                </>
                }
            </div>

            {(userData.role == "CLIENT" || userData.role == "BUSINESS") && 
            <div className="w-full absolute flex flex-col px-4 bottom-3">
                <NavbarMobileMenuLogoutButton/>
            </div>
            }
        </div>
    )
}

                        