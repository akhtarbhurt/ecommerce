import { useGlobalContext } from '@/app/store/store';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { ImCross } from 'react-icons/im'
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import axios from 'axios';


export default function Search({ setOpenSearch }: any) {
  const { isProduct } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<[]>([]);
  const session = useSession()
  const [cart, setCart] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null
  });

  useEffect(() => {
    // Filter products based on the search query whenever it changes
    const filteredProducts = isProduct?.filter((product: any) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredProducts);
  }, [searchQuery, isProduct]);

  const addToCart = async (index: number) => {
    const selectedProduct: any = searchResults && searchResults[index];

    // Use the callback version of setCart to ensure the latest state
    setCart((prevCart) => ({
      title: selectedProduct?.title,
      price: selectedProduct?.price,
      description: selectedProduct?.description,
      category: selectedProduct?.category,
      image: selectedProduct?.image
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
            toast.error(response.data.error);
          } else {
            toast.success("Product Added To Cart!", { theme: "colored" });
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
  };

  const addToWishList = async (index: number) => {
    const selectedProduct: any = searchResults && searchResults[index];

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

  return (
    <>

      <div className='  min-h-screen w-full bg-black-rgba flex justify-center items-center'>
        <div className='absolute top-20 right-20 text-white text-2xl cursor-pointer ' onClick={() => setOpenSearch(false)} >
          <span> <ImCross />  </span>
        </div>
        <div className='bg-white h-[70vh] w-[100%] sm:w-[100%] md:w-[70%] mt-10 sm:mt-10 md:mt-0 rounded-md overflow-y-auto'>
          <div className='p-5 flex items-center'>
            <input
              className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
              type='text'
              placeholder='Search product here'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <span className='bg-red-500 p-3 text-white cursor-pointer' onClick={() => setSearchQuery('')}>
              <FaSearch />
            </span>
          </div>

          <div>

            {
              searchResults?.length > 0 ? (
                searchResults?.map((elem: any, index: number) => (
                  <div key={elem._id} className='flex justify-between p-5 items-center border h-36 mt-10'>
                    <div className='flex gap-5'>
                      <Image src={elem.image} height={50} width={50} alt='product search image' />
                      <div className='flex justify-center flex-col'>
                        <h2> {elem.title} </h2>
                        <h3> {elem.price} </h3>
                      </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <span className='cursor-pointer hover:bg-red-500 hover:text-white p-2 rounded-2xl'
                        onClick={() => addToCart(index)}
                      >
                        <FiShoppingCart />
                      </span>
                      <span className='cursor-pointer hover:bg-red-500 hover:text-white p-2 rounded-2xl'
                        onClick={() => addToWishList(index)}
                      >
                        <FaHeart />
                      </span>
                    </div>
                  </div>

                ))
              ) : (
                <div className='p-5 text-center text-gray-500'>
                  No products available with the name "{searchQuery}".
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
