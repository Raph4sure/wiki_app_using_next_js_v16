import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button"

export function NavBar(){
    return (
        <nav className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60 sticky top-0 z-50"/>
    )
}