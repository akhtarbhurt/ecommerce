"use client"
import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from '@/app/store/store';
import Search from './Search';

export default function ProductSideba() {
    const { isProduct, setFilteredProducts } = useGlobalContext();
   
    const prices = isProduct?.map((elem: any) => elem.price) || [];
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const [value, setValue] = useState([minPrice, maxPrice]);
    const [selectedCategory, setSelectedCategory] = useState(null);
   
    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);

        // Update filtered products based on the selected price range
        const filteredProducts = isProduct?.filter(
            (elem: any) =>
                elem.price >= newValue[0] &&
                elem.price <= newValue[1] &&
                (selectedCategory ? elem.category === selectedCategory : true)
        );
        setFilteredProducts(filteredProducts);
    };

    const handleCategoryClick = (category: any) => {

        // Handle category click and update the selected category state
        setSelectedCategory(category);
        // If "All" is clicked, set the selected category to null to display all categories
        if (category === 'all') {
            setSelectedCategory(null);
        }
    };

    useEffect(() => {
        // Update filtered products based on the selected category
        const filteredProductsByCategory = isProduct?.filter(
            (elem: any) => (selectedCategory ? elem.category === selectedCategory : true)
        );
        setFilteredProducts(filteredProductsByCategory);
    }, [selectedCategory]);




    return (
        <>
            <div className='flex flex-col justify-around h-auto capitalize bg-white rounded-md shadow-xl'>
                <div className='p-5 flex items-center'>
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="search product here"
                        
                    />
                    <span className=' bg-red-500 p-3 text-white cursor-pointer'> <FaSearch /> </span>
                </div>
              
                <div>
                    <h2 className='font-semibold text-lg mb-5 mt-5 mx-5 border-b-2 pb-2 ' > Category </h2>

                </div>

                <ul className='flex gap-10 flex-col justify-around text-center items-center'>
                    <li className={`border p-2 w-36 hover:bg-red-500 hover:text-white rounded-md cursor-pointer ${selectedCategory === 'all' ? "bg-red-500 text-white" : ""}`}
                        onClick={() => handleCategoryClick('all')}
                    > All </li>
                    <li className={`border p-2 w-36 hover:bg-red-500 hover:text-white rounded-md cursor-pointer ${selectedCategory === 'men clothes' ? "bg-red-500 text-white" : ""}`}
                        onClick={() => handleCategoryClick('men clothes')}
                    > men clothes </li>
                    <li className={`border p-2 w-36 hover:bg-red-500 hover:text-white rounded-md cursor-pointer ${selectedCategory === 'women clothes' ? "bg-red-500 text-white" : ""}`}
                        onClick={() => handleCategoryClick('women clothes')}
                    > women clothes </li>
                    <li className={`border p-2 w-36 hover:bg-red-500 hover:text-white rounded-md cursor-pointer ${selectedCategory === 'jewellery' ? "bg-red-500 text-white" : ""}`}
                        onClick={() => handleCategoryClick('jewellery')}
                    > jewellery </li>
                    <li className={`border p-2 w-36 hover:bg-red-500 hover:text-white rounded-md cursor-pointer ${selectedCategory === 'tech' ? "bg-red-500 text-white" : ""}`}
                        onClick={() => handleCategoryClick('tech')}
                    > tech </li>
                </ul>
                <div>
                    <h2 className='font-semibold text-lg mb-5 mt-5 mx-5 border-b-2 pb-2 ' > Price Filter </h2>

                </div>
                <div className="price p-5">
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        disableSwap
                        min={minPrice}
                        max={maxPrice}
                    />
                </div>
            </div>
        </>
    );
}
