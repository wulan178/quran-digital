import Image from "next/image";
import React from "react";

export default function Button({ type, onClick, img, latin }) {
    return (
        <button
            className={
                type === "audio"
                    ? "rounded-full focus:outline-none relative grid place-items-center w-full h-full"
                    : "rounded-full relative grid place-items-center w-8 h-8 overflow-hidden"
            }
            onClick={onClick}
        >
            <span className='bg-primary/60 rounded-full p-0 absolute w-5/6 h-5/6 -z-10' />
            {type === "latin" && (
                <span
                    className={`absolute content-normal -rotate-45 w-8 h-0.5 bg-red-500/90 z-20 left-0 rounded-full transition-all ${
                        latin && "hidden"
                    }`}
                />
            )}
            <Image
                src={type === "audio" ? img : `/images/${img}`}
                width={32}
                height={32}
                alt={img.split(".")[0].replace("-", " ")}
            />
        </button>
    );
}
