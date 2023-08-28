/* eslint-disable react/no-danger-with-children */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import Button from "@/components/Button";
import ListAyah from "@/components/ListAyah";
import Modal from "@/components/Modal";
import Navigation from "@/components/Navigation";
import { getSurahDetail } from "@/utils/api";

export async function getServerSideProps(context) {
    const { nomor } = context.params;
    const resp = await getSurahDetail(nomor);
    const data = resp?.data.data;
    return { props: { data } };
}

export default function Page({ data }) {
    const surahAudioRef = useRef(null);

    const [surahAudio, setSurahAudio] = useState(false);
    const [latin, setLatin] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const playSurah = () => {
        if (surahAudio) {
            surahAudioRef.current.pause();
        } else {
            surahAudioRef.current.play();
        }
        setSurahAudio(!surahAudio);
    };

    const RenderListButtons = ({ screen }) => {
        return (
            <div
                className={`relative ml-auto my-auto items-center gap-1 ${
                    screen === "md" ? "md:flex hidden" : "flex md:hidden"
                }`}
            >
                <div>
                    <audio
                        ref={surahAudioRef}
                        src={Object.values(data.audioFull)[4]}
                    />
                    <Button
                        type='audio'
                        onClick={playSurah}
                        img={
                            surahAudio
                                ? "/pause-button.png"
                                : "/play-button.png"
                        }
                    />
                </div>
                <Button onClick={() => setIsOpen(true)} img='about.svg' />
                <Button
                    type='latin'
                    latin={latin}
                    onClick={() => setLatin(!latin)}
                    img='latin-icon.png'
                />
            </div>
        );
    };

    return (
        <>
            <Head>
                <title>{data.namaLatin}</title>
            </Head>

            <main className='flex flex-col gap-4 md:p-5 mb-8'>
                {/* START: SURAH DETAIL */}
                <Modal
                    show={isOpen}
                    onClose={() => setIsOpen(false)}
                    data={data}
                />
                {/* END: SURAH DETAIL */}

                {/* START: HEADER */}
                <header className='detail-surah-header'>
                    <Link href='/' className='hidden md:flex mr-auto my-auto'>
                        <Image
                            src='/images/arrow.svg'
                            width={24}
                            height={24}
                            alt='arrow'
                        />
                    </Link>

                    <div className='border-2 border-primary/50 rounded-sm p-0.5'>
                        <div className='border border-primary/30 p-0.5'>
                            <div className='detail-surah-options'>
                                <div>
                                    <p className='mb-0.5 text-xl md:text-xl font-medium'>
                                        {data.nama}
                                    </p>
                                    <p className='text-sm font-semibold'>
                                        {data.namaLatin} | {data.jumlahAyat}{" "}
                                        Ayat
                                    </p>
                                </div>
                                <RenderListButtons />
                            </div>
                        </div>
                    </div>
                    <RenderListButtons screen='md' />
                </header>
                {/* END: HEADER */}

                <div className='mt-20 pt-1 md:pt-0'>
                    <p className='text-center text-lg md:text-xl xl:text-3xl md:mb-7 mb-5'>
                        {data.nomor !== 9 &&
                            "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}{" "}
                    </p>

                    {/* START: LIST OF AYAH */}
                    <ListAyah data={data} latin={latin} />
                    {/* END: LIST OF AYAH */}

                    {/* START: PAGE NAVIGATION */}
                    <div className='pt-6 md:px-0 px-2 w-full flex justify-between gap-2 items-center my-auto'>
                        {data.suratSebelumnya && (
                            <Navigation type='prev' data={data} />
                        )}
                        {data.suratSelanjutnya && (
                            <Navigation type='next' data={data} />
                        )}
                    </div>
                    {/* END: PAGE NAVIGATION */}
                </div>
            </main>
        </>
    );
}
