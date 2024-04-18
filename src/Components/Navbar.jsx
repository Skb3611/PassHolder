import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around items-center font-medium  h-12' >
      <div className="logo sm:text-2xl text-xl italic">
        <span className='text-green-600 sm:text-3xl text-xl'> &lt; </span>
        PassHolder
        <span className='text-green-600 sm:text-3xl text-xl'> /&gt;</span>
      </div>
      <div className="nav">
        <ul className='flex sm:gap-5 gap-3 hover:font-semibold'>
            <li className='hover:font-bold cursor-pointer text-sm sm:text-lg'>Home</li>
            <li className='hover:font-bold cursor-pointer text-sm sm:text-lg'>About</li>
            <li className='hover:font-bold cursor-pointer text-sm sm:text-lg'>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
