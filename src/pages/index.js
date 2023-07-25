import { getSurahList } from "@/utils/api";
import Link from "next/link";

export async function getServerSideProps() {
    const resp = await getSurahList();
    const data = resp?.data.data;
    return { props: { data } };
}

export default function Page({ data }) {
    console.log(data);
    return (
        <main className="grid grid-cols-4 gap-2 p-5">
            {data?.map((item, idx) => (
                <Link href={`${item.nomor}`} key={idx}>
                    <div className="w-full rounded-md border py-4 px-3 flex flex-col justify-center text-center gap-2">
                        <span className="text-lg">{item.nama}</span>
                        <span>{item.namaLatin}</span>
                        <span>({item.arti})</span>
                        <span>{`${item.tempatTurun} | ${item.jumlahAyat} Ayat`}</span>
                    </div>
                </Link>
            ))}
        </main>
    );
}
