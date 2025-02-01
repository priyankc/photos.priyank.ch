"use client";

import { useState, useEffect } from "react";
import { listAllAlbums } from "@/app/util/Albums";

export default function Albums() {
  const [albumList, setAlbumList] = useState<string[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albums = await listAllAlbums();
        if (albums) {
          setAlbumList(albums); // Store album names as strings instead of JSX elements
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
      <div>
        {albumList.length > 0 ? (
            albumList.map((albumName, index) => <p key={index}>{albumName}</p>)
        ) : (
            <p>No albums found.</p>
        )}
      </div>
  );
}