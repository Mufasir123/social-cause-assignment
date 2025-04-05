'use client'
import React, { useState } from 'react'
import Register from './Register'
import Link from 'next/link'

const Navbar = () => {

    const [isModelOpen, setIsModelOpen] = useState(false)
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-black text-[#E0E0EF] p-2 flex justify-between">
                <Link href="/">
                <img src="logo.svg" alt="Logo" />
                </Link>
            
        <ul className='flex gap-5'>
            <li className="nav-item hover:bg-[#6868AC] w-20 h-10 flex justify-center items-center rounded-4xl">
                <Link className="nav-link" href="/">Home</Link>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-32 h-10 flex justify-center items-center rounded-4xl">
                <Link className="nav-link" href="/content-library">Content Library</Link>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-34 h-10 flex justify-center items-center rounded-4xl p-0.5">
                <Link className="nav-link" href="/passion">Passion Discovery</Link>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-32 h-10 flex justify-center items-center rounded-4xl">
                <Link className="nav-link" href="/chats">Community Chat</Link>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-32 h-10 flex justify-center items-center rounded-4xl">
                <Link className="nav-link" href="/map">Intractive Map</Link>
            </li>
        </ul>
            <div>
                <button className="bg-[#44448E] text-white p-1 w-32 h-10 rounded-3xl cursor-pointer" href="/" onClick={()=> setIsModelOpen(true)} >Login/Register</button>

                <Register isOpen={isModelOpen} onClose={()=> setIsModelOpen(false)} />
            </div>
      </nav>
    </div>
  )
}

export default Navbar
