"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function SignOut() {
    const { data: session } = useSession()
    if (session) {
        return <button onClick={() => signOut()}>Sign Out</button>
    } else {
        return;
    }
}