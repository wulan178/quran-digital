import Image from "next/image";

export default function SearchBar({ keyword, onChange, onKeyDown, onClick }) {
    return (
        <div className='top-1 left-0 sticky z-20 overflow-hidden rounded-full w-full flex items-center bg-black bg-opacity-30 backdrop-blur-3xl border border-neutral-200 border-opacity-40 sm:max-w-[32rem] md:max-w-[34rem] mx-auto mb-6 pr-1 -mt-6'>
            <input
                type='text'
                className='md:pl-5 pl-4 md:py-3 py-2.5 w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm md:text-base'
                placeholder='Cari surah...'
                value={keyword}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
            <button
                className='md:p-2 p-1.5 md:-mt-0 -mt-0.5 focus:outline-none ml-auto'
                onClick={onClick}
            >
                <Image
                    src='/images/search.png'
                    width={32}
                    height={32}
                    alt='search-icon'
                />
            </button>
        </div>
    );
}
