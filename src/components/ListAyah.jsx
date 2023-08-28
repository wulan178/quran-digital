import React from "react";

export default function ListAyah({ data, latin }) {
    return (
        <>
            {data.ayat?.map((item, idx) => (
                <div
                    key={idx}
                    className='relative w-full border-b border-neutral-500 px-3 md:px-0 pb-3.5 md:pt-6 pt-5 grid grid-cols-12 gap-3'
                >
                    <div className='col-span-1 md:pr-3 flex flex-col items-center gap-2 scale-95 md:scale-100'>
                        <span className='surah-number'>{item.nomorAyat}</span>
                    </div>
                    <div className='col-span-11 w-full pl-2.5 md:pr-2'>
                        <p className='text-right leading-extra-loose text-lg md:text-xl xl:text-3xl mb-7 md:mb-10'>
                            {item.teksArab}
                        </p>
                        {latin && (
                            <p className='mb-4 text-primary italic text-sm md:text-base 2xl:text-lg'>
                                {item.teksLatin}
                            </p>
                        )}
                        <p className='mb-3 text-sm md:text-base 2xl:text-lg leading-relaxed'>
                            {item.teksIndonesia}
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
}
