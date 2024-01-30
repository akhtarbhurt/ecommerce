"use client"
import { useGlobalContext } from '@/app/store/store'
import React from 'react'

export default function AdminHomePage() {
    const { user, isProduct, order, } = useGlobalContext();
    console.log("user is ", user)
    // Filter orders with a valid final_price
    const validOrders = order?.filter((elem: any) => elem.final_price !== undefined);

    // Calculate total revenue
    const totalRevenue = validOrders?.reduce((sum: any, order: any) => {
        return sum + order.final_price;
    }, 0);



    return (
        <>
            <div className='flex  justify-around gap-5 flex-wrap mt-10 mb-10  ' >
                <div className='h-44 w-56 text-center bg-red-500 text-white flex rounded-lg justify-around p-4 flex-col items-center ' >
                    <h2 className='text-xl sm:text-xl md:text-xl lg:text-2xl ' > {user ? user.length : 0} </h2>
                    <h3 className='text-sm sm:text-xl md:text-xl lg:text-2xl ' >Total User  </h3>
                </div>
                <div className='h-44 w-56 text-center bg-red-500 text-white flex rounded-lg justify-around p-4 flex-col items-center ' >
                    <h2 className='text-xl sm:text-xl md:text-xl lg:text-2xl ' >  {isProduct ? isProduct.length : 0}  </h2>
                    <h3 className='text-sm sm:text-xl md:text-xl lg:text-2xl ' >Product List</h3>
                </div>
                <div className='h-44 w-56 text-center bg-red-500 text-white flex rounded-lg justify-around p-4 flex-col items-center ' >
                    <h3 className='text-sm sm:text-xl md:text-xl lg:text-2xl ' > {order ? order.length : 0} </h3>
                    <h2 className='text-xl sm:text-xl md:text-xl lg:text-2xl ' > Orders </h2>
                </div>
                <div className='h-44 w-56 text-center bg-red-500 text-white flex rounded-lg justify-around p-4 flex-col items-center ' >
                    <h3 className='text-sm sm:text-xl md:text-xl lg:text-2xl ' > {totalRevenue}$ </h3>
                    <h2 className='text-xl sm:text-xl md:text-xl lg:text-2xl ' > Revenue </h2>
                </div>

            </div>

            <div className='mt-10' >
                <div>
                    <h2 className='text-2xl font-bold ' > User List </h2>
                </div>
                <div className="flex flex-col overflow-hidden mt-5">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <div className="w-full overflow-x-auto">
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-white border-b shadow-lg">
                                            <tr>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> # </th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Name </th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Email </th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Role </th>
                                                <th className="text-sm font-medium text-gray-900 px-6 py-4 text-center"> Joined At </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user?.map((elem: any, index: any) => (
                                                <tr className="bg-white border-b" key={elem._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>

                                                    <td className="text-sm text-gray-900 font-light px-6 py-4  whitespace-nowrap break-all text-truncate w-36">
                                                        {elem.name}

                                                    </td>

                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{elem.email}</td>

                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{elem.isAdmin ? "Admin" : "User"}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{ new Date(elem.createdAt).toLocaleString() }</td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
