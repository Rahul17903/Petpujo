import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ url }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error('Error')
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error('Error')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="flex flex-col space-y-4 w-full p-10">
      <p className="text-lg font-semibold">Add Foods List</p>
      <div className="w-full">
        {/* Table header */}
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 p-3 border border-gray-300 text-sm bg-gray-100 font-bold max-[600px]:hidden">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {/* Table rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 p-3 border border-gray-300 text-sm max-[600px]:grid-cols-[1fr_3fr_1fr]"
          >
            <img
              src={`${url}/images/` + item.image}
              alt={item.name}
              className="w-12 h-12 object-cover"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p
              onClick={() => removeFood(item._id)}
              className="cursor-pointer text-red-500 font-bold"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
