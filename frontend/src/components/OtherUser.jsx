import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSelectedUser, clearUnread } from '../redux/userSlice';

function OtherUser({user}) {
    const dispatch = useDispatch();
    const {selectedUser,onlineUsers ,unreadCounts = {}} = useSelector(store => store.user);
    const isOnline = user && onlineUsers?.includes(user._id);
    const unreadCount = unreadCounts?.[user._id] || 0;
    
    const selectedUserHandler = (user)=>{
        dispatch(setSelectedUser(user));
        dispatch(clearUnread(user._id));
    }

    return (
            <>
                <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black': ''} flex gap-2 items-center  text-white hover:text-zinc-900 hover:bg-zinc-200 rounded-sm p-2 cursor-pointer`}>
                    <div className={`avatar ${isOnline ?'online': '' }`}>
                        {/* <div className='w-12 rounded-full'>
                            <img 
                            src={user?.profilePhoto} 
                            alt='userProfile'/>
                           
                        </div> */}
                        <div className={`${isOnline ? 'bg-green-400':'bg-black'} border-blue-900 h-2 w-2`}></div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <div className='flex justify-between gap-2'>
                            <p>{user?.fullName}</p>
                            {unreadCount > 0 && (
                            <span className='bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                        </div>
                    </div>
                </div>
                <div className='divider my-0 py-0 h-1'></div>
            </>
    )
}

export default OtherUser
