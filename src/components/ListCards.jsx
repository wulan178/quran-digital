import Link from "next/link";

export default function ListCards({ data }) {
    return (
        <>
            {data?.map((item, idx) => (
                <Link href={`${item.nomor}`} key={idx}>
                    <div className='card group'>
                        <div className='bg-primary bg-opacity-60 group-hover:bg-opacity-80 rounded-lg -mx-3 -mt-4 py-1.5'>
                            <span className='md:text-xl text-lg'>
                                {item.nama}
                            </span>
                        </div>
                        <div className='border border-t-0 border-primary border-opacity-60 group-hover:border-opacity-80 py-4 px-3 flex flex-col justify-center text-center gap-1 rounded-b-lg'>
                            <span className='text-sm'>{item.namaLatin}</span>
                            <span className='text-sm'>({item.arti})</span>
                            <span className='text-xs'>{`${item.tempatTurun} | ${item.jumlahAyat} Ayat`}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}
