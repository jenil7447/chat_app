
import React from 'react'
import OtherUser from './OtherUser'
import UseGetOtherUsers from '../hooks/useGetOtherUsers';

function OtherUsers({ filteredUsers }) {
    UseGetOtherUsers();

    if (!filteredUsers.length) return (
        <div className='flex-1 flex items-center justify-center text-gray-400'>
            No users found
        </div>
    );

    return (
        <div className='overflow-auto flex-1'>
            {filteredUsers.map((user) => (
                <OtherUser key={user?._id} user={user} />
            ))}
        </div>
    )
}

export default OtherUsers;
// import React from 'react'
// import OtherUser from './OtherUser'
// import UseGetOtherUsers from '../hooks/useGetOtherUsers';
// import { useSelector } from 'react-redux';


// function OtherUsers() {
//     //my custom hook
//     UseGetOtherUsers();
//     const { otherUsers} = useSelector(store=>store.user);
//     if(!otherUsers) return; // we called it early return in react

//     return (
//         <div className='overflow-auto flex-1'>
//             {
//                 otherUsers?.map((user)=>{
//                     return (
//                         <OtherUser key={user?._id || Math.random()} user={user} />
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default OtherUsers
