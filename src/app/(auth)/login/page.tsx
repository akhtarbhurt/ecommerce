"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from "react"
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

export default function Login() {
  document.title = "Login"
  const params = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<LoginErrorType>()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [authState, setAuthState] = useState({
    email: "",
    password: ""
  });

  const submitForm = () => {

    axios.post('/api/auth/login', authState)
      .then((res) => {
        setLoading(false)
        const respone = res.data
        if (respone.status === 200) {
          signIn('credentials', {
            email: authState.email,
            password: authState.password,
            callbackUrl: '/',
            redirect: true
          })
        } else if (respone?.status === 400) {
          setError(respone?.errors)
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log("something went wrong")
      })
  }
  //to sign in with github

  const githubSignIn = () => {
    signIn('github', {
      callbackUrl: "/",
      redirect: true
    })
  }
  const googleSignIn = () => {
    signIn('google', {
      callbackUrl: "/",
      redirect: true
    })
  }
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
                We Offer the Best Products
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
                  <span className="text-lg font-medium text-white"> 100% Quality  </span>
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
                  <span className="text-lg font-medium text-white"> Free Home Delivery  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            {params.get("message") ? <p className='bg-green-400 font-bold rounded-md p-4' >{params.get("message")}</p> : <></>}
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
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
                    <Link
                      href="/forgot-password"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {' '}
                      Forgot password?{' '}
                    </Link>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Password"
                      onChange={(e) => setAuthState({ ...authState, password: e.target.value })}
                    />

                    <div className='absolute top-3 right-3 cursor-pointer ' onClick={() => setShowPassword(!showPassword)}>
                      <span> {showPassword ? <FaEye /> : <FaEyeSlash />} </span>
                    </div>

                    <span className='text-red-500 font-bold' > {error?.password}  </span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`inline-flex w-full items-center justify-center rounded-md bg-red-500 hover:bg-red-400 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 ${loading ? "bg-gray-500" : "bg-black"} `}
                    onClick={submitForm}
                  >
                    {loading ? "processing " : "login"}
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
