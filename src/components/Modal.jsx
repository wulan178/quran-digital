import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";

export default function Modal({ show, onClose, data }) {
    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as='div' className='relative z-30' onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-50' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center md:p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all pb-5'>
                                <Dialog.Title
                                    as='div'
                                    className='px-6 py-3 bg-primary/70 backdrop-brightness-0'
                                >
                                    <p className='text-lg text-center font-semibold text-white'>
                                        Detail Surah
                                    </p>
                                    <Image
                                        src='/images/x-icon.png'
                                        width={24}
                                        height={24}
                                        alt='Close'
                                        className='absolute right-3 top-3 cursor-pointer'
                                        onClick={onClose}
                                    />
                                </Dialog.Title>
                                <div className='md:mb-3 mb-2 grid grid-cols-12 md:p-5 p-3'>
                                    <div className='md:col-span-4 col-span-5 text-gray-600'>
                                        <p>Nama surah (Arab)</p>
                                        <p>Nama surah (Latin)</p>
                                        <p>Arti surah</p>
                                        <p>Jumlah ayat</p>
                                        <p>Tempat diturunkan</p>
                                    </div>
                                    <div className='md:col-span-8 col-span-7 text-gray-600'>
                                        <p>: {data?.nama}</p>
                                        <p>: {data?.namaLatin}</p>
                                        <p>: {data?.arti}</p>
                                        <p>: {data?.jumlahAyat} ayat</p>
                                        <p>: {data?.tempatTurun}</p>
                                    </div>
                                </div>

                                <div className='py-4 border-y md:mx-6 mx-4 mb-2'>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: data?.deskripsi,
                                        }}
                                        className='text-gray-600 text-justify text-sm'
                                    ></p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
