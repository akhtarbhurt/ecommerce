"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [admin, setIsAdmin] = useState();
    const [isProduct, setIsProduct] = useState();
    const [isCart, setCart] = useState();
    const [user, setUser] = useState()
    const [filteredProducts, setFilteredProducts] = useState(null); // New state for filtered products
    const [userInfos, setUserInfos] = useState()
    const [isWishList, setIsWishList] = useState()
    const [order, setOrder] = useState()
    const [checkout, setCheckout] = useState()
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/auth/login', { cache: 'no-store' });
            setIsAdmin(response.data.isAdmin);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.get(`/api/auth/cart`, {cancelToken : cancelToken.token }).then(response => {
            setCart(response.data);
        }).catch((error)=>{
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                console.log(error)
            }
        })

        return ()=>{
            cancelToken.cancel();
        }


    }, [isCart]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.get('/api/auth/register', {cancelToken : cancelToken.token }).then(response => {
            setUser(response.data.find)
        }).catch((error)=>{
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                console.log(error)
            }
        })

        return ()=>{
            cancelToken.cancel();
        }
      
    }, [user])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.get(`/api/auth/product`, {cancelToken : cancelToken.token } ).then(response => {
            setIsProduct(response.data.result);
        }).catch((error)=>{
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                console.log(error)
            }
        })
    }, [isProduct]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.get('/api/auth/userinfos', {cancelToken : cancelToken.token }).then(response => {
            setUserInfos(response.data)
        }).catch((error)=>{
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                console.log(error)
            }
        })

        return ()=>{
            cancelToken.cancel();
        }
    }, [userInfos])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.get(`/api/auth/wishlist`, {cancelToken : cancelToken.token } ).then(response => {
            setIsWishList(response.data);
        }).catch((error)=>{
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                console.log(error)
            }
        })
        return ()=>{
            cancelToken.cancel();
        }
    }, [isWishList])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.get('/api/auth/payments', {cancelToken : cancelToken.token }).then(response => {
            setOrder(response.data.result)
        }).catch((error)=>{
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                console.log(error)
            }
        })

        return ()=>{
            cancelToken.cancel();
        }

    }, [order])

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.get('/api/auth/webhook', {cancelToken : cancelToken.token }).then(response => {
            setCheckout(response.data)
        }).catch((error)=>{
            if(axios.isCancel(error)){
                console.log("cancelled")
            }else{
                console.log(error)
            }
        })
    }, [])

    useEffect(() => {
        fetchData();

    }, [checkout]);





    return <AppContext.Provider value={{ admin, isProduct, isCart, setFilteredProducts, filteredProducts, userInfos, isWishList, user, order, checkout }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
