import AppLayout from './components/layout/AppLayout'
import HeroSection from './components/layout/HeroSection'
import Products from './components/layout/Products'

export const metadata = {
  title: "Home",
};

export default async function Home() {



  return (
    <>
      <AppLayout>
        <div  >
          <HeroSection />
        </div>

        <div className=' max-w-7xl m-auto mt-20 ' >
          <div>
            <h1 className='mb-10 text-3xl font-semibold bg-red-500 p-2 text-white rounded-lg inline  ' > Men's Clothing </h1>
          </div>
          <hr className=' w-full h-1 bg-gray-50 mb-5 mt-10 ' />
          <Products category={'men clothes'} />
        </div>

        <div className=' max-w-7xl m-auto mt-20 ' >
          <div>
            <h1 className='mb-10 text-3xl font-semibold bg-red-500 p-2 text-white rounded-lg inline ' > Women's Clothing </h1>
          </div>
          <hr className=' w-full h-1 bg-gray-50 mb-5 mt-10 ' />
          <Products category={'women clothes'} />
        </div>

        <div className=' max-w-7xl m-auto mt-20 ' >
          <div>
            <h1 className='mb-10 text-3xl font-semibold bg-red-500 p-2 text-white rounded-lg inline' > Jewellery </h1>
          </div>
          <hr className=' w-full h-1 bg-gray-50 mb-5 mt-10' />
          <Products category={'jewellery'} />
        </div>

        <div className=' max-w-7xl m-auto mt-20 ' >
          <div>
            <h1 className='mb-10 text-3xl font-semibold bg-red-500 p-2 text-white rounded-lg inline ' > Electronics </h1>
          </div>
          <hr className=' w-full h-1 bg-gray-50 mb-5 mt-10 ' />
          <Products category={'tech'} />
        </div>
      </AppLayout>

    </>
  )
}
