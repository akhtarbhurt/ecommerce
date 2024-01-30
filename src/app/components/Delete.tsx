"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
// import ToastContainerComponent from './ToastContainerComponents';
import { ProgressSpinner } from 'primereact/progressspinner';
import { toast } from 'react-toastify';


export default function Delete({ id, pageName }: any) {
    const [visible, setVisible] = useState<boolean>(false)
    const [loader, setLoader] = useState<boolean>(false);
    const handledDelete = async () => {
        try {
            setLoader(true); // Set loader to true before making the request
            const response = await axios.delete(`/api/auth/${pageName}/${id}`);
            
            if (response.status === 200) {
                toast.success("Product has been deleted", { theme: "colored" });
            }
        } catch (error) {
            // Handle error if needed
            console.error('Error deleting product:', error);
        } finally {
            setLoader(false); // Set loader back to false after the request is complete
            setVisible(false); // Close the confirmation dialog
        }
    };
    
    const reject = () => {
        setVisible(false)
    }

    const customFooter = (
        <div className="flex justify-end gap-5 mt-10">
            <button className=" border border-slate-300 bg-slate-200 p-2 rounded-md text-sm " onClick={reject}>
                No
            </button>
            <button className={` bg-red-500 rounded-md border p-2 hover:bg-red-400 text-white text-sm w-10 h-10 ${loader ? "bg-red-200" : "bg-red-500"} ` }onClick={handledDelete}>
                {loader ? <ProgressSpinner className={'p-2 w-5 h-5   '} strokeWidth='2'  /> : "Yes"}
            </button>
        </div>
    );
    
    const header = (
        <h2 className='text-md font-semibold mb-3' > Confirmation  </h2>
    )

    const message = (
        <p className='text-sm text-gray-400 mt-3 mb-3 mx-3  ' > Are you sure you want to Delete?  </p>
    )

    const icon = (
        <IoWarningOutline className="text-red-500" />
    )

    return (
        <>
            {/* <ToastContainerComponent/> */}
            <div className={` ${visible ? "w-full h-full flex justify-center items-center bg-black-rgba fixed top-0 right-0 z-20" : ""}  `} >
                <ConfirmDialog
                    className=' bg-white p-5 rounded-md '
                    visible={visible}
                    onHide={() =>
                    setVisible(false)}
                    message={message}
                    header={header}
                    icon={icon}
                    accept={handledDelete}
                    reject={reject}
                    footer={customFooter}
                />


            </div>
            <span className="  text-2xl text-red-500 text-center cursor-pointer" onClick={() => setVisible(true)} >
                <MdDelete />
            </span>
        </>
    )
}
