import React, { useEffect, useState } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

function MessageContainer() {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();
    const isOnline = selectedUser && onlineUsers?.includes(selectedUser._id);
    const [isTyping, setIsTyping] = useState(false); // ✅

    useEffect(() => {
        if(!socket || !selectedUser) return;

        // ✅ Only show typing if it's from the selected user
        socket.on('typing', (senderId) => {
            if(senderId === selectedUser._id) {
                setIsTyping(true);
            }
        });

        socket.on('stopTyping', (senderId) => {
            if(senderId === selectedUser._id) {
                setIsTyping(false);
            }
        });

        return () => {
            socket.off('typing');
            socket.off('stopTyping');
        };
    }, [socket, selectedUser]);

    // ✅ Reset typing when switching users
    useEffect(() => {
        setIsTyping(false);
    }, [selectedUser]);

    return (
        <>
            {selectedUser !== null ? (
                <div className='md:min-w-[550px] flex flex-col h-full'>
                    {/* Header */}
                    <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                        <div className={`avatar ${isOnline ? 'online' : ''}`}>
                            <div className='w-12 rounded-full'>
                                <img src={selectedUser?.profilePhoto} alt='userProfile' />
                            </div>
                        </div>
                        <div className='flex flex-col flex-1'>
                            <p>{selectedUser?.fullName}</p>
                            {/* ✅ Typing indicator */}
                            {isTyping && (
                                <p className='text-xs text-green-400 animate-pulse'>
                                    typing...
                                </p>
                            )}
                        </div>
                    </div>
                    <Messages />
                    <SendInput />
                </div>
            ) : (
                <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
                    <h1 className='text-4xl text-white font-bold'>Hi, {authUser?.fullName}</h1>
                    <h1 className='text-2xl text-white'>Let's start conversation</h1>
                </div>
            )}
        </>
    )
}

export default MessageContainer;






















// import React, { useEffect } from 'react';
// import SendInput from './SendInput';
// import Messages from './Messages';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedUser } from '../redux/userSlice';

// function MessageContainer() {
//     const { selectedUser , authUser,onlineUsers} = useSelector(store => store.user);
//     const dispath = useDispatch();
//     const isOnline = selectedUser && onlineUsers?.includes(selectedUser._id);
//     // useEffect(() => {
//     //     return () => dispath(setSelectedUser(null));
//     // }, [])

//     return (
//         <>
//             {
//                 selectedUser !== null ? (
//                     <div className='md:min-w-[550px] flex flex-col h-full'>
//                         <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
//                             <div className={`avatar ${isOnline ? 'online':''}`}>
//                                 <div className='w-12 rounded-full'>
//                                     <img src={selectedUser?.profilePhoto} alt='userProfile' />
//                                 </div>
//                             </div>
//                             <div className='flex flex-col flex-1'>
//                                 <div className='flex justify-between gap-2'>
//                                     <p>{selectedUser?.fullName}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <Messages />
//                         <SendInput />
//                     </div>
//                 ) : (
//                     <div className='md:min-w-[550px] flex flex-col justify-center items-center'> 
//                         <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName}</h1>
//                         <h1 className='text-2xl text-white'>Let's start conversation</h1>
//                     </div>
//                 )
//             }
//         </>

//     )
// }

// export default MessageContainer
