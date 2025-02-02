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

  return files.map((file) => file.name);
}

export default async function ImagePage({
  params,
}: {
  params: Promise<{ album: string, image: string }>
}) {
  const { album, image } = await params;

  // Get the public URL of the image
  const images = await getImages(album);
  const currentIndex = images.indexOf(image);
  const prevImage = currentIndex > 0 ? images[currentIndex - 1] : null;
  const nextImage = currentIndex < images.length - 1 ? images[currentIndex + 1] : null;

  // Generate URLs
  const imageUrl = decodeURIComponent(supabase.storage.from(album).getPublicUrl(image).data.publicUrl);
  const prevImageUrl = prevImage ? `/albums/${album}/${encodeURIComponent(prevImage)}` : null;
  const nextImageUrl = nextImage ? `/albums/${album}/${encodeURIComponent(nextImage)}` : null;


  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{image}</h1>

        <div className="relative w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg">
          <Image
              src={imageUrl}
              alt={image}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
              priority
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full max-w-4xl mt-4">
          {prevImageUrl ? (
              <Link href={prevImageUrl} className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
                ← Previous
              </Link>
          ) : (
              <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">← Previous</span>
          )}

          <Link
              href={`/albums/${album}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Back to {album}
          </Link>

          {nextImageUrl ? (
              <Link href={nextImageUrl} className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">
                Next →
              </Link>
          ) : (
              <span className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">Next →</span>
          )}
        </div>
      </div>
  );
}