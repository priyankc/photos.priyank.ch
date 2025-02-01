import NextAuth from "next-auth"
import Google from "@auth/core/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const { email, name, image } = user;

                if (!email) return false; // Ensure email exists

                try {
                    // Check if user exists
                    const { data: existingUser, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", email)
                    .single();

                    if (error && error.code !== "PGRST116") {
                        console.error("Error fetching user:", error);
                        return false; // Deny sign-in on error
                    }

                    if (existingUser) {
                        // Update user info & last login
                        await supabase
                        .from("users")
                        .update({
                            name,
                            image,
                            last_login: new Date().toISOString(),
                        })
                        .eq("email", email);
                    } else {
                        // Create new user
                        await supabase.from("users").insert([
                            {
                                email,
                                name,
                                image,
                                provider: "google",
                                provider_id: account.providerAccountId,
                                last_login: new Date().toISOString(),
                            },
                        ]);
                    }

                    return true; // Allow sign-in
                } catch (error) {
                    console.error("Sign-in error:", error);
                    return false;
                }
            }
            return true;
        },

        async session({ session, user }) {
            if (session?.user?.email) {
                // Fetch user details from Supabase
                const { data: userData, error } = await supabase
                .from("users")
                .select("id")
                .eq("email", session.user.email)
                .single();

                if (!error && userData) {
                    session.user.id = userData.id;
                }
            }
            return session;
        },
    }
})