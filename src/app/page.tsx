import SignIn from "@/app/components/signin";
import SignOut from "@/app/components/signout";
import { SessionProvider } from "next-auth/react"

export default function Home() {
  return (
      <div>
      <div>

      Welcome to my Home!
      First time with NextJS
    </div>
      <div>
          <SessionProvider>
              <SignIn />
              <SignOut />
          </SessionProvider>
      </div>
    </div>
  );
}
