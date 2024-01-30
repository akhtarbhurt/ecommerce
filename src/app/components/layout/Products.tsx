"use client";
import { useGlobalContext } from "@/app/store/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Chip } from 'primereact/chip';
import { toast } from "react-toastify";
import Skeleton from '@mui/material/Skeleton';
import ViewInDetail from "../ViewInDetail";
import { useSession } from "next-auth/react";


export default function Products({ category }: any) {
    const { isProduct } = useGlobalContext();
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const session = useSession();

    const [cart, setCart] = useState<Product>({
        title: "",
        price: "",
        description: "",
        category: "",
        image: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulating API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setLoading(true)
            } finally {
                setLoading(false); // Set loading to false after the delay
            }
        };

        fetchData();
    }, []);

    const filter = isProduct && isProduct.filter((elem: any) => elem.category === category);

    const addToCart = async (index: number) => {
        const selectedProduct = filter && filter[index];

        // Use the callback version of setCart to ensure the latest state
        setCart((prevCart) => ({
            title: selectedProduct.title,
            price: selectedProduct.price,
            description: selectedProduct.description,
            category: selectedProduct.category,
            image: selectedProduct.image
        }));

        // Use the updated cart directly for the API call
        if (session.status === "authenticated") {
            try {
                const response = await axios.post('/api/auth/cart', {
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    description: selectedProduct.description,
                    category: selectedProduct.category,
                    image: selectedProduct.image
                });

                if (response.status === 200) {
                    // Update the local state with the new cart data
                    setCart(response.data);

                    // Check if the response indicates that the product is already in the cart
                    if (response.data.error) {
                        toast.error(response.data.error, {
                            toastId: 1
                        });
                    } else {
                        toast.success("Product Added To Cart!", { theme: "colored", toastId : 2 });
                    }
                }
            } catch (error: any) {
                // Handle other unexpected errors
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error,{
                        toastId: 3
                    });
                } else {
                    console.error("Unexpected error:", error);
                    toast.error("An unexpected error occurred. Please try again later.",{
                        toastId: 4
                    });
                }
            }
        } else if (session.status === "unauthenticated") {
            toast.error("Please login first");
        }
    };

    const addToWishList = async (index: number) => {
        const selectedProduct = filter && filter[index];

        // Use the callback version of setCart to ensure the latest state
        setCart((prevCart) => ({
            title: selectedProduct.title,
            price: selectedProduct.price,
            description: selectedProduct.description,
            category: selectedProduct.category,
            image: selectedProduct.image
        }));

        // Use the updated cart directly for the API call
        if (session.status === "authenticated") {
            try {
                const response = await axios.post('/api/auth/wishlist', {
                    title: selectedProduct.title,
                    price: selectedProduct.price,
                    description: selectedProduct.description,
                    category: selectedProduct.category,
                    image: selectedProduct.image
                });

                if (response.status === 200) {
                    // Update the local state with the new cart data
                    setCart(response.data);

                    // Check if the response indicates that the product is already in the cart
                    if (response.data.error) {
                        toast.error(response.data.error);
                    } else {
                        toast.success("Product Added To WishList!", { theme: "colored" });
                    }
                }
            } catch (error: any) {
                // Handle other unexpected errors
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                } else {
                    console.error("Unexpected error:", error);
                    toast.error("An unexpected error occurred. Please try again later.");
                }
            }
        } else if (session.status === "unauthenticated") {
            toast.error("Please login first");
        }
    }


    const handleView = (index: number) => {
        const selectedProduct = filter && filter[index];

        // Use the callback version of setCart to ensure the latest state
        setCart((prevCart) => ({
            title: selectedProduct.title,
            price: selectedProduct.price,
            description: selectedProduct.description,
            category: selectedProduct.category,
            image: selectedProduct.image
        }));
        setShow(true)
    };


    const closePopup = () => {
        setShow(false)
    }
    return (
        <>
            {loading && (
                <div className="flex flex-wrap justify-center  "  >
                    {[...Array(4).keys()].map((index) => (
                        <div key={index} className="m-4 p-4 bg-gray-200 rounded-lg shadow-lg w-64 cursor-pointer text-center border relative overflow-hidden">
                            <Skeleton width="100%" height="300px" animation="wave" className="mb-2" style={{ backgroundColor: '#f0f0f0' }}></Skeleton>
                            <Skeleton width="100%" height="3rem" animation="wave" className="mb-2" style={{ backgroundColor: '#f0f0f0' }}></Skeleton>
                            <Skeleton width="100%" height="2rem" animation="wave" className="mb-2" style={{ backgroundColor: '#f0f0f0' }}></Skeleton>
                            <Skeleton width="100%" height="1.5rem" animation="wave" className="mb-2" style={{ backgroundColor: '#f0f0f0' }}></Skeleton>
                        </div>

                    ))}
                </div>
            )}
            <div className="flex flex-wrap justify-center min-h-full ">

                {!loading && (filter &&
                    filter.map((elem: any, index: number) => (
                        <div
                            key={index} 
                            className="m-4 p-4 bg-white rounded-lg shadow-lg w-64 cursor-pointer text-center border relative  "
                        >
                            <Chip label={elem.category} className="absolute right-0 top-0 bg-red-500 p-1 text-white  capitalize rounded-sm text-sm " />

                            <div className="mb-4 h-48 overflow-hidden border p-2 ">
                                <Image
                                    src={elem.image}
                                    height={200}
                                    width={200}
                                    alt="product-image"
                                    className="rounded-md "
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{elem.title}</h2>
                                <p className="text-gray-700 mb-2  whitespace-pre-wrap break-all">
                                    {elem.description.slice(0, 100)}...
                                </p>
                                <p className="text-blue-500 font-bold mb-2 "> Price: {elem.price}$</p>
                            </div>
                            <div className="flex gap-5 justify-center items-end mt-5">
                                <Tooltip anchorSelect=".cart-tooltip" place="top">
                                    Add to Cart
                                </Tooltip>
                                <span className="text-2xl hover:bg-red-300 hover:text-white p-2 rounded-3xl cart-tooltip"
                                    onClick={() => addToCart(index)}
                                >
                                    <CiShoppingCart />
                                </span>

                                <Tooltip anchorSelect=".heart-tooltip" place="top">
                                    Add to Favorites
                                </Tooltip>
                                <span className="text-2xl hover:bg-red-300 hover:text-white p-2 rounded-3xl heart-tooltip" onClick={() => addToWishList(index)} >
                                    <FaHeart />
                                </span>

                                <Tooltip anchorSelect=".eye-tooltip" place="top">
                                    View Details
                                </Tooltip>
                                <span className="text-2xl hover:bg-red-300 hover:text-white p-2 rounded-3xl eye-tooltip"
                                    onClick={() => handleView(index)}
                                >
                                    <FaEye />

                                </span>
                                <div className={` ${show ? "block" : "hidden"}`}>
                                    <div className="flex items-center justify-center min-h-screen">
                                        <ViewInDetail
                                            image={cart.image}
                                            show={show}
                                            setShow={closePopup}
                                            title={cart.title}
                                            description={cart.description}
                                            price={cart.price}
                                            category={cart.category}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    ))}
            </div>
        </>
    );
}
