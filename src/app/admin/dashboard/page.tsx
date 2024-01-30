"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from '../adminComponents/Sidebar';
import AdminHomePage from '../adminComponents/AdminHomePage';
import AdminProductList from '../adminComponents/AdminProductList';
import AdminAddPoduct from '../adminComponents/AdminAddPoduct';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/store/store';
import AppLayout from '@/app/components/layout/AppLayout';

export default function adminPage() {
  document.title = "Admin Dashboard"
  const [activeTab, setActiveTab] = useState<string>('home');
  const { admin } = useGlobalContext()

  const handleSwitch = (tab: string) => {
    setActiveTab(tab);
  };
  const router = useRouter()
  const { data: session, status } = useSession()


  // Render different components based on user status
  if (status === "unauthenticated" || !admin) {
    // If user is not authenticated or is not an admin, redirect to home page
    router.push('/');
    return null; // Return null to avoid rendering anything
  }



  return (
    <>
      <AppLayout>

        <div className='mx-auto max-w-screen-xl mt-10'>
          <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row justify-between items-center p-5'>
            <h2>Hi Admin, Akhtar</h2>
            <Sidebar handleSwitch={handleSwitch} activeTab={activeTab} />
          </div>

          <hr className='border-b-2 mt-5' />

          {activeTab === 'home' && (
            <div className='max-w-7xl m-auto '>
              <AdminHomePage />
            </div>
          )}

          {activeTab === 'addProduct' && (
            <div className='w-full flex justify-center mt-5'>
              <AdminAddPoduct />
            </div>
          )}

          {activeTab === 'productList' && (
            <div className='w-full m-auto mt-5'>
              <AdminProductList />
            </div>
          )}

          <hr className='border-b-2 mt-5' />
        </div>
      </AppLayout>
    </>
  );
}
