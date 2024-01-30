"use client"
import React from 'react';
import { useGlobalContext } from '../store/store';
import Image from 'next/image';
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
    document.title = "Order"
    const router = useRouter()
    const { checkout } = useGlobalContext();
    const session = useSession()
   
    // Render different components based on user status
    if (session.status === "unauthenticated") {
        // If user is not authenticated or is not an admin, redirect to home page
        router.push('/');
        return null; // Return null to avoid rendering anything
    }

    return (
        <>
            {
                checkout?.length > 0 ? (
                    <div className="container m-auto max-w-6xl mt-8">
                        <div className=" flex justify-around text-center gap-5 flex-wrap  ">
                            {checkout?.map((elem: any) => (
                                <div key={elem._id} className=' p-4 bg-white rounded-lg shadow-md mx-3 w-[90%] flex flex-col justify-between flex-wrap '>
                                    <div className=" flex  justify-around   ">
                                        <div className='mb-4  flex justify-around flex-col items-center ' >
                                            {elem.images.map((img: string, index: number) => (
                                                <div className=' mt-10 ' >
                                                    <Image key={index} src={img} height={100} width={100} alt={`order-image-${index}`} className="mb-2" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex justify-around flex-col  '>
                                            {elem?.title?.map((items: string, index: number) => (
                                                <div key={index} >
                                                    <h2 className='text-center font-semibold  text-sm sm:text-sm md:text-md lg:text-lg' > Title : </h2>
                                                    <h2 className=' text-gray-500 text-center text-sm sm:text-sm md:text-md lg:text-lg ' > {items} </h2>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='flex justify-around flex-col ' >
                                            {elem?.qty?.map((item: number, index: number) => (
                                                <div key={index} >
                                                    <h2 className='text-center font-semibold text-sm sm:text-sm md:text-md lg:text-lg' > Qty  </h2>
                                                    <h2 className='text-sm sm:text-sm md:text-md  text-gray-500 text-center ' >   {item} </h2>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className=' flex justify-end mt-10 ' >
                                        <h2 className='text-2xl font-semibold text-red-500 ' > Total Price : {elem.final_price}$ </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-[70vh] flex justify-center items-center flex-col ' >
                        <MdOutlineRemoveShoppingCart className=' text-7xl  ' />
                        <h2 className='text-gray-500 text-lg mt-10  ' > You have not purchased yet </h2>
                    </div>
                )
            }
        </>
    );
}
