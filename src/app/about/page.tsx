import Image from 'next/image'
import React from 'react'
export const metadata = {
    title: "About",
  };
export default function page() {
    return (
        <>
            <div className='max-w-7xl m-auto  h-auto  mt-10 p-5 ' >
                <div className='bg-white shadow-lg p-5 ' >
                    <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row  gap-5 items-center  ' >
                        <div className='w-full' >
                            <Image src={'/images/about-01.png'} width={400} className='rounded-lg' height={300} alt='about-img' />
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold flex items-center ' > Online shopping includes both buying things online. </h2>
                            <p className='text-md mt-5 text-gray-500 ' > Salesforce B2C Commerce can help you create unified, intelligent digital commerce experiences — both online and in the store. Empower your sales teams with industry tailored solutions that support manufacturers as they go digital, and adapt to changing markets & customers faster by creating new business.  </p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row gap-5 items-center mt-20  ' >
                        <div className=' order-2 sm:order-2 md:order-2 lg:order-1 '  >
                            <h2 className='text-lg font-semibold flex items-center ' > Solutions that work together </h2>
                            <p className='text-md mt-5 text-gray-500 ' > Publish your eCommerce site quickly with our easy-to-use store builder— no coding required. Migrate your items from your point of sale system or turn your Instagram feed into a shopping site and start selling fast. Square Online works for all kinds of businesses—retail, restaurants, services.  </p>
                        </div>
                        <div className=' order-1 sm:order-1 md:order-1 lg:order-2 w-full ' >
                            <Image src={'/images/about-02.png'} width={400} height={300} className='rounded-lg' alt='about-img' />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row  gap-5 items-center mt-20  ' >
                        <div className='w-full' >
                            <Image src={'/images/about-02.png'} width={400} height={300} className='rounded-lg' alt='about-img' />
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold flex items-center ' > Solutions that work together </h2>
                            <p className='text-md mt-5 text-gray-500 ' > Publish your eCommerce site quickly with our easy-to-use store builder— no coding required. Migrate your items from your point of sale system or turn your Instagram feed into a shopping site and start selling fast. Square Online works for all kinds of businesses—retail, restaurants, services.  </p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
