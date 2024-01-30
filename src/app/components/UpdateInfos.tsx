"use client"
import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { ImCross } from 'react-icons/im'
import ToastContainerComponent from './ToastContainerComponents'
import { toast } from 'react-toastify'

export default function UpdateInfos({elem, id, setShowUpdate} : any ) {
    const [updateUserInfo, setUpdateUserInfo] = useState  ({
        name: elem.name,
        phone: elem.phone,
        country: elem.country,
        city: elem.city,
        address: elem.address,
        email: elem.email
    })
    const handleUpdateForm = async (e : FormEvent)=>{
        e.preventDefault()
        try {
            const response = await axios.put(`api/auth/userinfos/${id}`, updateUserInfo)
            if(response.status === 200){
                toast.success('user data updated successfully', {theme: "colored"})
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
    <ToastContainerComponent/>
       <div className=' fixed top-0 left-0 w-full h-screen flex justify-center items-center z-30 bg-black-rgba ' >
                <div className=' fixed top-2 sm:top-2 md:top-10  right-2 sm:right-2 md:right-16 text-white ' >
                    <span className='cursor-pointer' onClick={()=> setShowUpdate(false)} > <ImCross /> </span>
                </div>
                <section className=' bg-white p-2 rounded-md shadow-slate-600 w-96 ' >
                    <form onSubmit={handleUpdateForm} >
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
                                    value={updateUserInfo.name}
                                    onChange={ (e)=>  setUpdateUserInfo({...updateUserInfo, name: e.target.value}) }
                                ></input>

                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Phone
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="number"
                                    placeholder="Enter your phone number"
                                    value={updateUserInfo.phone}
                                    onChange={ (e)=>  setUpdateUserInfo({...updateUserInfo, phone : e.target.value}) }
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
                                    value={updateUserInfo.country}
                                    onChange={ (e)=>  setUpdateUserInfo({...updateUserInfo, country : e.target.value}) }
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
                                    value={updateUserInfo.city}
                                    onChange={ (e)=>  setUpdateUserInfo({...updateUserInfo, city : e.target.value}) }
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
                                    value={updateUserInfo.address}
                                    onChange={ (e)=>  setUpdateUserInfo({...updateUserInfo, address : e.target.value}) }
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
                                    type="text"
                                    placeholder="Enter your email"
                                    value={updateUserInfo.email}
                                    onChange={ (e)=>  setUpdateUserInfo({...updateUserInfo, email : e.target.value}) }
                                ></input>
                            </div>
                        </div>
                        
                        
                        <div className='mt-5 text-center' >
                            <button className='bg-red-500 text-white p-2 rounded-lg'  > Update Data </button>
                        </div>
                    </form>
                </section>
            </div>
    </>
  )
}
