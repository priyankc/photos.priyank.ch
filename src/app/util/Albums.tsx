"use server";

import { createClient } from "@supabase/supabase-js";

export async function listAllAlbums() {
  "use server";
  const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Error fetching buckets:", error.message);
    return [];
  }

  console.log("Bucket: ", data);

  return data.map(bucket => bucket.name);
}
