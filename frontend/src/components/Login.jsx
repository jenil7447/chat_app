import React, { useState } from 'react';
import {Link , useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

function Login() {
    const [user,setUser] = useState({username:"",password:""})
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
        navigate("/");
        console.log(res);
        dispatch(setAuthUser(res.data));
    
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    }
    return (
        <div className='min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border'>
                <h1 className='text-3xl text-black font-bold text-center'>LogIn</h1>
                <form onSubmit={onSubmitHandler} action=''>
                    
                    <div>
                        <label className='label p-2'>
                            <span className='text-black label-text'>UserName</span>
                        </label> 
                        <input
                        value={user.username}
                        onChange={(e) => setUser({...user,username:e.target.value})}
                        className='w-full input input-bordered h-10 bg-white text-black'
                        type='text' 
                        placeholder='UserName'/>
                    </div>
                    <div>
                        <label className='label p-2'>
                            <span className='text-black label-text'>Password</span>
                        </label> 
                        <input
                        value={user.password}
                        onChange={(e)=>setUser({...user,password:e.target.value})}
                        className='w-full input input-bordered h-10 bg-white text-black'
                        type='password' 
                        placeholder='Password'/>
                    </div>
                    <div className='w-full mx-auto flex items-center text-center my-3'>
                        <p className='text-center text-black'>Don't Have a account ?  <Link  to="/signup">SignUp</Link></p>
                    </div>
                    
                    <div>
                        <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700 bg-white text-black my-2'>LogIn</button>
                    </div>

                </form>
            </div>
        
        </div>
    )
}

export default Login
