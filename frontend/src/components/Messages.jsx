import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
function Messages() {
    useGetMessages();
    const { messages}= useSelector(store=>store.message);
    const messageList = Array.isArray(messages) ? messages : [];
    // if(!messages) return;
    return (

        <div className='px-4 flex-1 overflow-auto'>
        {messageList.length === 0 ? (
            <div className='flex items-center justify-center h-full text-gray-400'>
                No messages yet. Say Hi! 👋
            </div>
        ) : (
            messageList.map((message) => (
                <Message key={message?._id} message={message} />
            ))
        )}
    </div>
        // <div className='px-4 flex-1 overflow-auto'>
        //     {
        //        messages && messages?.map((message) => {
        //             return (
        //                 <Message key={message?._id || Math.random()} message={message} />
        //             )
        //         })
        //     }

        // </div>

    )
}
export default Messages
