import React from 'react'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-[4%] py-2">
      <Link to={'/'}><h1 className='text-3xl text-orange-500 font-bold'>PetPujo <span className='text-black text-lg font-medium'>Admin</span></h1></Link>
      <img 
        src={assets.profile_image} 
        alt="profile" 
        className="w-10"
      />
    </div>
  )
}

export default Navbar
