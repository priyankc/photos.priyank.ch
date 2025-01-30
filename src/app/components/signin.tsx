"use client"

import {signIn, useSession} from "next-auth/react"

export default function SignIn() {
    const { data: session } = useSession();
    if (!session) {
        return <button onClick={() => signIn("google")}>Sign In</button>
    } else {
        const user = session.user || {};

        return <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.image}</p>
            <p>{user.id}</p>
        </div>;
    }
}
