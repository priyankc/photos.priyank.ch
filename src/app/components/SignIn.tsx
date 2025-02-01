"use client"

import {signIn, useSession} from "next-auth/react"
import Image from "next/image";

export default function SignIn() {
    const { data: session } = useSession();

    if (!session) {
        return <button type="button"
                onClick={() => signIn("google")}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            Signin With Google
        </button>


    } else {
        const user = session.user || {};
        return <div className="relative inline-block">
            <Image className="inline-block size-[46px] rounded-lg" src={user.image || ''} width={46} height={46} alt="Avatar"/>
        </div>

    }
}
