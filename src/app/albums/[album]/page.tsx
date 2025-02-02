import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getImages(album: string) {
  const { data: files, error } = await supabase.storage.from(album).list();

  if (error || !files) return [];

  return files.map((file) => ({
    name: decodeURIComponent(file.name),
    url: decodeURIComponent(
        supabase.storage.from(album).getPublicUrl(decodeURIComponent(file.name)).data.publicUrl
    ),
  }));
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ album: string }>
}) {
  const album = (await params).album;
  const images = await getImages(album);

  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{album} Album</h1>

        {images.length === 0 ? (
            <p className="text-gray-500">No images found in this album.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
              {images.map(({ name, url }) => (
                  <Link key={name} href={`/albums/${album}/${encodeURIComponent(name)}`}>
                    <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                      <Image
                          src={url}
                          alt={name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover rounded-lg"
                          priority
                      />
                      <p className="text-sm text-gray-600 mt-2 text-center">{name}</p>
                    </div>
                  </Link>
              ))}
            </div>
        )}

        <Link
            href="/albums"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Back to Albums
        </Link>
      </div>
  );
}
