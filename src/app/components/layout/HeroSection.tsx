import React from 'react'
import img1 from "./images/img1.png"
import Image from 'next/image'
import Link from 'next/link'
import { Carousel } from 'primereact/carousel';
        
export default function HeroSection() {
  return (
    <>
      <section className=' max-w-7xl m-auto mt-10 mb-10 rounded-lg  shadow-lg ' >
        <div className=' p-10 bg-white flex flex-col sm:flex-col md:flex-row justify-evenly items-center mt-10 mb-10   '>
          {/* text  */}
          <div className='text-center' >
            <h3 className=' text-2xl sm:text-2xl md:text-4xl  capitalize line-clamp-5   ' > Life is more than sunglasses <br /> and hit movies. </h3>
            <button className='mt-5 p-3 bg-red-500 text-white rounded-md mb-4 sm:mb-4 md:mb-2 sm:text-center ' > <Link href={'/shop'} >Shop Now</Link>  </button>
          </div>
          {/* image  */}
          <div className=' mt-5 sm:mt-5 md:mt-0 text-center ' >
            <Image src={'/images/img1.png'} height={300} width={200} alt='hero-section' />
          </div>
        </div>
      </section>

      
    </>
  )
}

