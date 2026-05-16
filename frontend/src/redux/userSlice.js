import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        onlineUsers:null,
        unreadCounts: {},
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser = action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers = action.payload
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        incrementUnread: (state, action) => {
            const senderId = action.payload;
            state.unreadCounts[senderId] = (state.unreadCounts[senderId] || 0) + 1;
        },
        clearUnread: (state, action) => {
            const userId = action.payload;
            state.unreadCounts[userId] = 0;
        },
    }
})
export const {setAuthUser , setOtherUsers, setSelectedUser,setOnlineUsers,incrementUnread,
    clearUnread} = userSlice.actions;
export default userSlice.reducer;