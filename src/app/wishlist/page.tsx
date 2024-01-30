"use client";
import { useGlobalContext } from "@/app/store/store";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Delete from "../components/Delete";
import axios from "axios";
import { useSession } from "next-auth/react";
import ToastContainerComponent from "../components/ToastContainerComponents";
import { toast } from "react-toastify";

export default function AddToCart() {
    document.title = "Wish List"
    const { isWishList } = useGlobalContext();
    const session = useSession()
    const [cart, setCart] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: null
    })
    const addCart = async (index: number) => {
        const selectedProduct = isWishList && isWishList[index]

        setCart((prevCart) => ({
            title: selectedProduct.title,
            price: selectedProduct.price,
            description: selectedProduct.description,
            category: selectedProduct.category,
            image: selectedProduct.image
        }));

        const response = await axios.post(`/api/auth/cart`, {
            title: selectedProduct.title,
            price: selectedProduct.price,
            description: selectedProduct.description,
            category: selectedProduct.category,
            image: selectedProduct.image
        })

        if(response.status === 200){
            toast.success("cart has beed added", {theme : "colored"})
        }

    }

    return (
        <>
        <ToastContainerComponent/>
            {
                isWishList?.length > 0 && session.status === "authenticated" ? (
                    <div className="max-w-6xl m-auto mt-20 ">
                        <div className="">
                            {isWishList &&
                                isWishList.map((elem: any, index: number) => (
                                    <React.Fragment key={elem._id} >
                                        <div className="flex flex-col sm:flex-col md:flex-row gap-4 sm:gap-10 items-center pb-5 justify-around border-b-2 bg-white " key={elem._id}>
                                            <div className="w-[100%] sm:w-[100%] md:w-[40%] p-5  ">
                                                <div className=" flex flex-col sm:flex-col md:flex-row gap-4 sm:gap-4 md:gap-20 items-center">
                                                    <Image src={elem.image} height={100} width={100} alt="product-img" />
                                                    <h2>{elem.title}</h2>
                                                </div>
                                            </div>

                                            <div className="w-1/6 sm:w-1/5 md:w-[10%]  ">
                                                <div className="  mt-2 sm:mt-0 text-center ">
                                                    <h2 className="text-center" >{elem.price}$</h2>
                                                </div>
                                            </div>
                                            <div className="w-[100%] sm:w-[100%] md:w-[10%] text-center mt-2  sm:mt-0 flex justify-center  ">
                                                <button className="bg-red-500 text-white w-full rounded-md p-2 hover:bg-red-400" onClick={() => addCart(index)} > Add To Cart </button>
                                            </div>
                                            <div className="w-[100%] sm:w-[100%] md:w-[5%] text-center mt-2 sm:mt-0 flex justify-center  ">
                                                <Delete id={elem._id} pageName={'wishlist'} />
                                            </div>
                                        </div>

                                    </React.Fragment>
                                ))}
                        </div>

                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full h-[80vh] flex-col" >
                        <div className="text-9xl text-gray-400 " >
                            <Image src={'/images/cart.png'} height={300} width={300} alt="empty-logo" />
                        </div>
                        <h2 className="text-md mt-5 font-semibold " > No Wishlist has been added </h2>
                    </div>
                )

            }

        </>
    );
}


