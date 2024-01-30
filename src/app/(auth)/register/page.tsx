"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"
import Image from 'next/image';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

export default function Register() {
    document.title = "Register"
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [visible ,setVisible] = useState <boolean> (false)
    const [authState, setAuthState] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        isAdmin: false, // Initialize isAdmin to false
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<registerErrorType>({})

    const googleSignIn = () => {
        signIn('google', {
            callbackUrl: "/",
            redirect: true
        })
    }
    const submitForm = () => {
        setLoading(true);
        axios.post('/api/auth/register', authState)
            .then((res) => {
                setLoading(false);
                const response = res.data;
                if (response.status === 200) {
                    router.push(`/login?message=${response.message}`);
                    console.log("user signed up");
                } else if (response?.status === 400) {
                    setError(response?.errors);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log("something went wrong");
            });
    };


    return (
        <section className='max-w-7xl m-auto rounded-md bg-white shadow-lg p-2 mt-5 ' >
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
                    <div className="absolute inset-0 max-w-full max-h-full">
                        <Image src={'/images/login.png'} width={500} height={500} className='w-full h-full' alt={'pizza'} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="relative">
                        <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
                            <h3 className="text-4xl font-bold text-white">
                                Now you dont have to rely on shopkeepers for shopping
                            </h3>
                            <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Commercial License </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> Unlimited Exports </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> 120+ Clients </span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                                        <svg
                                            className="h-3.5 w-3.5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <span className="text-lg font-medium text-white"> 100% Genuine Products </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Register</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            have an account?{' '}
                            <Link
                                href="/login"
                                title=""
                                className="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                        <form action="#" method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Enter Your Name"
                                            onChange={(e) => setAuthState({ ...authState, name: e.target.value })}
                                        ></input>
                                        <span className='text-red-500 font-bold' > {error?.name}  </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => setAuthState({ ...authState, email: e.target.value })}
                                        ></input>
                                        <span className='text-red-500 font-bold' > {error?.email}  </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>

                                    </div>
                                    <div className="mt-2 relative ">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            onChange={(e) => setAuthState({ ...authState, password: e.target.value })}
                                        ></input>
                                        <div className='absolute top-3 right-3 cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                                            <span> {showPassword ? <FaEye /> : <FaEyeSlash />} </span>
                                        </div>
                                        <span className='text-red-500 font-bold' > {error?.password}  </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Re-Password{' '}
                                        </label>

                                    </div>
                                    <div className="mt-2 relative ">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={ visible ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            onChange={(e) => setAuthState({ ...authState, password_confirmation: e.target.value })}
                                        ></input>
                                         <div className='absolute top-3 right-3 cursor-pointer ' onClick={() => setVisible(!visible)}>
                                            <span> { visible ? <FaEye /> : <FaEyeSlash />} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex gap-5 items-center '>
                                    <div className="flex items-center justify-between">
                                        <input
                                            className="h-4 w-4 mt-2"
                                            type="checkbox"
                                            checked={authState.isAdmin} // Bind the checked attribute to authState.isAdmin
                                            onChange={(e) => setAuthState({ ...authState, isAdmin: e.target.checked })}
                                        ></input>
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            Login as an admin?
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        className={`inline-flex w-full items-center justify-center rounded-md bg-red-500 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-red-400  ${loading ? "bg-gray" : "bg-black"} `}
                                        onClick={submitForm}
                                    >
                                        {loading ? "Processing..." : "Register"}
                                    </button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
