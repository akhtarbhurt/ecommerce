"use client"
import React, { useEffect, useState } from 'react';
import ProductSideba from '../components/layout/ProductSideba';
import { useGlobalContext } from '../store/store';
import Image from 'next/image';
import { CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { Chip } from 'primereact/chip';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import ToastContainerComponent from '../components/ToastContainerComponents';
import ViewInDetail from '../components/ViewInDetail';

export default function Page() {
  document.title = "Shop"
  const { isProduct, filteredProducts } = useGlobalContext();
  const productsToDisplay = filteredProducts || isProduct;
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const session = useSession()
  const [cart, setCart] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null
  });

  useEffect(() => {
    // Simulate data fetching delay
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchData();
  }, []);

  const addToCart = async (index: number) => {
    const selectedProduct = productsToDisplay && productsToDisplay[index];

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
    const selectedProduct = productsToDisplay && productsToDisplay[index];

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
    const selectedProduct = productsToDisplay && productsToDisplay[index];

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
      <ToastContainerComponent />

      <div className='flex flex-col sm:flex-col md:flex-col lg:flex-row max-w-7xl mx-auto mt-10'>
        <div className='w-full sm:w-full md:w-[50%] sm:m-auto md:m-auto lg:m-0 lg:w-[25%] p-5'>
          <ProductSideba />
        </div>
        <div className='flex flex-wrap w-full sm:w-full md:w-full lg:w-[75%] bg-white justify-center shad rounded-md relative'>
          {loading && (
            <div className=" flex flex-col gap-5 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ProgressSpinner />
              Loading...
            </div>
          )}
          {!loading && productsToDisplay && productsToDisplay.map((elem: any, index: number) => (
            <div key={elem._id}>
              <div
                key={elem.id}
                className="m-4 p-4 bg-white rounded-lg  w-64 cursor-pointer text-center border relative"
              >
                <Chip label={elem.category} className="absolute right-0 top-0 bg-red-500 p-1 text-white  capitalize rounded-sm text-sm" />

                <div className="mb-4 h-48 overflow-hidden border p-2">
                  <Image
                    src={elem.image}
                    height={200}
                    width={200}
                    alt="product-image"
                    className="rounded-md"
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
                  <span className="text-2xl hover:bg-red-300 hover:text-white p-2 rounded-3xl heart-tooltip"
                    onClick={() => addToWishList(index)}
                  >
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
