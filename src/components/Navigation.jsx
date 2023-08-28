import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navigation({ type, data }) {
    return (
        <Link
            href={
                type === "prev"
                    ? `${data.suratSebelumnya.nomor}`
                    : `${data.suratSelanjutnya.nomor}`
            }
            className={`items-center gap-1 md:gap-2 flex ${
                type === "prev"
                    ? "mr-auto flex-row"
                    : "ml-auto flex-row-reverse"
            }`}
        >
            <Image
                src='/images/arrow.svg'
                width={20}
                height={20}
                alt='banner'
                className={type !== "prev" && "rotate-180"}
            />
            <span className='text-sm md:text-base'>
                Surah {type === "prev" ? "sebelumnya" : "selanjutnya"}
            </span>
        </Link>
    );
}
