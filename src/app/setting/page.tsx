"use client"
import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import ToastContainerComponent from '../components/ToastContainerComponents'
import { toast } from 'react-toastify'
import { useGlobalContext } from '../store/store'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'


export default function page() {
    document.title = "Setting"
    const router = useRouter()
    const session = useSession()
    const { userInfos } = useGlobalContext()
    const getData = userInfos?.[0]
    const isInfoSubmitted = Boolean(getData);
   
    const [userProfile, setUserProfile] = useState <UserProfile> ({
        name: getData?.name || "",
        email: getData?.email || "",
        country: getData?.country || "",
        city: getData?.city || "",
        phone: getData?.phone || "" ,
        address: getData?.address || ""
    })
    
     // Render different components based on user status
     if (session.status === "unauthenticated") {
        // If user is not authenticated or is not an admin, redirect to home page
        router.push('/');
        return null; // Return null to avoid rendering anything
    }
   

    const handleUserForm = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/userinfos', userProfile);
            if (response.status === 200) {
                toast.success("User info has been added", { theme: 'colored' });
                
            }
            
        } catch (error : any ) {
            if (error?.response  && error?.response?.status === 400) {
                toast.error("Personal info already submitted", { theme: 'colored' });
            } else {
                console.log(error);
            }
        }
    };

   

    console.log( "your profile is", userProfile)

    return (
        <>
        <ToastContainerComponent/>
            <div className='w-[50%] min-h-[50vh] p-6 m-auto mt-20 rounded-md shadow-lg bg-white ' >
                <form className="max-w-2xl mx-auto" onSubmit={handleUserForm} >
                    <div className='mt-2' >
                        <div className="flex items-center justify-between">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                Name
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Enter your name"
                                disabled={isInfoSubmitted}
                                value={userProfile.name}
                                onChange={(e)=> setUserProfile({...userProfile, name: e.target.value}) }
                            ></input>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className="flex items-center justify-between">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                Email
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="email"
                                placeholder="Enter your email"
                                disabled={isInfoSubmitted}
                               value={userProfile.email}
                               onChange={(e)=> setUserProfile({...userProfile, email: e.target.value}) }
                            ></input>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className="flex items-center justify-between">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                Country
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Enter your country"
                                disabled={isInfoSubmitted}
                                value={userProfile.country}
                                onChange={(e)=> setUserProfile({...userProfile, country: e.target.value}) }
                            ></input>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className="flex items-center justify-between">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                City
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Enter your city"
                                disabled={isInfoSubmitted}
                                value={userProfile.city}
                                onChange={(e)=> setUserProfile({...userProfile, city: e.target.value}) }
                            ></input>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className="flex items-center justify-between">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                Phone Number
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="number"
                                placeholder="Enter your phone number"
                                disabled={isInfoSubmitted}
                                value={userProfile.phone}
                                onChange={(e)=> setUserProfile({...userProfile, phone: e.target.value}) }
                            ></input>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <div className="flex items-center justify-between">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                Address
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                type="text"
                                placeholder="Enter your address"
                                disabled={isInfoSubmitted}
                                value={userProfile.address}
                                onChange={(e)=> setUserProfile({...userProfile, address: e.target.value}) }
                            ></input>
                        </div>
                    </div>

                    <div className='mt-5' >
                        <button className={`bg-red-500 text-white p-2 rounded-lg w-36 h-10`} type='submit' disabled={isInfoSubmitted}  >
                            update data
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
