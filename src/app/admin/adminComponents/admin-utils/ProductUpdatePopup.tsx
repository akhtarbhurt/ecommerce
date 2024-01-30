"use client"
import ToastContainerComponent from '@/app/components/ToastContainerComponents';
import axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ImCross } from "react-icons/im";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductUpdatePopup({ id, setIsTrue, elem, initialImage }: any) {


    const [updateValue, setUpdateValue] = useState<Product>({
        title: elem.title,
        price: elem.price,
        description: elem.description,
        category: elem.category,
        image: initialImage
    })
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setUpdateValue({ ...updateValue, image: e.target.files?.[0] })
        }
    };
    const handleUpdateForm = async (e: FormEvent) => {
        
        e.preventDefault();
        if (!updateValue.title || !updateValue.price || !updateValue.description || !updateValue.category || !updateValue.image) {
            toast.error("Please fill in all required fields");
            return;
          }

        try {
            const formData = new FormData();
            formData.append('title', updateValue.title);
            formData.append('price', updateValue.price.toString());
            formData.append('description', updateValue.description);
            formData.append('category', updateValue.category);
            if (updateValue.image !== null && updateValue.image !== initialImage) {
                formData.append('image', updateValue.image);
            }

            const response = await axios.put(`/api/auth/product/${id}`, formData)

            if (response.status == 200) {
                toast.success("Product Updated", { theme: "colored" });
               
            }
            console.log(response)
           
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    return (
        <>
            <ToastContainerComponent/>
            <div className=' fixed top-0 left-0 w-full h-screen flex justify-center items-center z-30 bg-black-rgba ' >
                <div className=' fixed top-2 sm:top-2 md:top-10  right-2 sm:right-2 md:right-16 text-white ' >
                    <span className='cursor-pointer' onClick={() => setIsTrue(false)} > <ImCross /> </span>
                </div>
                <section className=' bg-white p-2 rounded-md shadow-slate-600 max-w-full ' >
                    <form onSubmit={handleUpdateForm} >
                        <div className='mt-2' >
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Title
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your Product title"
                                    value={updateValue.title}

                                    onChange={(e) => setUpdateValue({ ...updateValue, title: e.target.value })}
                                ></input>

                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Price
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Enter your product price"
                                    value={updateValue.price}
                                    onChange={(e) => setUpdateValue({ ...updateValue, price: e.target.value })}
                                ></input>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Description
                                </label>

                            </div>
                            <div className="mt-2">
                                <textarea
                                    className="flex h-36 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-none"

                                    placeholder="Enter your product description"
                                    value={updateValue.description}
                                    onChange={(e) => setUpdateValue({ ...updateValue, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Category
                                </label>

                            </div>
                            <div className="mt-2">
                                <select className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                                    value={updateValue.category}
                                    onChange={(e) => setUpdateValue({ ...updateValue, category: e.target.value })}
                                >

                                    <option value="men clothes"> men clothes </option>
                                    <option value="women clothes"> women clothes </option>
                                    <option value="jewellery"> Jewellery </option>
                                    <option value="tech"> Tech </option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Image
                                </label>

                            </div>
                            <div className="mt-2">
                                <input

                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="file"

                                    name='file'

                                    onChange={onChangeHandler}
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
