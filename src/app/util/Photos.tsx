"use server"

import {createClient} from "@supabase/supabase-js";

export async function fetchPicsFromAlbum(album: string) {
    "use server"
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');
    return await supabase.storage
        .from(album)
        .list()
}