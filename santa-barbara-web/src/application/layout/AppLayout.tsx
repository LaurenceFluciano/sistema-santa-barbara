import { LogoIcon } from "@/ui/icons/LogoIcon";
import { Outlet } from "react-router";


function AppLayout() {
    return (
        <>
            <header>
                <nav className="flex flex-row px-8 py-8 bg-[var(--strong-surface-color)]">
                    <LogoIcon className="w-[126px] h-[126px]"/>
                </nav>
            </header>
            <main className="w-sreen flex flex-col">
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout;
