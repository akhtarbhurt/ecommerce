"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useSession } from 'next-auth/react';
import SignOutButton from './SignOutButton';
import { useGlobalContext } from '../store/store';
import { FaBars } from "react-icons/fa";
import Search from './layout/Search';





export default function Navbar() {
    const { admin, isWishList, isCart } = useGlobalContext();
    const [menu, setMenu] = useState<boolean>(false);
    const [isTrue, setIstrue] = useState<boolean>(true);
    const { data: session, status } = useSession()
    const [openSearch, setOpenSearch] = useState<boolean>(false)
    const [sticky, setSticky] = useState<boolean>(false)

    useEffect(() => {

        const handleScroll = () => {
            if (window.scrollY > 900) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        // Add the event listener
        window.addEventListener("scroll", handleScroll);

        // Remove the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); // Ensure that the effect runs only once during component mount


    const handleBox = () => {
        setIstrue(!isTrue)
    }
    const handledMenuBar = () => {
        setMenu(!menu)
    }

    return (

        <nav
            className={`flex justify-between sm:justify-between md:justify-around items-center sm:flex-col md:flex-col flex-col lg:flex-row lg:justify-around bg-white h-auto p-2 rounded-lg border ${sticky ? ' fixed  top-0 right-0 w-full m-auto rounded-lg z-30 shadow-2xl' : ''
                }`}

        >

            {/* //logo here */}

            <div className="logo">
                <Image src={'/logo.png'} height={120} width={120} alt='logo' />
            </div>

            {/* this is navbar list  */}

            <ul className={` ${menu ? " p-5 gap-5 flex-col sm:flex-col flex md:flex-col lg:flex absolute top-0 right-0 left-0 min-w-full   bg-red-200 text-center z-10 " : "gap-10  sm:hidden md:hidden hidden lg:flex text-2xl"} `} >
                <li  > <Link href={'/'} >Home</Link> </li>
                <li  > <Link href={'/shop'} >Shop</Link> </li>
                <li  > <Link href={'/about'} >About Us</Link> </li>
                <li  > <Link href={'/contact'} >Contact</Link> </li>
            </ul>

            {/* this is responsive bar menu  */}

            <div className=' block lg:hidden xl:hidden 2xl:hidden absolute right-9 text-2xl z-20 bg-red-500 p-2 text-white rounded-sm ' onClick={handledMenuBar} >
                <FaBars />
            </div>

            {/* and this is icons  */}

            <div className=" flex gap-4 relative ">
                <div className='hover:bg-red-300 cursor-pointer p-3 rounded-3xl hover:text-white text-lg ' onClick={() => setOpenSearch(true)} >
                    <FaSearch />
                </div>

                <div className='hover:bg-red-300 cursor-pointer p-3 rounded-3xl hover:text-white text-lg relative ' >
                    <span className='absolute -top-0 right-0 text-sm bg-red-400 p-1 rounded-lg h-5 w-5 flex justify-center items-center text-white ' >  {isWishList && status === 'authenticated' ? isWishList.length : 0} </span>
                    <Link href={'/wishlist'}  > <FaHeart /> </Link>
                </div>
                <div className='hover:bg-red-300 cursor-pointer p-3 rounded-3xl hover:text-white text-lg relative ' >
                    <span className='absolute -top-0 right-0 text-sm bg-red-400 p-1 rounded-lg h-5 w-5 flex justify-center items-center text-white ' >  {isCart && status === 'authenticated' ? isCart.length : 0} </span>
                    <Link href={'/cart'}  > <FiShoppingCart /> </Link>
                </div>

                <div
                    className='hover:bg-red-300 cursor-pointer p-2 flex items-center gap-2 rounded-3xl hover:text-white text-lg'
                    onClick={handleBox}
                >
                    <FaRegUser />
                    <span className=' hidden sm:hidden md:block text-sm md:text-sm  ' > Hi,  {session?.user?.name} </span>
                    {status === "unauthenticated" ? <span className='text-sm' > Login </span> : ""}
                </div>
                <div className={` p-5 w-full bg-blue-100 absolute top-8 left-5 rounded-sm text-lg z-50  ${isTrue ? "hidden" : "block"}  `} >
                    <ul>
                        {status === "authenticated" && admin === false ? (
                            <>
                                <li onClick={handleBox} > <Link href={'account'} > My Account </Link> </li>
                                <hr className='border-gray-500 w-full mt-2 ' />
                                <li onClick={handleBox} > <Link href={'order'} > My Orders </Link> </li>
                                <hr className='border-gray-500 w-full mt-2 ' />
                                <li onClick={handleBox} > <Link href={'setting'} > Setting </Link> </li>
                                <hr className='border-gray-500 w-full mt-2 ' />
                            </>
                        ) : (
                            ""
                        )
                        }

                        {
                            admin === true && status === "authenticated" && (
                                <>
                                    
                                    
                                    <li onClick={handleBox} > <Link href={'account'} > My Account </Link> </li>
                                    <hr className='border-gray-500 w-full mt-2 ' />
                                    <li onClick={handleBox} > <Link href={'order'} > My Orders </Link> </li>
                                    <hr className='border-gray-500 w-full mt-2 ' />
                                    <li onClick={handleBox} > <Link href={'setting'} > Setting </Link> </li>
                                    <hr className='border-gray-500 w-full mt-2 ' />
                                    <li className=' mt-2 font-semibold ' onClick={handleBox} >
                                        <Link href={'/admin/dashboard'} > Admin Dashboard </Link>
                                    </li>
                                    <hr className='border-gray-500 w-full mt-2 ' />
                                </>
                            )
                        }

                    </ul>

                    {/* to check whether user is login or not  */}

                    {
                        status === "authenticated" ? (
                            <SignOutButton handleBox={handleBox} />
                        ) : (
                            <>
                                <Link href={'/login'}>
                                    <button className='bg-red-600 text-white w-full mt-3 p-2 rounded-md ' onClick={handleBox} >Login</button>
                                </Link>
                                <p className='text-sm mt-2 text-gray-500 text-center ' onClick={handleBox} > No Account yet? <Link href={'/register'} className='text-black text-1xl border-b-2 border-gray-950' > Register Here </Link> </p>
                            </>
                        )
                    }

                </div>
            </div>
            <div className={` fixed top-0 left-0 right-0 w-full min-h-screen z-50  ${openSearch ? "block" : "hidden"}`} >
                <Search setOpenSearch={setOpenSearch} />
            </div>
        </nav>

    )
}
