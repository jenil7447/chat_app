import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

function App() {
  const { authUser } = useSelector(store => store.user);
  const { socket } = useSelector(store => store.socket);
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <HomePage /> : <Navigate to="/login" />
    },
    {
      path: "/signup",
      element: authUser ? <Navigate to="/" /> : <Signup />
    },
    {
      path: "/login",
      element: authUser ? <Navigate to="/" /> : <Login />
    },
  ]);

  useEffect(() => {
    if (authUser && authUser._id) {
      const socket = io('http://localhost:8080', {
        query: { userId: authUser._id },
        withCredentials: true,
      });
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;