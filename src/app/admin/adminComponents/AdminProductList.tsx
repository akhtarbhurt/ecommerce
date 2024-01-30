import { useGlobalContext } from '@/app/store/store';
import Image from 'next/image';
import React, { FormEvent, useEffect, useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import ProductUpdatePopup from './admin-utils/ProductUpdatePopup';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { CiSearch } from "react-icons/ci";
import Delete from '@/app/components/Delete';


export default function AdminProductList() {
  const {  isProduct } = useGlobalContext();
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const [initialImage, setInitialImage] = useState<any | File>();
  const [search, setSearch] = useState<string>('');
  const [searchApi, setSearchApi] = useState<string[]>([])
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false)
  const [box, setBox] = useState<number | null>()
  const [visibleDialogs, setVisibleDialogs] = useState<Array<boolean>>(Array(isProduct?.length).fill(false));




  const handleEdit = (index: number) => {
    setSelectedProductIndex(index);
    setIsTrue(!isTrue);
    setVisible(true)

    // Pass the image data to ProductUpdatePopup
    const selectedProduct = isProduct[index];
    setInitialImage(selectedProduct.image);
  };
  const selectedBox = (index: number) => {
    setBox(index);

    // Set the visibility of the selected Dialog to true
    const newVisibleDialogs = [...visibleDialogs];
    newVisibleDialogs[index] = true;
    setVisibleDialogs(newVisibleDialogs);
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value)

    // Filter products based on the search term
    const filteredProducts = isProduct.filter((product: any) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchApi(filteredProducts);
  };

  const productsToDisplay = search ? searchApi : isProduct;

 
  return (
    <>
      <div className=' flex flex-col sm:flex-col md:flex-row justify-between p-5 items-center sm:mt-5 ' >
        <h1> Admin Product List </h1>
        <form onSubmit={(e) => e.preventDefault()} >
          <div className="flex">
            <input
              className="flex h-10 w-full rounded-md border border-gray-900 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border-r-0 rounded-r-none "
              type="text"
              placeholder="Search Product Here"
              onChange={handleSearch}
            ></input>
            <button className='border  p-1 border-gray-900 bg-white  text-black border-l-0 rounded-r-md ' type="submit" > <CiSearch />  </button>
          </div>

        </form>
      </div>
      <div className="flex flex-col overflow-hidden">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-white border-b">
                    <tr>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> # </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Image </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Title </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Price </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-center"> Description </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Category </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"> Actions </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsToDisplay &&
                      productsToDisplay.map((elem: any, index: any) => (
                        <tr className="bg-white border-b" key={elem._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <Image src={elem.image} height={100} width={100} alt="logo" />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4  whitespace-nowrap break-all text-truncate w-36">
                              {elem.title.slice(0,10)}....
                              
                          </td>

                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{elem.price}$</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                            <div style={{ maxHeight: '100px', overflow: 'hidden', position: 'relative' }}>
                              {elem.description.slice(0, 70)}....
                            </div>
                            {elem.description.length > 70 && (
                              <>
                                <Button
                                  label="Read More"
                                  className='bg-red-500 p-1 rounded-md text-white mt-2'
                                  icon="pi pi-external-link"
                                  onClick={() => selectedBox(index)}
                                />
                              </>
                            )}
                            {visibleDialogs[index] && (
                              <Dialog
                                header={elem.title}
                                visible={visibleDialogs[index]}
                                style={{ width: '50vw' }}
                                onHide={() => {
                                  const newVisibleDialogs = [...visibleDialogs];
                                  newVisibleDialogs[index] = false;
                                  setVisibleDialogs(newVisibleDialogs);
                                }}
                                className='bg-black-rgba text-center p-5 text-white'
                              >
                                <p className="mt-5">
                                  {elem.description}
                                </p>
                              </Dialog>
                            )}


                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{elem.category}</td>
                          <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-2 mt-2  items-center">
                            <span className="cursor-pointer" onClick={() => handleEdit(index)}>
                              <TiEdit />
                            </span>
                            
                            <Delete id={elem._id} pageName={'product'} />
                            
                          </td>
                          {isTrue && selectedProductIndex === index && (
                            <td>
                              <div>
                                <ProductUpdatePopup id={elem._id} setIsTrue={setIsTrue} elem={elem} initialImage={initialImage} />
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
