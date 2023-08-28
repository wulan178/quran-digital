import Head from "next/head";
import { useState } from "react";

import Banner from "@/components/Banner";
import ListCards from "@/components/ListCards";
import SearchBar from "@/components/SearchBar";
import { getSurahList } from "@/utils/api";

export async function getServerSideProps() {
    const resp = await getSurahList();
    const data = resp?.data.data;
    return { props: { data } };
}

export default function Page({ data }) {
    const [filteredData, setFilteredData] = useState(data);
    const [keyword, setKeyword] = useState("");

    function handleKeyword() {
        setFilteredData(
            data.filter(
                (item) =>
                    item.namaLatin
                        .toLowerCase()
                        .includes(keyword?.toLowerCase()) ||
                    item.arti.toLowerCase().includes(keyword?.toLowerCase()),
            ),
        );
    }

    return (
        <>
            <Head>
                <title>Quran Digital</title>
            </Head>

            <main className='p-4 pb-6'>
                <Banner />
                <SearchBar
                    keyword={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                        setFilteredData(data);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleKeyword();
                        }
                    }}
                    onClick={handleKeyword}
                />

                {/* START: LIST SURAH */}
                <section className='md:mt-14 mt-12'>
                    <h2 className='title'>LIST SURAH</h2>

                    {filteredData.length > 0 ? (
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 gap-0.5 lg:w-11/12 mx-auto'>
                            <ListCards data={filteredData} />
                        </div>
                    ) : (
                        <p className='text-center absolute left-1/2 -translate-x-1/2 md:top-3/4'>
                            Surah tidak ditemukan
                        </p>
                    )}
                </section>
                {/* END: LIST SURAH */}
            </main>
        </>
    );
}
