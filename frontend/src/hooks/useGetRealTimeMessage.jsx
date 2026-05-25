import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { incrementUnread } from "../redux/userSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const { messages } = useSelector(store => store.message);
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const messagesRef = useRef(messages);
    const selectedUserIdRef = useRef(selectedUser?._id);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        selectedUserIdRef.current = selectedUser?._id;
    }, [selectedUser?._id]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            const currentSelectedUserId = selectedUserIdRef.current;
            const currentMessages = messagesRef.current;

            if (newMessage.senderId === currentSelectedUserId) {
                dispatch(setMessages([...(Array.isArray(currentMessages) ? currentMessages : []), newMessage]));
            } else {
                dispatch(incrementUnread(newMessage.senderId));
            }
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, dispatch]);
};

export default useGetRealTimeMessage;