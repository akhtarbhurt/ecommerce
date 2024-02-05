"use client";
import { useGlobalContext } from "@/app/store/store";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Delete from "../components/Delete";
import axios from "axios";
import { useSession } from "next-auth/react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "../components/layout/AppLayout";

export default function AddToCart() {
  document.title = "Cart"
  const { isCart, userInfos } = useGlobalContext();
  const [quantities, setQuantities] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const session = useSession();
 
  const increaseQuantity = (index: number) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) => (i === index ? quantity + 1 : quantity))
    );
  };

  const decreaseQuantity = (index: number) => {
    setQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) =>
        i === index ? (quantity > 1 ? quantity - 1 : 1) : quantity
      )
    );
  };

  const updateCart = () => {
    if (!isCart || !Array.isArray(isCart)) {
      console.error('Invalid or missing cart data.');
      return;
    }
  
    console.log('isCart type:', typeof isCart);
  
    const updatedTotal = isCart.reduce(
      (acc: any, elem: any, i: any) => acc + elem.price * (quantities[i] || 0),
      0
    );
  
    setTotal(updatedTotal);
  };
  
  

  useEffect(() => {
    // Check if isCart is available before initializing quantities
    if (isCart) {
      setQuantities((prevQuantities) =>
        Array(isCart.length).fill(1).map((_, i) => prevQuantities[i] || 1)
      );
    }
  }, [isCart]);

  useEffect(() => {
    // Update cart whenever quantities change
    updateCart();
  }, [quantities]);

  if(!isCart){
    return <div className="flex justify-center items-center h-[70vh] w-full text-2xl font-bold" > Please Login First  </div>
  }
  
  const CheckoutButton = async () => {
    try {
      if (isCart?.length > 5) {
        toast.error("You can't checkout with more than 5 products ");
        
        
        return;
      }

      // If userInfos is not available, show a toast error message
      
      if (!userInfos || Object.keys(userInfos).length === 0) {
        toast.error('User information is incomplete. Please visit your settings page.');
        return;
      }


      // Create an array of line items for each product in the cart
      const lineItems = isCart.map((item: any, index: number) => {
        const quantity = quantities[index];
        const unit_amount = item.price * 100;
        const name = item?.title ?? "Unknown Title";
        const images = item?.image ? [item.image] : ["No Image"];


        return {
          quantity,
          price_data: {
            currency: "USD",
            unit_amount,
            product_data: {
              name,
              images,
            },
          },
        };
      });


      // Make the API request with the lineItems
      const response = await axios.post('/api/auth/payments', {
        lineItems,
        final_price: total,  // Include the final_price in the request
        qty: quantities,     // Include the quantities in the request
      });

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error('Invalid response from server:', response.data);
      }

    } catch (error: any) {
      // Handle other unexpected errors
      console.error('An error occurred during checkout:', error);
      
    }
  };

  

  return (
    <>
      <AppLayout>
      {
        isCart?.length > 0 && session.status === "authenticated" ? (
          <div className="max-w-6xl m-auto mt-20 ">
            <div className="">
              {isCart &&
                isCart.map((elem: any, index: number) => (
                  <React.Fragment key={elem._id} >
                    <div className="flex flex-col sm:flex-col md:flex-row gap-4 sm:gap-10 items-center pb-5 justify-around border-b-2 bg-white " key={elem._id}>
                      <div className="w-[100%] sm:w-[100%] md:w-[40%] p-5  ">
                        <div className=" flex flex-col sm:flex-col md:flex-row gap-4 sm:gap-4 md:gap-20 items-center">
                          <Image src={elem.image} height={100} width={100} alt="product-img" />
                          <h2>{elem.title}</h2>
                        </div>
                      </div>

                      <div className="w-[100%] sm:[100%] md:w-[10%]  ">
                        <div className="flex justify-center gap-3  mt-2 sm:mt-0">
                          <button
                            className="text-lg rounded-sm bg-gray-300 p-1"
                            onClick={() => increaseQuantity(index)}
                          >
                            +
                          </button>
                          <input
                            type="text"
                            value={quantities[index]}

                            className="h-10 w-10 text-center"
                          />
                          <button
                            className="text-lg rounded-sm bg-gray-300 p-1"
                            onClick={() => decreaseQuantity(index)}
                          >
                            -
                          </button>
                        </div>
                      </div>
                      <div className="w-1/6 sm:w-1/5 md:w-[10%]  ">
                        <div className="  mt-2 sm:mt-0 text-center ">
                          <h2 className="text-center" >{(elem.price || 0) * quantities[index]}$</h2>
                        </div>
                      </div>
                      <div className="w-[100%] sm:w-[100%] md:w-[5%] text-center mt-2 sm:mt-0 flex justify-center  ">
                        <Delete id={elem._id} pageName={'cart'} />
                      </div>
                    </div>

                  </React.Fragment>
                ))}
            </div>
            <hr className="w-full h-1 bg-white mt-10" />
            <div className="flex flex-col sm:flex-col md:flex-row sm:gap-5 justify-between p-3 items-center mt-10 bg-white rounded-md shadow-md border  " >
              <button className="w-36 mb-10 sm:mb-10 md:mb-0 p-2 text-white rounded-md border-0 bg-red-500 hover:bg-red-400 " onClick={  CheckoutButton } > Checkout </button>
              <div className="flex gap-5 items-center " >
                <h2 className="text-2xl font-semibold" > Sub Total : </h2>
                <p className="   text-lg " > {total}$ </p>
              </div>

            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-[80vh] flex-col" >
            <div className="text-9xl text-gray-400 " >
              <Image src={'/images/cart.png'} height={300} width={300} alt="empty-logo" />
            </div>
            <h2 className="text-md mt-5 font-semibold " > No Cart has been added </h2>
          </div>
        )

      }
  </AppLayout>
    </>
  );
}
