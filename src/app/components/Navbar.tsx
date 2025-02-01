import SignIn from "@/app/components/SignIn";
import {SessionProvider} from "next-auth/react";
import SignOut from "@/app/components/SignOut";
import Link from "next/link";

export default function Navbar() {
    return <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
        <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
            <Link className="sm:order-1 flex-none text-xl font-semibold focus:outline-none focus:opacity-80" href="/">Prixels</Link>
            <div className="sm:order-3 flex items-center gap-x-2">
                <SessionProvider>
                    <SignIn />
                    <SignOut />
                </SessionProvider>
            </div>
            <div id="hs-navbar-alignment" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2" aria-labelledby="hs-navbar-alignment-collapse">
                <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                    <Link className="font-medium text-blue-500 focus:outline-none" href="/" aria-current="page">Curated</Link>
                    <Link className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400" href="/albums">Your Albums</Link>
                </div>
            </div>
        </nav>
    </header>
}

