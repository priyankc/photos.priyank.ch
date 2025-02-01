"use client"
import {useState, useEffect, ReactElement} from "react";
import {fetchPicsFromAlbum} from "@/app/util/Photos";
import Image from "next/image";

export function HomeGallery() {
    const [imgList, setImgList] = useState<ReactElement[]>([]);
    const bucketName = process.env.HOME_PAGE_BUCKET || 'Home';

    useEffect(() => {
        const photos = async () => {
            const {data, error} = await fetchPicsFromAlbum(bucketName)
            if (error) {
                console.error(error);
            } else {

                const newImgList: ReactElement[] = [];
                data?.forEach((item, index) =>{
                    newImgList.push(<Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${item.name}`}
                        alt={'image'}
                        key={index}
                        width='10000'
                        height='10000'
                        className="w-max h-auto"
                    />);

                });
                setImgList(newImgList);
            }
        }
        photos();
    }, [bucketName]);

    return <div>{imgList}</div>;
}