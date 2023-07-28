/* eslint-disable react/no-danger-with-children */
import { getSurahDetail } from "@/utils/api";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";

export async function getServerSideProps(context) {
    const { nomor } = context.params;
    const resp = await getSurahDetail(nomor);
    const data = resp?.data.data;
    return { props: { data } };
}

export async function generateMetadata({ params }) {
    const { nomor } = params;
    const resp = await getSurahDetail(nomor);
    const data = resp?.data.data;

    return {
        title: data.namaLatin,
    };
}

export default function Page({ data }) {
    const surahAudioRef = useRef(null);
    const ayahAudioRef = useRef(null);
    const [surahAudio, setSurahAudio] = useState(false);
    const [ayahAudio, setAyahAudio] = useState(false);
    const [latin, setLatin] = useState(true);

    const playSurah = () => {
        if (surahAudio) {
            surahAudioRef.current.pause();
        } else {
            surahAudioRef.current.play();
        }
        setSurahAudio(!surahAudio);
    };

    const playAyah = () => {
        if (ayahAudio) {
            ayahAudioRef.current.pause();
        } else {
            surahAudioRef.current.pause();
            ayahAudioRef.current.play();
        }
        setAyahAudio(!ayahAudio);
    };

    let [isOpen, setIsOpen] = useState(false);
    function MyDialog() {
        return (
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center md:p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all pb-5">
                                    <Dialog.Title as="div" className="px-6 py-3 bg-secondary">
                                        <p className="text-lg text-center font-semibold text-white">Detail Surah</p>
                                        <Image
                                            src="/x-icon.png"
                                            width={24}
                                            height={24}
                                            alt="Close"
                                            className="absolute right-3 top-3 cursor-pointer"
                                            onClick={() => setIsOpen(false)}
                                        />
                                    </Dialog.Title>
                                    <div className="md:mb-3 mb-2 grid grid-cols-12 md:p-5 p-3">
                                        <div className="md:col-span-4 col-span-5 text-gray-600">
                                            <p>Nama surah (Arab)</p>
                                            <p>Nama surah (Latin)</p>
                                            <p>Arti surah</p>
                                            <p>Jumlah ayat</p>
                                            <p>Tempat diturunkan</p>
                                        </div>
                                        <div className="md:col-span-8 col-span-7 text-gray-600">
                                            <p>: {data.nama}</p>
                                            <p>: {data.namaLatin}</p>
                                            <p>: {data.arti}</p>
                                            <p>: {data.jumlahAyat} ayat</p>
                                            <p>: {data.tempatTurun}</p>
                                        </div>
                                    </div>

                                    <div className="py-4 border-y md:mx-6 mx-4 mb-2">
                                        <p dangerouslySetInnerHTML={{ __html: data.deskripsi }} className="text-gray-600 text-justify text-sm"></p>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    }

    return (
        <main className="flex flex-col gap-4 md:p-5 mb-8">
            <MyDialog />
            <div className="fixed z-20 top-0 left-0 md:py-1 md:px-5 w-full bg-black bg-opacity-20 backdrop-blur-md md:border-b border-neutral-700 grid md:grid-cols-3">
                <Link href="/" className="hidden md:flex mr-auto my-auto">
                    <Image src="/arrow.svg" width={24} height={24} alt="arrow" />
                </Link>
                <div className="border-2 border-[#735f32] rounded-sm p-0.5">
                    <div className="border border-[#c69749] p-0.5">
                        <div className="py-1 px-2.5 flex md:flex-col md:justify-center justify-between gap-2 items-center md:text-center bg-secondary">
                            <div>
                                <p className="mb-0.5 text-lg font-semibold">{data.nama}</p>
                                <p className="text-sm font-bold">
                                    {data.namaLatin} | {data.jumlahAyat} Ayat
                                </p>
                            </div>
                            <div className="relative ml-auto my-auto flex items-center gap-1 md:hidden">
                                <div>
                                    <audio ref={surahAudioRef} src={Object.values(data.audioFull)[4]} />
                                    <button
                                        onClick={playSurah}
                                        className="rounded-full focus:outline-none relative grid place-items-center w-full h-full"
                                    >
                                        <span className="bg-secondary rounded-full p-0 absolute w-5/6 h-5/6 -z-10"></span>
                                        <Image
                                            src={surahAudio ? "/pause-button.png" : "/play-button.png"}
                                            width={32}
                                            height={32}
                                            alt={surahAudio ? "Pause" : "Play"}
                                        />
                                    </button>
                                </div>
                                <button className="rounded-full relative grid place-items-center" onClick={() => setIsOpen(true)}>
                                    <span className="bg-secondary rounded-full p-0 absolute w-5/6 h-5/6 -z-10"></span>
                                    <Image src="/about.svg" width={32} height={32} alt="Options" />
                                </button>
                                <button
                                    className="rounded-full relative grid place-items-center w-8 h-8 overflow-hidden"
                                    onClick={() => setLatin(!latin)}
                                >
                                    <span className="bg-secondary rounded-full p-0 absolute w-5/6 h-5/6 -z-10"></span>
                                    <span
                                        className={`absolute content-[''] -rotate-45 w-8 h-0.5 bg-secondary z-20 left-0 rounded-full transition-all ${
                                            latin && "hidden"
                                        }`}
                                    ></span>
                                    <Image src="/latin-icon.png" width={32} height={32} alt="Options" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative ml-auto my-auto flex items-center gap-1">
                    <div>
                        <audio ref={surahAudioRef} src={Object.values(data.audioFull)[4]} />
                        <button
                            onClick={playSurah}
                            className="hidden rounded-full focus:outline-none relative md:grid place-items-center w-full h-full"
                        >
                            <span className="bg-secondary rounded-full p-0 absolute w-5/6 h-5/6 -z-10"></span>
                            <Image
                                src={surahAudio ? "/pause-button.png" : "/play-button.png"}
                                width={32}
                                height={32}
                                alt={surahAudio ? "Pause" : "Play"}
                            />
                        </button>
                    </div>
                    <button className="hidden rounded-full relative md:grid place-items-center" onClick={() => setIsOpen(true)}>
                        <span className="bg-secondary rounded-full p-0 absolute w-5/6 h-5/6 -z-10"></span>
                        <Image src="/about.svg" width={32} height={32} alt="Options" />
                    </button>
                    <button
                        className="hidden rounded-full relative md:grid place-items-center w-8 h-8 overflow-hidden"
                        onClick={() => setLatin(!latin)}
                    >
                        <span className="bg-secondary rounded-full p-0 absolute w-5/6 h-5/6 -z-10"></span>
                        <span
                            className={`absolute content-[''] -rotate-45 w-8 h-0.5 bg-secondary z-20 left-0 rounded-full ${latin ? "" : ""}`}
                        ></span>
                        <Image src="/latin-icon.png" width={32} height={32} alt="Options" />
                    </button>
                </div>
            </div>

            <div className="mt-20 pt-1 md:pt-0">
                <p className="text-center text-xl xl:text-2xl md:mb-7 mb-5">{data.nomor !== 9 && "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"} </p>
                {data.ayat?.map((item, idx) => (
                    <div key={idx} className="relative w-full border-b border-neutral-500 px-3 md:px-0 pb-3.5 pt-5 grid grid-cols-12 gap-3">
                        <div className="col-span-1 md:pr-3 flex flex-col items-center gap-2">
                            <span className="bg-secondary flex justify-center items-center md:w-9 md:h-9 w-8 h-8 px-1 py-0.5 rounded-full md:text-sm text-xs">
                                {item.nomorAyat}
                            </span>
                        </div>
                        <div className="col-span-11 w-full pl-2.5 md:pl-0">
                            <p className="text-right leading-loose text-xl xl:text-2xl mb-7">{item.teksArab}</p>
                            {latin && <p className="mb-4 text-primary italic text-sm md:text-base 2xl:text-lg">{item.teksLatin}</p>}
                            <p className="mb-3 text-sm md:text-base 2xl:text-lg leading-relaxed">{item.teksIndonesia}</p>
                        </div>
                    </div>
                ))}
                <div className="pt-6 w-full flex justify-between gap-2 items-center my-auto">
                    {data.suratSebelumnya && (
                        <Link href={`${data.suratSebelumnya.nomor}`} className="mr-auto inline-flex items-center gap-1 md:gap-2">
                            <Image src="/arrow.svg" width={20} height={20} alt="banner" />
                            <span className="text-sm md:text-base">Surah sebelumnya</span>
                        </Link>
                    )}
                    {data.suratSelanjutnya && (
                        <Link href={`${data.suratSelanjutnya.nomor}`} className="ml-auto inline-flex items-center gap-1 md:gap-2">
                            <span className="text-sm md:text-base">Surah selanjutnya</span>
                            <Image src="/arrow.svg" width={20} height={20} alt="banner" className="rotate-180" />
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
}
