"use server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

import { createClient } from "@supabase/supabase-js";
export async function listAllAlbums() {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Error fetching buckets:", error.message);
    return [];
  }

  console.log("Bucket: ", data);

  return data.map(bucket => bucket.name);
}


export async function getAlbumsWithFirstImage() {
  // Step 1: Get all buckets (albums)
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.error('Error fetching albums:', bucketError);
    return [];
  }

  // Step 2: Fetch the first image from each album
  const albumData = await Promise.all(
      buckets.map(async (bucket) => {
        const { data: files, error: fileError } = await supabase.storage
        .from(bucket.name)
        .list();
        console.log(files);
        console.log(fileError);

        if (fileError || !files || files.length === 0) {
          return { album: bucket.name, firstImage: null };
        }

        // Get public URL of first image
        const firstImageUrl = supabase.storage.from(bucket.name).getPublicUrl(files[0].name).data.publicUrl;

        return { album: bucket.name, firstImage: firstImageUrl };
      })
  );

  return albumData;
}

