"use client"
import {useState, useEffect} from "react";
import {fetchPics} from "@/app/util/pics";
import Image from "next/image";

export function Selects() {
    const [imgList, setImgList] = useState<any[]>([]);

    useEffect(() => {
        const pics = async () => {
            const {data, error} = await fetchPics()
            if (error) {
                console.error(error);
            } else {

                const newImgList = [];
                data?.forEach((item, index) =>{
                    newImgList.push(<Image
                        src={process.env.NEXT_PUBLIC_SUPABASE_URL + '/storage/v1/object/public/Selects/' + item.name}
                        alt={'image'}
                        key={index}
                        width='400'
                        height='400'
                    />);

                });
                setImgList(newImgList);
            }
        }
        pics();
    }, []);

    return <div>{imgList}</div>;
}