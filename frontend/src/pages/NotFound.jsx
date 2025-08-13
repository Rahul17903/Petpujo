import React from 'react'
import { useLocation } from 'react-router-dom'

const NotFound = () => {
    const location = useLocation()
  return (
    <div className='flex flex-col items-center gap-5 p-10 bg-red-600 h-[91.7vh]' style={{
  backgroundImage: 'linear-gradient(90deg, rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)'}}>
      <p className='text-xl'>oops! </p>
      <span>{location.pathname} is not Found</span>
      <h1 className='text-4xl font-bold text-center text-[#111133] my-3'>4🫡4 ERROR  Page Not Found </h1>
      <p className='text-xl'>Sorry, Page Not Found </p>
    </div>
  )
}

export default NotFound
