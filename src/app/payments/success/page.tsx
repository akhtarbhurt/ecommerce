"use client";
import Invoice from '@/app/components/Invoice';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('token');

  return (
    <div>

      {
        search ? (
          <Invoice />
        ) : (
          <div className=' h-[70vh] flex justify-center items-center w-full  ' >
            <Image src={'/images/error2.png'} width={300} height={300} alt='error-image' />
          </div>
        )
      }

    </div>
  );
}
