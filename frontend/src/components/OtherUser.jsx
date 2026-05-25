import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser, clearUnread } from '../redux/userSlice';

function OtherUser({ user }) {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers, unreadCounts = {} } = useSelector(store => store.user);
    const isOnline = user && onlineUsers?.includes(user._id);
    const unreadCount = unreadCounts?.[user._id] || 0;
    const isSelected = selectedUser?._id === user?._id;

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
        dispatch(clearUnread(user._id));
    }

    return (
        <div
            onClick={() => selectedUserHandler(user)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150
                ${isSelected ? 'bg-zinc-700' : 'hover:bg-zinc-800'}`}>

            {/* Avatar with online dot */}
            <div className='relative flex-shrink-0'>
                <img
                    src={user?.profilePhoto}
                    alt={user?.fullName}
                    className='w-11 h-11 rounded-full object-cover'
                />
                <span className={`absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-900
                    ${isOnline ? 'bg-green-500' : 'bg-zinc-500'}`}>
                </span>
            </div>

            {/* Name + status */}
            <div className='flex flex-col flex-1 min-w-0'>
                <p className={`text-sm font-medium truncate
                    ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                    {user?.fullName}
                </p>
                <p className={`text-xs ${isOnline ? 'text-green-400' : 'text-zinc-500'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                </p>
            </div>

            {/* Unread badge */}
            {unreadCount > 0 && (
                <span className='bg-green-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0'>
                    {unreadCount > 9 ? '9+' : unreadCount}
                </span>
            )}
        </div>
    )
}

export default OtherUser;





// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// import { setSelectedUser, clearUnread } from '../redux/userSlice';

// function OtherUser({user}) {
//     const dispatch = useDispatch();
//     const {selectedUser,onlineUsers ,unreadCounts = {}} = useSelector(store => store.user);
//     const isOnline = user && onlineUsers?.includes(user._id);
//     const unreadCount = unreadCounts?.[user._id] || 0;
    
//     const selectedUserHandler = (user)=>{
//         dispatch(setSelectedUser(user));
//         dispatch(clearUnread(user._id));
//     }

//     return (
//             <>
//                 <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black': ''} flex gap-2 items-center  text-white hover:text-zinc-900 hover:bg-zinc-200 rounded-sm p-2 cursor-pointer`}>
//                     <div className={`avatar ${isOnline ?'online': '' }`}>
//                         <div className='w-12 rounded-full'>
//                             <img 
//                             src={user?.profilePhoto} 
//                             alt='userProfile'/>
                           
//                         </div>
//                         <div className={`${isOnline ? 'bg-green-400':'bg-black'} border-blue-900 h-2 w-2`}></div>
//                     </div>
//                     <div className='flex flex-col flex-1'>
//                         <div className='flex justify-between gap-2'>
//                             <p>{user?.fullName}</p>
//                             {unreadCount > 0 && (
//                             <span className='bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
//                                 {unreadCount > 9 ? '9+' : unreadCount}
//                             </span>
//                         )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className='divider my-0 py-0 h-1'></div>
//             </>
//     )
// }

// export default OtherUser
