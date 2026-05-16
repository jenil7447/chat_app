import React, { useEffect } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import.meta.env.VITE_API_URL

function UseGetOtherUsers() {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUser = async()=>{
            try{
                axios.defaults.withCredentials  = true;
                const res =  await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/`);
                // console.log(res);
                //store
                dispatch(setOtherUsers(res.data));

            }catch(error){
                console.log(error);
            }
        }
        fetchOtherUser();
    },[])
}

export default UseGetOtherUsers
