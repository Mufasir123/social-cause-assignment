'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { clearUser, getUser } from '@/store/userSlice/userSlice';

const Profile = ({isOpen, onClose}) => {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout =async () => {

    try {
      const res = await axios.post('/api/logout')
      if (res.status === 200) {
        toast.success("Logout successful");
        dispatch(clearUser())
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(getUser(null))
        router.push('/')
        onClose()
      }
    } catch (error) {
      
    }
    onClose()
  }

  if (!isOpen) return null;
  return ( 
    // <div>
      <div className=" flex justify-center items-center mt-20 absolute lg:left-[70%] md:left-[60%] z-10 border-2 border-gray-400 rounded-lg shadow-lg shadow-slate-600 lg:max-w-96 max-w-96 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="p-6 rounded-lg relative bg-black w-full"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Profile
        </h2>

        <div>
          {
            user ? (
              <div className="flex flex-col">
                <p className='mt-3'> <span  className="text-md font-semibold">UserName: </span> {user?.name}</p>
                <p className='mt-3'> <span className="text-md font-semibold">Email: </span> {user?.email}</p>
              </div>
            ) : (
              <p className="text-center text-gray-600">No user data available</p>
            )
          }
          <button className='bg-[#234ef7b1] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#975a5a] transition duration-300 ease-in-out cursor-pointer'
          onClick={handleLogout}
          >Logout</button>
        </div>
      </motion.div>
    </div>
    // </div>
  )
}

export default Profile
