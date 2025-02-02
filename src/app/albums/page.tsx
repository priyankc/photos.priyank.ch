"use client";

import { useState, useEffect } from "react";
import { getAlbumsWithFirstImage } from "@/app/util/Albums";
import Image from "next/image";
import Link from "next/link";

type Album = {
  album: string;
  firstImage: string | null;
}

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getAlbumsWithFirstImage();
      setAlbums(data);
    }
    fetchData();
  }, []);

  return (
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-bold mb-4">Albums</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {albums.map(({ album, firstImage }) => (
              <div key={album} className="p-4 border rounded-lg shadow-md">
                <h2 className="font-semibold">{album}</h2>
                {firstImage ? (
                    <Link href={`/albums/${album}`}>
                    <Image src={firstImage} alt={album}  width='250' height='250'
                           className="w-full h-auto rounded-lg mt-2" />
                    </Link>
                ) : (
                    <p className="text-gray-500">No images</p>
                )}
              </div>
          ))}
        </div>
      </div>
  );
}