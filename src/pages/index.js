import { getSurahList } from "@/utils/api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps() {
    const resp = await getSurahList();
    const data = resp?.data.data;
    return { props: { data } };
}

export default function Page({ data }) {
    const [filteredData, setFilteredData] = useState(data);
    const [keyword, setKeyword] = useState("");

    return (
        <>
            <Head>
                <title>Quran Digital</title>
            </Head>

            <main className='p-4 pb-6'>
                <div className='h-[45vh] relative -m-4 group'>
                    <div className="absolute inset-0 bg-cover bg-left-bottom bg-[url('/images/bg.jpg')]"></div>
                    <div className='absolute inset-0 bg-black/70 backdrop-blur-0 group-hover:bg-black/60 transition-opacity' />
                    <div className='absolute inset-0 flex items-center justify-center text-white'>
                        <h1 className='text-5xl font-bold -mt-14'>
                            Quran Digital
                        </h1>
                    </div>
                </div>

                <div className='top-1 left-0 sticky z-20 overflow-hidden rounded-full w-full flex items-center bg-black bg-opacity-30 backdrop-blur-3xl border border-neutral-200 border-opacity-40 sm:max-w-[32rem] md:max-w-[34rem] mx-auto mb-6 pr-1 -mt-6'>
                    <input
                        type='text'
                        className='pl-5 py-3 w-full bg-transparent text-white placeholder-gray-400 focus:outline-none'
                        placeholder='Cari surah...'
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            setFilteredData(data);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setFilteredData(
                                    data.filter(
                                        (x) =>
                                            x.namaLatin
                                                .toLowerCase()
                                                .includes(
                                                    keyword?.toLowerCase(),
                                                ) ||
                                            x.arti
                                                .toLowerCase()
                                                .includes(
                                                    keyword?.toLowerCase(),
                                                ),
                                    ),
                                );
                            }
                        }}
                    />
                    <button
                        className='p-2 focus:outline-none ml-auto'
                        onClick={() =>
                            setFilteredData(
                                data.filter(
                                    (x) =>
                                        x.namaLatin
                                            .toLowerCase()
                                            .includes(keyword.toLowerCase()) ||
                                        x.arti
                                            .toLowerCase()
                                            .includes(keyword.toLowerCase()),
                                ),
                            )
                        }
                    >
                        <Image
                            src='/images/search.png'
                            width={32}
                            height={32}
                            alt='search-icon'
                        />
                    </button>
                </div>

                <section className='mt-14'>
                    <h3 className='relative md:mt-4 w-max mx-auto text-2xl font-bold text-center after:content-normal after:left-1/2 after:w-12 after:h-1 after:absolute after:bg-primary after:-translate-x-1/2 after:-bottom-1 after:rounded-lg mb-12'>
                        LIST SURAH
                    </h3>

                    {filteredData.length > 0 ? (
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-11/12 mx-auto'>
                            {filteredData?.map((item, idx) => (
                                <Link href={`${item.nomor}`} key={idx}>
                                    <div className='w-full mx-auto md:max-w-[20rem] group rounded-lg overflow-hidden md:hover:scale-105 transition-all py-4 flex flex-col justify-center text-center'>
                                        <div className='bg-primary bg-opacity-60 group-hover:bg-opacity-80 rounded-lg -mx-3 -mt-4 py-1.5'>
                                            <span className='md:text-xl text-lg'>
                                                {item.nama}
                                            </span>
                                        </div>
                                        <div className='border border-t-0 border-primary border-opacity-60 group-hover:border-opacity-80 py-4 px-3 flex flex-col justify-center text-center gap-1 rounded-b-lg'>
                                            <span className='text-sm'>
                                                {item.namaLatin}
                                            </span>
                                            <span className='text-sm'>
                                                ({item.arti})
                                            </span>
                                            <span className='text-xs'>{`${item.tempatTurun} | ${item.jumlahAyat} Ayat`}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center absolute left-1/2 -translate-x-1/2 top-3/4'>
                            Surah tidak ditemukan
                        </p>
                    )}
                </section>
            </main>
        </>
    );
}
