import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form,setForm] = useState({email:"",password:""})
  const navigate = useNavigate()

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const res = await api.post('/auth/login',form)
      const token = localStorage.setItem("token", res.data.token)
      alert("User Login Successfully")
      navigate('/')
    } catch (error) {
      console.log(error)
      alert('Login Failed')
    }
  }
  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md border shadow-md rounded-lg px-8 py-6 my-10 bg-white/10">
        <h2 className="text-2xl font-semibold text-center mb-6">Login Form</h2>
        <input type="email" placeholder='Enter your email' onChange={handleChange} value={form.email} name='email' className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"/>
        <input type="password" placeholder='Enter your password' onChange={handleChange} value={form.password} name='password' className="p-3 border rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"/>
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full">Submit</button>
      </form>
    </div>
  )
}

export default Login
