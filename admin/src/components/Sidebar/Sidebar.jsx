import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border border-t-0 border-gray-400 text-[max(1vw,10px)]">
      <div className="pt-12 pl-[20%] flex flex-col gap-5">
        
        <NavLink 
          to='/add' 
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 border-gray-400 px-3 py-2 rounded-l-md cursor-pointer
            ${isActive ? 'bg-orange-400 border-[rgb(255,159,142)]' : ''}`
          }
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5" />
          <p className="max-[900px]:hidden">Add Items</p>
        </NavLink>

        <NavLink 
          to='/list' 
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 border-gray-400 px-3 py-2 rounded-l-md cursor-pointer
            ${isActive ? 'bg-orange-400 border-[rgb(255,159,142)]' : ''}`
          }
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="max-[900px]:hidden">List Items</p>
        </NavLink>

        <NavLink 
          to='/orders' 
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 border-gray-400 px-3 py-2 rounded-l-md cursor-pointer
            ${isActive ? 'bg-orange-400 border-[rgb(255,159,142)]' : ''}`
          }
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="max-[900px]:hidden">Orders</p>
        </NavLink>

        <NavLink 
          to='/complaint' 
          className={({ isActive }) =>
            `flex items-center gap-3 border border-r-0 border-gray-400 px-3 py-2 rounded-l-md cursor-pointer
            ${isActive ? 'bg-orange-400 border-[rgb(255,159,142)]' : ''}`
          }
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="max-[900px]:hidden">Complaints</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
