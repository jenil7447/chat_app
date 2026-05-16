import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser,setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import.meta.env.VITE_API_URL

function Sidebar() {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Filter locally — never touch Redux
    const filteredUsers = otherUsers?.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
    ) || [];

    const logoutHandler = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`);
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        dispatch(setSelectedUser(null));
        dispatch(setMessages(null));
        navigate('/login');
        toast.success(res.data.message);
    } catch (error) {
        console.log(error);
    }
}

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <div className='flex items-center gap-2'>
                <FaSearch className='text-gray-400' />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md'
                    type='text'
                    placeholder='Search...'
                />
            </div>
            <div className="divider px-3"></div>
            <OtherUsers filteredUsers={filteredUsers} />
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar;







// import React, { useState } from 'react'
// import { FaSearch } from "react-icons/fa";
// import OtherUsers from './OtherUsers';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import {useNavigate} from 'react-router-dom';
// import { useSelector ,useDispatch} from 'react-redux';
// import { setAuthUser, setOtherUsers } from '../redux/userSlice';

// function Sidebar() {
//     const[search,setSearch] = useState("");
//     const {otherUsers} = useSelector(store=>store.user);
//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     const logoutHandler = async() =>{
//         try{
//             const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
//             navigate('/login')
//             toast.success(res.data.message);
//             dispatch(setAuthUser(null));
//         }catch (error){
//             console.log(error);
//         }
//     }
//     const searchSubmitHandler = (e)=>{
//         e.preventDefault();
//         const conversationUser = otherUsers?.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()));
//         if(conversationUser){
//             dispatch(setOtherUsers([conversationUser]));
//         }else{
//             toast.error("User not found");
//         }
//     }

//     return (
//         <div className='border-r border-slate-500 p-4 flex flex-col'>
//             <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
//                 <input 
//                 value={search}
//                 onChange={(e)=>setSearch(e.target.value)}
//                 className='input input-bordered rounded-md'
//                 type='text' 
//                 placeholder='Search...' />
//                 <button type='submit' className='btn btn-circle bg-zinc-500'>
//                     <FaSearch />
//                 </button>
//             </form>
//             <div className="divider px-3"></div>
//             <OtherUsers/>
//             <div className='mt-2'>
//                 <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
//             </div>
            
//         </div>
//     )
// }

// export default Sidebar
