"use client"

import React from 'react'
import { useGlobalContext } from '../store/store'
import Link from 'next/link';

export default function Invoice() {
    const { checkout } = useGlobalContext();
    const randomNumber = Math.floor(Math.random() * 1000);

    // Check if checkout is an array and not empty
    const latestCheckout = Array.isArray(checkout) && checkout.length > 0 ? checkout.slice(-1)[0] : null;
    return (
        <>
            <div className='max-w-2xl m-auto bg-white shadow-md rounded-md h-auto flex justify-center items-center' >
                {
                    latestCheckout && (
                        <>

                            <div key={latestCheckout._id} className=' w-full p-3 ' >



                                <div className='flex flex-col sm:flex-col md:flex-row justify-between mt-5 mb-3 ' >
                                    <h2 className='text-lg font-bold' > Bill to </h2>
                                    <p>  {latestCheckout.user} </p>
                                </div>
                                <hr className='w-full h-1 bg-gray-400 ' />
                                <div className='flex flex-col sm:flex-col md:flex-row justify-between mt-5 mb-3' >
                                    <h2 className='text-lg font-bold' > Address : </h2>

                                    <p> {latestCheckout.address} </p>

                                </div  >
                                <hr className='w-full h-1 bg-gray-400 ' />
                                <div className='flex flex-col sm:flex-col md:flex-row justify-between mt-5 mb-3' >
                                    <h2 className='text-lg font-bold' > Email : </h2>
                                    <p> {latestCheckout.email} </p>
                                </div>
                                <hr className='w-full h-1 bg-gray-400 ' />
                                <div className='flex flex-col sm:flex-col md:flex-row justify-between mt-5 mb-3 ' >
                                    <h2 className='text-lg font-bold' > City : </h2>
                                    <p> {latestCheckout.city} </p>
                                </div>
                                <hr className='w-full h-1 bg-gray-400 ' />
                                <div className='flex flex-col sm:flex-col md:flex-row justify-between mt-5 mb-3' >
                                    <h2 className='text-lg font-bold' > Phone : </h2>
                                    <p> {latestCheckout.phone} </p>
                                </div>
                                <hr className='w-full h-1 bg-gray-400 ' />
                                <div className='flex flex-col sm:flex-col md:flex-row justify-between mt-5 mb-3 ' >
                                    <h2 className='text-lg font-bold' > Total Price : </h2>
                                    <p> {latestCheckout.final_price}$ </p>
                                </div>
                                <hr className='w-full h-1 bg-gray-400 ' />
                                <div className='flex flex-col sm:flex-col md:flex-row justify-between mt-5 mb-3' >
                                    <h2 className='text-lg font-bold' > Checkout At : </h2>
                                    <p> {new Date(latestCheckout.createdAt).toLocaleString()} </p>
                                </div>

                            </div>

                        </>
                    )

                }

            </div>
            <div className='w-full flex justify-center ' >
                <Link href={'/'} >
                    <button className='bg-red-500 p-2  text-white rounded-md mt-5 text-center ' > Back To Shopping </button>
                </Link>
            </div>
        </>
    )
}
