import { getSurahList } from "@/utils/api";
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
    const [keyword, setKeyword] = useState([]);

    return (
        <main className="p-4 pb-6">
            <div className="top-1 left-0 sticky z-20 overflow-hidden rounded-lg w-full flex items-center bg-black bg-opacity-30 backdrop-blur-3xl border sm:max-w-[32rem] md:max-w-[34rem] mx-auto mb-6 pr-1">
                <input
                    type="text"
                    className="pl-3 py-3 w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    placeholder="Cari surah..."
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
                                        x.namaLatin.toLowerCase().includes(keyword.toLowerCase()) ||
                                        x.arti.toLowerCase().includes(keyword.toLowerCase())
                                )
                            );
                        }
                    }}
                />
                <button
                    className="p-2 focus:outline-none ml-auto"
                    onClick={() =>
                        setFilteredData(
                            data.filter(
                                (x) =>
                                    x.namaLatin.toLowerCase().includes(keyword.toLowerCase()) || x.arti.toLowerCase().includes(keyword.toLowerCase())
                            )
                        )
                    }
                >
                    <Image src="/search.png" width={32} height={32} alt="search-icon" />
                </button>
            </div>
            <h3 className="relative md:mt-4 mt-2 w-max mx-auto text-xl font-bold text-center after:content-[''] after:left-1/2 after:w-12 after:h-1 after:absolute after:bg-[#c69749] after:-translate-x-1/2 after:-bottom-1 after:rounded-lg mb-8">
                LIST SURAH
            </h3>
            {filteredData.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-11/12 mx-auto">
                    {filteredData?.map((item, idx) => (
                        <Link href={`${item.nomor}`} key={idx}>
                            <div className="w-full mx-auto md:max-w-[20rem] group rounded-lg border overflow-hidden border-[#735f32] hover:border-[#c69749] py-4 px-3 flex flex-col justify-center text-center gap-1 md:hover:scale-105 transition-all">
                                <div className="bg-secondary group-hover:bg-[#c69749] rounded-t-lg -mx-3 -mt-4 mb-2 py-1">
                                    <span className="md:text-xl text-lg">{item.nama}</span>
                                </div>
                                <span className="text-sm">{item.namaLatin}</span>
                                <span className="text-sm">({item.arti})</span>
                                <span className="text-xs">{`${item.tempatTurun} | ${item.jumlahAyat} Ayat`}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">Surah tidak ditemukan</p>
            )}
        </main>
    );
}
