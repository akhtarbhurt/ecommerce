"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { FaRegEdit } from "react-icons/fa";
import { useGlobalContext } from '../store/store';
import UpdateInfos from '../components/UpdateInfos';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Page() {
    document.title = "Account"
    const { userInfos } = useGlobalContext()
    const [setUpdate, setShowUpdate] = useState<boolean>(false)
    const router = useRouter()
    const session = useSession()
    const showUpdate = () => {
        setShowUpdate(true)
    }
     // Render different components based on user status
     if (session.status === "unauthenticated") {
        // If user is not authenticated or is not an admin, redirect to home page
        router.push('/');
        return null; // Return null to avoid rendering anything
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <div className="max-w-5xl w-full mx-auto p-4 relative">
                <div className='absolute -top-4 right-5 text-2xl cursor-pointer z-0  ' onClick={showUpdate} >
                    <FaRegEdit />
                </div>

                <div className="flex flex-col md:flex-row justify-between border p-10 bg-white shadow-2xl rounded-md mt-10 sm:mt-10 md:mt-0 ">
                    {userInfos && userInfos.length > 0 ? (
                        userInfos && userInfos.map((elem: any) => {
                            return <div className="p-6 flex-grow w-[100%] sm:w-[100%] md:w-[100%] lg:w-[50%]  " key={elem._id}>
                                <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
                                <div className="mb-4  flex flex-col sm:flex-col md:flex-row justify-between items-center ">
                                    <h2 className='text-lg font-bold mb-2' >Name :</h2>
                                    <h3>{elem.name}</h3>
                                </div>
                                <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-between items-center ">
                                    <h2 className='text-lg font-bold mb-2' >Phone Number :</h2>
                                    <h3>{elem.phone}</h3>
                                </div>
                                <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-between items-center ">
                                    <h2 className='text-lg font-bold mb-2' >Country :</h2>
                                    <h3>{elem.country}</h3>
                                </div>
                                <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-between items-center ">
                                    <h2 className='text-lg font-bold mb-2' >city :</h2>
                                    <h3>{elem.city}</h3>
                                </div>
                                <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-between items-center ">
                                    <h2 className='text-lg font-bold mb-2' >Address :</h2>
                                    <div className='  w-[45%]'>
                                        <h3>{elem.address}</h3>
                                    </div>

                                </div>
                                <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-between items-center ">
                                    <h2 className='text-lg font-bold mb-2' >Email :</h2>
                                    <h3> {elem.email} </h3>
                                </div>
                                <div className="mb-4 flex flex-col sm:flex-col md:flex-row justify-between items-center " >
                                    <h2 className='text-lg font-bold mb-2' >Password</h2>
                                    <Link href='/forgot-password'>
                                        <button>
                                            ............... <span className="text-blue-500">Edit</span>
                                        </button>
                                    </Link>
                                </div  >
                                <div className={` ${setUpdate ? "block" : "hidden"} `} >
                                    <UpdateInfos setShowUpdate={setShowUpdate} elem={elem} id={elem._id} />
                                </div>
                            </div>
                        })
                    ) : (
                        <div className="p-6 flex-grow w-[100%] sm:w-[100%] md:w-[100%] lg:w-[50%]">
                            <h1 className="text-2xl font-bold mb-3 ">No Information Available</h1>
                            <Image src={'/images/info.jpg'} width={250} height={250} alt='no info' />
                            <Link href='/setting'  >
                                <button className='bg-red-500 p-2 text-white rounded-md mt-5 ' > Click here to enter information   </button>
                            </Link>
                        </div>
                    )
                    }
                    <div className=" p-6 w-[50%] flex justify-center ">
                        <Image src={'/images/profile.jpg'} height={100} width={250} alt="profile-img" />
                    </div>
                </div>
            </div>
        </div>
    );
}
