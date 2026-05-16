import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { incrementUnread } from "../redux/userSlice";

const useGetRealTimeMessage = () =>{
    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store => store.message);
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    useEffect(()=>{
            socket?.on('newMessage',(newMessage)=>{
                dispatch(setMessages([...(Array.isArray(messages) ? messages : []), newMessage]))
                // dispatch(setMessages([...messages,newMessage]))
                // Only increment if message is NOT from selected user
            if(newMessage.senderId !== selectedUser?._id) {
                dispatch(incrementUnread(newMessage.senderId));
            }
            });
            return () => socket?.off('newMessage');
    },[socket,setMessages,messages,selectedUser])
};
export default useGetRealTimeMessage;