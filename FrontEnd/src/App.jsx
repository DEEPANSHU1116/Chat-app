import React from 'react'
import Right from './home/Rightpart/Right'
import Left from './home/Leftpart/Left'
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/Authprovider';
import { Navigate, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

function App() {
  const [authUser,setAuthUser] = useAuth();
  return (
  <>
    <Routes>
      <Route path="/" element={authUser ? (
      
      <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Right />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className='w-80'>
        <Left />
        </div>
      </div>
    </div>


    ) : (
    <Navigate to = {"/login"} />
    )
    }
    />
      <Route path="/login" element={authUser ? <Navigate to = "/" /> : <Login />} />
      <Route path="/signup" element={authUser ? <Navigate to = "/" /> :<Signup />} />
    </Routes>
    <Toaster/>
  </>
  )
}

export default App;

