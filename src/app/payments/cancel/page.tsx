"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function cancelPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('token');

  return (
    <div>
      
        {search ? (
          <div className='max-2xl m-auto h-[80vh] flex flex-col justify-center items-center  ' >
            <Image src={'/images/error.png'} width={300} height={200} alt='error-logo' />
            <p className='text-md text-gray-400 mt-5  ' > You cancelled the payment and please visit again </p>
            <Link href={'/'} >
            <button className='mt-5 bg-red-500 rounded-md p-3  text-white ' > Go back to shopping  </button>
            </Link>
          </div>
        ) : "something went wrong "}
      
    </div>
  );
}
