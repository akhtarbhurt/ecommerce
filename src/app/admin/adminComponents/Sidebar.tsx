"use client"
import React from 'react';

interface SidebarProps {
  handleSwitch: (tab: string) => void;
  activeTab: string;
}

export default function Sidebar({ handleSwitch, activeTab }: SidebarProps) {
  return (
    <div>
      <ul className='flex gap-6 h-auto text-sm mt-4'>
        <li
          className={`hover:bg-red-500 hover:text-white cursor-pointer p-2 sm:p-2 md:p-4 rounded-md border ${
            activeTab === 'home' ? 'bg-red-500 text-white' : ' bg-white'
          }`}
          onClick={() => handleSwitch('home')}>
          Home
        </li>
        <li
          className={`hover:bg-red-300  hover:text-white cursor-pointer p-2 sm:p-2 md:p-4 rounded-md border ${
            activeTab === 'addProduct' ? 'bg-red-500 text-white' : 'bg-white'
          }`}
          onClick={() => handleSwitch('addProduct')}>
          Add Product
        </li>
        <li
          className={`hover:bg-red-300  hover:text-white cursor-pointer p-2 sm:p-2 md:p-4 rounded-md border ${
            activeTab === 'productList' ? 'bg-red-500 text-white' : 'bg-white'
          }`}
          onClick={() => handleSwitch('productList')}>
          Product List
        </li>
      </ul>
    </div>
  );
}
