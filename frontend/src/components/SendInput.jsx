import React, { useState, useRef, useEffect } from 'react'
import { IoSend } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs"; // ✅
import EmojiPicker from 'emoji-picker-react';   // ✅
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

function SendInput() {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // ✅
    const emojiPickerRef = useRef(null); // ✅ for outside click detection
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);
    const { socket } = useSelector(store => store.socket);
    const typingTimeoutRef = useRef(null);

    // ✅ Close emoji picker when clicking outside
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
                setShowEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    // ✅ On emoji click, append to message
    const onEmojiClick = (emojiData) => {
        setMessage(prev => prev + emojiData.emoji);
    };

    const handleTyping = (e) => {
        setMessage(e.target.value);
        if(!socket || !selectedUser?._id) return;
        socket.emit('typing', selectedUser._id);
        if(typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stopTyping', selectedUser._id);
        }, 1000);
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        if(!selectedUser?._id || !message.trim()) return;
        socket?.emit('stopTyping', selectedUser._id);
        if(typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/message/send/${selectedUser._id}`,
                { message },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            dispatch(setMessages([...(Array.isArray(messages) ? messages : []), res?.data?.newMessage]));
        } catch(error) {
            console.log(error);
        }
        setMessage("");
        setShowEmojiPicker(false); // ✅ close picker on send
    }

    return (
        <div className='px-4 my-3 relative'>
            {/* ✅ Emoji Picker — appears above input */}
            {showEmojiPicker && (
                <div ref={emojiPickerRef} className='absolute bottom-14 left-4 z-50'>
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        theme="dark"
                        height={350}
                        width={300}
                    />
                </div>
            )}

            <form onSubmit={onSubmitHandler}>
                <div className='w-full relative flex items-center'>
                    {/* ✅ Emoji button */}
                    <button
                        type='button'
                        onClick={() => setShowEmojiPicker(prev => !prev)}
                        className='absolute left-3 text-zinc-400 hover:text-white text-xl z-10'>
                        <BsEmojiSmile />
                    </button>

                    <input
                        value={message}
                        onChange={handleTyping}
                        type='text'
                        placeholder='Send a message ...'
                        className='border text-sm rounded-lg block w-full py-3 pl-10 pr-10 border-zinc-400 bg-gray-600 text-white'
                    />

                    <button
                        type='submit'
                        disabled={!message.trim()}
                        className='absolute right-3 text-white disabled:opacity-40'>
                        <IoSend />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SendInput;




// import React, { useState } from 'react'
// import { IoSend } from "react-icons/io5";
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMessages } from '../redux/messageSlice';
// import.meta.env.VITE_API_URL


// function SendInput() {

//     const [message, setMessage] = useState("");
//     const dispatch = useDispatch();
//     const { selectedUser } = useSelector(store => store.user);
//     const { messages } = useSelector(store => store.message);

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         if (!selectedUser?._id || !message.trim()) return;

//         try {
//             const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/message/send/${selectedUser._id}`, { message }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             console.log(res);
//             dispatch(setMessages([...(Array.isArray(messages) ? messages : []), res?.data?.newMessage]))
//             // dispatch(setMessages([...messages,res?.data?.newMessage]))
//         } catch (error) {
//             console.log(error);
//         }
//         setMessage("");
//     }
//     return (
//         <form onSubmit={onSubmitHandler} className='px-4 my-3 '>
//             <div className='w-full relative'>
//                 <input
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     type='text'
//                     placeholder='Send a message ...'
//                     className='border text-sm rounded-lg block w-full p-3 border-zinc-400 bg-gray-600 text-white'
//                 />
//                 {/* <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-4'>
//                     <IoSend />
//                  </button> */}
//                 <button
//                     type='submit'
//                     disabled={!message.trim()}
//                     className='absolute flex inset-y-0 end-0 items-center pr-4 disabled:opacity-40'>
//                     <IoSend />
//                 </button>
//             </div>
//         </form>
//     )
// }

// export default SendInput
