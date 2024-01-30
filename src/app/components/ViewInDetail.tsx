"use client";
import Image from 'next/image';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

export default function ViewInDetail({ image, title, description, price, category, show, setShow, closePopup }: any) {
    return (
        <>
            {show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-rgba ">
                    <div className="text-white text-2xl absolute top-10 right-10" onClick={() => setShow(false)}>
                        <IoMdClose />
                    </div>
                    <div className="bg-white p-8 rounded-md w-[70%] h-[50vh] sm:w-[50%] md:w-[70%]  lg:w-1/2 sm:h-[50vh] md:h-[50vh] lg:h-65vh  overflow-x-auto   ">
                        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-5 items-center justify-center ">
                            <div className="w-full sm:w-full md:w-1/3">
                                <Image src={image} height={200} width={200} alt="product-image" />
                            </div>
                            <div className="w-full sm:w-full md:w-2/3 capitalize text-center">
                                <div className="flex flex-col justify-between h-auto  ">
                                    <div className="mb-3">
                                        <h3 className="font-semibold text-lg mb-1">Title</h3>
                                        <h2 className="text-md">{title}</h2>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="font-semibold text-lg mb-1">Category</h2>
                                        <h3>{category}</h3>
                                    </div>
                                    <div className="mb-3">
                                        <h2 className="font-semibold text-lg mb-1">Description</h2>
                                            <p>{description}</p>
                                        
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg mb-1">Price</h2>
                                        <h3 className="text-red-500 text-lg">{price}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
