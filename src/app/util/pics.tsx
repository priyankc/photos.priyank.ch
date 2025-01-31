"use server"

import {createClient} from "@supabase/supabase-js";

export async function fetchPics() {
    "use server"
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    return await supabase.storage
        .from('Selects')
        .list()
}