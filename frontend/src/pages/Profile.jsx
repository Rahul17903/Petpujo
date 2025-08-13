import React, { useEffect, useState } from 'react'
import defaultImage from '../assets/3.jpg'
import api from '../api'
import { jwtDecode } from 'jwt-decode'

const Profile = () => {
  const [userImage,setUserImage] = useState(null)
  const token = localStorage.getItem('token')
  const [userName,setUserName] = useState("User")
  const [userEmail,setUserEmail] = useState('userEmail')
  const [totalOrders,setTotalOrder] = useState(0)
  const [favoritesCount, setFavoritesCount] = useState(0)
  const [rating,setRating] = useState(4.4)
  useEffect(()=>{
    const fetchUser = async()=>{
      if(!token) return;

      try {
        //decode the token
        const decoded = jwtDecode(token)
        const userId = decoded.id || decoded._id

        //get the user name
        const res = await api.get(`/auth/user/${userId}`)
        setUserName(res.data.name)

        //get the user email 
        setUserEmail(res.data.email)

        //get the user Image
        const imageRes = await api.get(`/auth/user/${userId}/pic`, {
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(imageRes.data)
        setUserImage(imageUrl)
      } catch (error) {
        console.log("cannot fetch user details ")
      }
    }
    fetchUser()
  },[token])

  return (
     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <img
          src={userImage}
          alt="User Avatar"
          className="h-[200px] w-[200px] rounded-full object-cover shadow-md mb-4"
        />
        <h2 className="text-3xl font-bold">{userName}</h2>
        <p className="text-gray-500">{userEmail}</p>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          Edit Profile
        </button>
      </div>

      {/* Stats Section */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <h4 className="text-xl font-semibold">{totalOrders || 2}</h4>
          <p className="text-gray-500">Total Orders</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold">{favoritesCount}</h4>
          <p className="text-gray-500">Favorites</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold">{rating || 4.5 } ★</h4>
          <p className="text-gray-500">Average Rating</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold">2 yrs</h4>
          <p className="text-gray-500">Member Since</p>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
        <ul className="space-y-4">
          <li className="bg-gray-50 p-4 rounded shadow-sm">
            <p className="font-medium">“Loved the spicy chicken burger!”</p>
            <span className="text-sm text-gray-500">Rated 5★ - Aug 2025</span>
          </li>
          <li className="bg-gray-50 p-4 rounded shadow-sm">
            <p className="font-medium">“Pizza was great but took too long.”</p>
            <span className="text-sm text-gray-500">Rated 3★ - Jul 2025</span>
          </li>
        </ul>
      </div>

      {/* Achievements or Badges */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Your Badges</h3>
        <div className="flex gap-4">
          <span className="bg-yellow-400 text-white px-4 py-2 rounded-full text-sm font-medium">Top Reviewer</span>
          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">Foodie Pro</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
