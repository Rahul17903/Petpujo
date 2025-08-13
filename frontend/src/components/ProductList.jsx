import React, { useEffect, useState } from 'react';
import placeholderImg from '../assets/3.jpg';
import { FaStar } from "react-icons/fa";
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';
import AddToCart from './AddToCart';

const ProductList = () => {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await api.get("/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Couldn't fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  
  return (
    <div className='flex flex-row flex-wrap gap-7 p-7 m-auto items-center justify-center bg-white min-h-screen text-black'>
      {products.map((product) => (
        <div key={product._id} className='hover:bg-white/30 hover:shadow-2xl hover:border border-gray-200 pb-3'>
        <Link to={`/get-product/${product._id}`} >
        <div className='w-[350px] p-2 bg-white/20 rounded-lg' >
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}` ||  placeholderImg}
            alt={product.name}
            className='w-[350px] h-[300px] rounded-lg hover:scale-105'
          />
          <div className='flex justify-between pt-1'>
            <h4 className='text-lg'>{product.name}</h4>
            <p className='bg-green-500 px-3 rounded text-white flex gap-1 items-center'>
              {product.rating || "4.5"} <FaStar className='h-2' />
            </p>
          </div>
          <div className='flex flex-row justify-between text-gray-600'>
            <p>{product.description}</p>
            <p className='text-gray-500'>₹{product.price} for one</p>
          </div>
        </div></Link>
        <AddToCart productId={product._id}/>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
