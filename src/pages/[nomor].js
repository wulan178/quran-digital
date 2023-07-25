import { getSurahDetail } from "@/utils/api";
import Image from "next/image";
import { useRef, useState } from "react";

export async function getServerSideProps(context) {
    const { nomor } = context.params;
    const resp = await getSurahDetail(nomor);
    const data = resp?.data.data;
    return { props: { data } };
}

export default function Page({ data }) {
    console.log(data);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <main className="flex flex-col gap-4 p-5 mb-10">
            <div className="fixed bottom-2 left-1/2 z-10">
                <audio ref={audioRef} src={Object.values(data.audioFull)[4]} />
                <button onClick={togglePlay} className="rounded-full relative flex justify-center items-center">
                    <span className="bg-black rounded-full p-0 absolute w-5/6 h-5/6 -z-10"></span>
                    <Image src={isPlaying ? "/pause-button.png" : "/play-button.png"} width={40} height={40} alt={isPlaying ? "Pause" : "Play"} />
                </button>
            </div>
            {data.ayat?.map((item, idx) => (
                <div key={idx} className="relative w-full border-b py-3 grid grid-cols-12 gap-1">
                    <span className="col-span-1">{item.nomorAyat}</span>
                    <div className="col-span-11 w-full">
                        <p className="text-right text-lg mb-4">{item.teksArab}</p>
                        <p className="mb-3 latin">{item.teksLatin}</p>
                        <p className="mb-3">{item.teksIndonesia}</p>
                    </div>
                </div>
            ))}
        </main>
    );
}
