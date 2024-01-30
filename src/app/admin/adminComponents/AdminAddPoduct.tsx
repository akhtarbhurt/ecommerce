"use client"
import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import {  toast } from "react-toastify";
import { ProgressSpinner } from 'primereact/progressspinner';

export default function AdminAddPoduct() {
    const [loader, setLoader] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>({
        title: "",
        price: "",
        description: "",
        category: "",
        image: null
    })
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setProduct({ ...product, image: e.target.files?.[0] })
            setLoader(false);
        }
    };

    const handleForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoader(true);
            if (!product.title || !product.price || !product.description || !product.category || !product.image) {
                toast.error("Please fill in all required fields");
                return;
            }

            const formData = new FormData();
            formData.append("title", product.title);
            formData.append("price", product.price.toString());
            formData.append("description", product.description);
            formData.append("category", product.category);

            if (product.image !== null) {
                formData.append("image", product.image);
            }
            const response = await axios.post("/api/auth/product", formData);

            if (response.status == 200) {
                toast.success("Product Added Successfully ", { theme: "colored" });
                // clear the data after submitting 
                setProduct({
                    title: "",
                    price: "",
                    description: "",
                    category: "",
                    image: null
                });

            } else if (response.data === '') {
                toast.error(response.data.errors.message)
            } else if (response.status == 500) {
                toast.success(response.data.errors.message, { theme: "colored" });
            }

            setLoader(false);


        } catch (error) {
            console.error("API request failed:", error);
        }
    };

    return (
        <>
          
            <form onSubmit={handleForm} className="max-w-2xl mx-auto bg-white p-5 rounded-md shadow-md" >
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
                            onChange={(e) => setProduct({ ...product, title: e.target.value })}
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
                            type="number"
                            placeholder="Enter your product price"
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
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
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
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
                        <select
                            className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            defaultValue=""  // Add defaultValue to set the default selected option
                        >
                            <option value="" disabled>
                                Select Your Category
                            </option>
                            <option value="men clothes">men clothes</option>
                            <option value="women clothes">women clothes</option>
                            <option value="jewellery">Jewellery</option>
                            <option value="tech">Tech</option>
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
                            placeholder="Enter you admin city"
                            name='file'
                            onChange={onChangeHandler}
                        ></input>
                    </div>
                </div>
                <div className='mt-5' >
                    <button className={`bg-red-500 text-white p-2 rounded-lg w-36 h-10  ${loader ? "bg-red-200" :"" } `} >
                        {loader ? <ProgressSpinner className={'w-6 h-6   '} strokeWidth='5'  /> : "Upload Data"}
                    </button>
                </div>
            </form>
        </>
    )
}
