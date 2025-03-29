import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-black text-[#E0E0EF] p-2 flex justify-between">
                <img src="logo.svg" alt="Logo" />
            
        <ul className='flex gap-5'>
            <li className="nav-item hover:bg-[#6868AC] w-20 h-10 flex justify-center items-center rounded-4xl">
                <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-32 h-10 flex justify-center items-center rounded-4xl">
                <a className="nav-link" href="#">Content Library</a>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-34 h-10 flex justify-center items-center rounded-4xl p-0.5">
                <a className="nav-link" href="#">Passion Discovery</a>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-32 h-10 flex justify-center items-center rounded-4xl">
                <a className="nav-link" href="#">Community Chat</a>
            </li>
            <li className="nav-item hover:bg-[#6868AC] w-32 h-10 flex justify-center items-center rounded-4xl">
                <a className="nav-link" href="#">Intractive Map</a>
            </li>
        </ul>
            <div>
                <button className="bg-[#44448E] text-white p-1 w-32 h-10 rounded-3xl cursor-pointer" href="/">Login/Register</button>
            </div>
      </nav>
    </div>
  )
}

export default Navbar
