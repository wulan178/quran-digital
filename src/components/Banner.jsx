import React from 'react'

export default function Banner() {
  return (
      <div className='md:h-[45vh] h-[27vh] relative -m-4 group'>
          <div className="absolute inset-0 bg-cover bg-left-bottom bg-[url('/images/bg.jpg')]" />
          <div className='absolute inset-0 bg-black/70 backdrop-blur-0 group-hover:bg-black/60 transition-opacity' />
          <div className='absolute inset-0 flex items-center justify-center text-white'>
              <h1 className='md:text-5xl text-4xl font-bold -mt-14'>Quran Digital</h1>
          </div>
      </div>
  );
}
